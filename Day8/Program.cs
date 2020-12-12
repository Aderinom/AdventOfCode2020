using System;
using System.IO;
using System.Diagnostics;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Day8
{
    class Program
    {
        static void Main(string[] args)
        {

            Console.BackgroundColor = ConsoleColor.Red;
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("-------------------------------------------------------");
            Console.WriteLine("_  * -  _ *   Advent of Code 2020 - Day 6 *  -  _ *  _ ");
            Console.WriteLine("-------------------------------------------------------");
            Console.ResetColor();

            string[] Input = File.ReadAllLines("input.txt");

            Console.WriteLine("Q1 - Immediately before any instruction is executed a second time, what value is in the accumulator?");
            RuntimeEnvoirement RE = new RuntimeEnvoirement();

            try
            {
                RE.Execute(Input);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            
            Console.WriteLine("Q2 - Fix the program so that it terminates normally by changing exactly one jmp (to nop) or nop (to jmp). What is the value of the accumulator after the program terminates?");
            int lineChanged = 0;
            int accValue = 0;

            if (!RE.Debug(Input, out lineChanged, out accValue))
            {
                Console.WriteLine("Error - Debug did not find solution");
            }
            else
            {
                Console.WriteLine("Changed Line " + lineChanged + " -- Out accValue is " + accValue);
            }
          
        }
    }
    public class RuntimeStats
    {
        public int Line { get; set; }
        public string Instruction { get; set; }
        public int value { get; set; }
        public int Accumulator { get; set; }

        public RuntimeStats( int Line, string Instruction, int Value, int Accumulator)
        {
            this.Line = Line;
            this.Instruction = Instruction;
            this.value = Value;
            this.Accumulator = Accumulator;
        }
    }
    public class RuntimeEnvoirement
    {
        public int CurrentLine { get; set; } = 0;
        public List<RuntimeStats> Stats = new List<RuntimeStats>();

        public int Accumulator { get; set; } = 0;
        public string[] Programm;
        public void Reset()
        {
            Stats.Clear();
            CurrentLine = 0;
            Accumulator = 0;
        }
        public int Execute(string[] programm)
        {
            Reset();
            this.Programm = (string[])programm.Clone();
            try
            {
                for (; CurrentLine < Programm.Length; CurrentLine++)
                {

                    var cmd = this.parse(Programm[CurrentLine]);
                    Programm[CurrentLine] = "x " + Programm[CurrentLine];
                    Stats.Add(new RuntimeStats(CurrentLine, cmd.instruction, cmd.value, this.Accumulator));

                    switch (cmd.instruction)
                    {
                        case "nop":
                            this.nop();
                            break;
                        case "acc":
                            this.acc(cmd.value);
                            break;
                        case "jmp":
                            this.jmp(cmd.value);
                            break;
                    }
                }
                return this.Accumulator;
            }
            catch (DeadlockException)
            {
                throw new DeadlockException("Line : " + CurrentLine + " acc " + Accumulator + " deadlock detected");
            }
        
        }

        public bool Debug(string[] programm, out int changedLine, out int accValue)
        {
            // Super unefficient but - it works
            bool Success = false;
            RuntimeStats thisChange = null;
            RuntimeStats[] PossibleChanges;
            int i = 0;
            try
            {
                Execute(programm);
                Success = true;
            }
            catch (DeadlockException)
            {
            }

            PossibleChanges = Stats.Reverse<RuntimeStats>().Where(L => L.Instruction != "acc" && L.Instruction != "").ToArray();

            for (; i < PossibleChanges.Count() && !Success; i++)
            {
                
                string[] TestProgramm = (string[])programm.Clone();
                thisChange = PossibleChanges[i];

                if (thisChange.Instruction == "nop")
                {
                    TestProgramm[thisChange.Line] = TestProgramm[thisChange.Line].Replace("nop", "jmp");
                }
                else
                {
                    TestProgramm[thisChange.Line] = TestProgramm[thisChange.Line].Replace("jmp", "nop");
                }

                try
                {
                    Execute(TestProgramm);
                    Success = true;
                }
                catch (DeadlockException)
                {
                                      
                }
            }

            if (Success)
            {
                changedLine = thisChange.Line;
                accValue = this.Accumulator;
            }
            else
            {
                changedLine = 0;
                accValue = 0;
            }
        
            return Success;            
        }

        ( string instruction, int value) parse(string Input) 
        {
            int i = 0;
            if (Input.ToCharArray()[0].Equals('x'))
            {
                throw new DeadlockException();
            }

            if (Input.Contains("+"))
            {
                i = int.Parse(Input.Substring(5));
            }
            else
            {
                i = int.Parse(Input.Substring(4));
            }


            return (Input.Substring(0, 3), i);
        }

        void jmp(int offset)
        {
            this.CurrentLine += offset - 1;
            return;
        }

        void nop()
        {
            return;
        }

        void acc(int change)
        {
            this.Accumulator += change;
        }




    }

    

    [Serializable]
    public class DeadlockException : Exception
    {
        public DeadlockException() { }
        public DeadlockException(string message) : base(message) { }
        public DeadlockException(string message, Exception inner) : base(message, inner) { }
        protected DeadlockException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }


}


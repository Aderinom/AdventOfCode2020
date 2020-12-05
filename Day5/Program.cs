using System;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;

namespace Day5
{
    class Program
    {
        
        static void Main(string[] args)
        {
            BoardingScanner boardingScanner = new BoardingScanner(8);
            boardingScanner.UnitTest();

            string[] Lines = File.ReadAllLines("input.txt");

            var Passes = Lines.Select(Line => boardingScanner.ParseBoardingPassString(Line));
            var seatIDs = Passes.Select(P => P.SeatID);

            Console.WriteLine("[Q1] Highest SeatID = " + seatIDs.Max());


            //The only usable hint here is that the ID before and after my Seat exist.
            //This does not mean that every seat but the front, back and my Seat are there.
            //Well - At least I tried that logic and failed.        
            
            for (UInt32 i = 0; i < 1023; i++)
            {
                if (!seatIDs.Contains(i))
                {
                    var neighbors = seatIDs.Where(id => id == i - 1 || id == i + 1);
                    if (neighbors.Count() == 2)
                    {
                        Console.WriteLine("[Q2] Possible SeatID = " + (i));
                    }

                }
            }
        }
    }

    public class BoardingPass
    {
        public BoardingPass(UInt32 Row, UInt32 Colum) {
            this.Row = Row;
            this.Colum = Colum;
            this.SeatID = BoardingPassGetSeatID(Row, Colum);
        }
        private UInt32 BoardingPassGetSeatID(UInt32 Row, UInt32 Colum)
        {
            //ID = RowVal * 8 + ColVal
            return Row * 8 + Colum;
        }
        public UInt32 Row { get; set; }
        public UInt32 Colum { get; set; }
        public UInt32 SeatID { get; set; }
    }
    public class BoardingScanner
    {
        private readonly int RowCount;
        public BoardingScanner(int RowCount)
        {
            this.RowCount = RowCount;
        }

        public Boolean UnitTest()
        {
            //Cheap test for validity


            string TestInput = "FBFBBFFRLR";
            int TestRowOutput = 44;
            int TestColumOutput = 5;
            int TestSeatIDOutput = 357;
            BoardingPass a = this.ParseBoardingPassString(TestInput);
            Console.WriteLine("[UNIT TEST : START ] " + TestInput + " was parsed to Row [" + a.Row + "] Colum [" + a.Colum + "] SeatID [" + a.SeatID+ "]");

            if (a.Row == TestRowOutput && a.Colum == TestColumOutput && a.SeatID == TestSeatIDOutput)
            {
                Console.BackgroundColor = ConsoleColor.DarkGreen;
                Console.WriteLine("[UNIT TEST : SUCCESS]");
                Console.ResetColor();
                return true;
            }
            else
            {

                Console.BackgroundColor = ConsoleColor.DarkRed;
                Console.WriteLine("[UNIT TEST : FAILED] " + TestInput + " must be       Row [" + TestRowOutput + "] Colum [" + TestColumOutput + "] SeatID [" + TestSeatIDOutput + "]");
                Console.ResetColor();
                return false;
            }


        }

        public BoardingPass ParseBoardingPassString(string input)
        {
            // Splits the Input string at the RowCount.
            
            char[] Chars;

            Chars = input.Substring(0, RowCount - 1).ToCharArray();
            UInt32 Row = this.BoardingPassValueToInt(Chars, 'B');

            Chars = input.Substring(RowCount - 1).ToCharArray();
            UInt32 Colum = this.BoardingPassValueToInt(Chars, 'R');

            BoardingPass retVal = new BoardingPass(Row, Colum);

            return retVal;
        }

        public UInt32 BoardingPassValueToInt(char[] charArr, char CharWichRepresentsOne)
        {
            //The Values given Represent Binary Value.
            //the value wich represents "the upper half" is bin 1 - the value wich represents "the lower half" is bin 0
            //This function parses any Char array Passed into it, with the char which RepresentsOne as bin 1 any other char as 0;

            UInt32 Value = 0;

            if (charArr.Length > 32)
            {
                throw new ArgumentOutOfRangeException("charArr", "Cannot parse String above 32 Characters!");
            }

            for (int i = 0; i < charArr.Length; i++)
            {
                if (charArr[i] == CharWichRepresentsOne)
                {
                    Value = (Value << 1) | 0b1;
                }
                else
                {
                    Value = Value << 1;
                }
            }

            return Value;


        }

 
    }
}

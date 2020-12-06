using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;


namespace Day6
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

            Group SingleGroup;
            List<Group> Groups = new List<Group>();
            List<string> GroupAnswer = new List<string>();

            foreach (string inp in Input)
            {
                if(inp != "")
                {
                    GroupAnswer.Add(inp);
                }
                else
                {
                    SingleGroup = new Group();
                    SingleGroup.ParseAnswers(GroupAnswer.ToArray());
                    GroupAnswer.Clear();
                    Groups.Add(SingleGroup);
                }
            }

            SingleGroup = new Group();
            SingleGroup.ParseAnswers(GroupAnswer.ToArray());
            GroupAnswer.Clear();
            Groups.Add(SingleGroup);

            Console.WriteLine("Q1 - For each group, count the number of questions to which anyone answered 'yes'. What is the sum of those counts?");
            Console.WriteLine(Groups.Select(Grp => Grp.Answers.Count()).Sum());
            
            Console.WriteLine("Q2 - For each group, count the number of questions to which everyone answered 'yes'. What is the sum of those counts?");
            Console.WriteLine(Groups.Select(
             Grp => Grp.Answers.Where(
                 a => a.Value == Grp.MemberCount
                 ).Count()).Sum());
        }
    }

    public class Group
    {
        public Dictionary<char, int> Answers { get;} = new Dictionary<char, int>();
        public int PositiveResponseCount { get; set; } = 0;
        public int MemberCount { get; set; } = 0;


        public void ParseAnswers(string[] Answers)
        {
            foreach (string Answer in Answers)
            {
                MemberCount++;
                foreach (char c in Answer.ToCharArray())
                {
                    PositiveResponseCount++;
                    if (!this.Answers.ContainsKey(c))
                    {
                        this.Answers[c] = 0;
                    }
                    this.Answers[c]++;
                }
            }
        }
    }

}

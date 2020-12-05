// Day1.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <fstream>
#include <string> 

using namespace std;


int main()
{
    printf("-------------------------------------------------------\n");
    printf("_  * -  _ *   Advent of Code 2020 - Day 1 *  -  _ *  _ \n");
    printf("-------------------------------------------------------\n");
    ifstream Inputfile("input.txt");
    char line[5];
    int Values[200];
    int i = 0;

    if (Inputfile.fail()) {
        printf("Error - File could not be opened");
        return -1;
    }



    while (Inputfile.getline(line,5))
    {
        //printf("%s == ", line);
        Values[i] = stoi(line, NULL, 10);
        //printf("%i\n", Values[i]);
        i++;
    }
    Inputfile.close();
    
    for ( i = 0; i < 200; i++)
    {
        for (int f = 0; f < 200; f++)
        {
            if ((Values[i] + Values[f]) == 2020) {
                printf("Found values! They are : %i and %i their product is %i\n",
                    Values[i], Values[f], (Values[i] * Values[f]));
                goto q2;
            }
        }
    }

    q2:
    for (i = 0; i < 200; i++)
    {
        for (int f = 0; f < 200; f++)
        {
            for (int c = 0; c < 200; c++)
            {
                if ((Values[i] + Values[f] + Values[c]) == 2020) {
                    printf("Found values! They are : %i and %i  and %i their product is %i\n",
                        Values[i], Values[f], Values[c], (Values[i] * Values[f] * Values[c]));
                    goto q3;
                }
            }
        }
    }
    q3:
    return 0;
}




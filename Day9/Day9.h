// Day1.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include "XMAS_Decoder.h"


   
int main()
{
    printf("-------------------------------------------------------\n");
    printf("_  * -  _ *   Advent of Code 2020 - Day 9 *  -  _ *  _ \n");
    printf("-------------------------------------------------------\n");
    XMD::XMAS_Decoder X_XMAS("input.txt",25);
    int Weakpoint = X_XMAS.Find_WeakPoint();
    printf("Q1 : What is the first number that does not have this property?\n");
    printf("%i\n", Weakpoint);

    printf("Q2 : What is the encryption weakness in your XMAS-encrypted list of numbers?\n");
    printf("%i\n", X_XMAS.Attack_WeakPoint(Weakpoint));
    

}

  


#pragma once
#include "FileReader.h"
#include <string> 
#include <vector>

namespace XMD {
	class XMAS_Decoder
	{
	public:


		XMAS_Decoder(const char* fileName, short preambleLenght) :FileReader(fileName)
		{
			this->numberArray = (int*)malloc(preambleLenght * sizeof(int));
			
			this->numberArrayLenght = preambleLenght;
			if (this->numberArray == NULL) {
				throw std::exception("Memory allocation error!");
			}
			memset(this->numberArray, 0, preambleLenght * sizeof(int));

			if (!FileReader.is_open()) {
				throw std::exception("File open error!");
			}

			for (size_t i = 0; i < preambleLenght && FileReader.ReadLine(); i++)
			{
				numberArray[i] = std::stoi(FileReader.BufferA);
			}

		}
		~XMAS_Decoder()
		{
			free(this->numberArray);
			//Should add a check if FileReader was even opened correctly;
			this->FileReader.close();
		}
		
		int Find_WeakPoint() {
			bool isCorrect = true;
		
			while (isCorrect && FileReader.ReadLine()) {
				isCorrect = checkValueAndPush(stoi(FileReader.BufferA));
			}

			if (!isCorrect){
				return stoi(FileReader.BufferA);
			}
			else
			{
				throw std::exception("Failed at finding XMAS weakpoint!");
			}
		}
		int Attack_WeakPoint(int value) {
			vector<int> numbers;
			numbers.reserve(500);
			int currentBase = 0;
			int sum;
			size_t i;
			size_t y;
		

			FileReader.seekg(0);
			while (FileReader.ReadLine())
			{
				numbers.push_back(std::stoi(FileReader.BufferA));
				if (numbers.back() == value) break;
			}

			int size = numbers.size();
			for (i = 0; i < size; i++)
			{
				sum = 0;
				currentBase = numbers.at(i);
				for ( y = i ; y < size && sum < value; y++)
				{
					sum += numbers.at(y);
				}

				if (sum == value) {
					int min = currentBase;
					int max = currentBase;
					int num;
					for (size_t f = i + 1; f < y; f++)
					{
						num = numbers.at(f);
						if (num < min) {
							min = num;
							continue;
						}
						
						if (num > max) {
							max = num;
							continue;
						}
					}
					return min + max;
				}
			}
		}
		
	private:		
		int* numberArray;
		int numberArrayLenght = 0;
		int lastChangedIndex = 0;
		FileReader::FileReader FileReader;
		//Checks if value is correctly encoded per XMAS specification
		bool checkValueAndPush(int value) {
			//inefficient, sorting the array + linked list for replacing order would make this faster;
			for (int i = 0; i < numberArrayLenght; i++)
			{
				if (numberArray[i] < value) {
					for (int y = i + 1; y < numberArrayLenght; y++)
					{
						if (numberArray[i] + numberArray[y] == value) {
							numberArray[lastChangedIndex] = value;
							lastChangedIndex++;
							if (lastChangedIndex == numberArrayLenght) {
								lastChangedIndex = 0;
							}
							return true;
						}
					}
				}
			}
			return false;
		}

	};
}

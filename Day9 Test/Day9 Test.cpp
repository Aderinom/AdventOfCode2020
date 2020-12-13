#include "pch.h"
#include "CppUnitTest.h"
#include "..\Day9\Day9.h"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;

namespace Day9Test
{
	TEST_CLASS(FileReaderTests)
	{
	public:
		
		TEST_METHOD(TestCharCount)
		{
			FileReader::FileReader Filereader("P:\\Projekte\\AdventOfCoding2020\\Day9 Test\\testInput.txt");
			if (!Filereader.is_open()) Assert::Fail(L"File was not opened Correctly");

			if (!Filereader.ReadLine()) Assert::Fail(L"Failed at reading line 1");
			Assert::IsTrue(Filereader.readLenght == 11, L"Line 1 Lenght is wrong!");
			Assert::IsTrue(memcmp(Filereader.BufferA, "1234567891", 11) == 0, L"Line 1 data is wrong!");

			if (!Filereader.ReadLine()) Assert::Fail(L"Failed at reading line 2");
			Assert::IsTrue(Filereader.readLenght == 50 , L"Line 2 Lenght is wrong!");
			Assert::IsTrue(memcmp(Filereader.BufferA, "1234567891123456789112345678911234567891123456789", 50) == 0,L"Line 2 data is wrong!");

			if (!Filereader.ReadLine()) Assert::Fail(L"Failed at reading line 3");
			Assert::IsTrue(Filereader.readLenght == 61, L"Line 3 Lenght is wrong!");
			Assert::IsTrue(memcmp(Filereader.BufferA, "123456789112345678911234567891123456789112345678911234567891", 61) == 0, L"Line 3 data is wrong!");

			if (!Filereader.ReadLine()) Assert::Fail(L"Failed at reading line 4");
			Assert::IsTrue(memcmp(Filereader.BufferA, "123456789112345678911234567891123456789112345678911234567891123456789112345678911234567891123456789112345678911234567891", 61) == 0, L"Line 4 data is wrong!");
			Assert::IsTrue(Filereader.readLenght == 121, L"Line 4 Lenght is wrong!");

			if (Filereader.ReadLine()) Assert::Fail(L"Failed at detecting EOF");


		}
	};

	TEST_CLASS(XMAS_DecoderTest)
	{
		TEST_METHOD(TestsWeaknesFinder) {
			XMD::XMAS_Decoder X_XMAS("P:\\Projekte\\AdventOfCoding2020\\Day9 Test\\testInputXMAS.txt",5);
		
			int i = X_XMAS.Find_WeakPoint();

			Assert::IsTrue(i == 127, L"Did not find Correct Weakpoint!");
		}
		TEST_METHOD(TestAttacker) {
			XMD::XMAS_Decoder X_XMAS("P:\\Projekte\\AdventOfCoding2020\\Day9 Test\\testInputXMAS.txt", 5);

			int i = X_XMAS.Find_WeakPoint();
			int att = X_XMAS.Attack_WeakPoint(i);
			Assert::IsTrue(att == 62, L"Did not find Correct Value!");
		}
	};
}

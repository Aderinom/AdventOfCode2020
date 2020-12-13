#pragma once
#include <fstream>


using namespace std;
namespace FileReader {

    // Extends ifstream with function "ReadLine"
    // ReadLine loads single lines in member "Buffer" with "LineLenghtBc" as Byte Counted lenght of line
    // automatically manages Buffer allocation;
    class FileReader :public ifstream
    {
    public:
        
        char * BufferA = NULL;
        wchar_t * BufferW = NULL;
        streamsize readLenght = 0;

        explicit FileReader(const char* filename,int startBufferSize = 50, int BufferSizeIncrease = 50) : FileReader(filename, 1, startBufferSize, BufferSizeIncrease){}
        explicit FileReader(const char* filename, openmode mode, int startBufferSize = 50, int BufferSizeIncrease = 50)
            :ifstream(filename, mode) 
        {
            _Init(startBufferSize, BufferSizeIncrease);
        }
      
        ~FileReader() {
            if (this->BufferA != NULL) {
                free(this->BufferA);
            }
        }

        // Reads a line and stores it in classes Buffer, 
        // extends Buffer automatically to fit lenght
        // writes lenght of read bytes to lineLenghtBc
        // if EOF or Error returns false;
        bool ReadLine() {
            if (this->eof()) return false;
      
            this->getline(this->BufferA, this->CurrentMaxReadLenght);

            // if badbid -> Stream is damaged
            if (this->bad()) {
                throw std::exception("Failed Reading File - Stream consistency affected");
            }

            // +1 for '/0'
            this->readLenght = this->gcount();
            if (!this->fail() || this->eof()) {
                return true;
            }

            {

                char* tempBuffer = NULL;
                int tempSize = 0;
                while (true)
                {
                    
                    // if failbit -> did not get full line -> buffer must be resized and retried;
                    if (!this->fail() || this->eof() || this->gcount() == 0) {
                        return true;
                    }
                    this->clear();

                    tempBuffer = this->BufferA;
                  
                    this->CurrentMaxReadLenght += this->BufferSizeIncrease;
                    this->BufferA = (char*)malloc(this->CurrentMaxReadLenght);
                    memset(this->BufferA,0, this->CurrentMaxReadLenght);
                    
                    memcpy(this->BufferA, tempBuffer, this->readLenght);
                    free(tempBuffer);
                   
                    this->getline(this->BufferA + this->readLenght, this->CurrentMaxReadLenght - this->readLenght);
                    
                    if (this->bad()) {
                        throw std::exception("Failed Reading File - Stream consistency affected");
                    }
                    
                    if (!this->eof()) {
                        this->readLenght += this->gcount();
                    }
                    else {
                        // at EOF "/0" is not counted, add one for it;
                        this->readLenght += this->gcount() + 1;
                    }
                    

                }
            }
        }

    private:
        void _Init(int startBufferSize = 50, int BufferSizeIncrease = 50)
        {
            this->BufferSizeIncrease = BufferSizeIncrease;
            this->CurrentMaxReadLenght = startBufferSize;
            this->BufferA = (char*)malloc(startBufferSize); // Data
            this->BufferW = (wchar_t *)this->BufferA;
            if (this->BufferA == NULL) {
                throw std::exception("Memory could not be aquired!");
            }
            
            memset(this->BufferA,0, startBufferSize);
        }

        
        streamsize CurrentMaxReadLenght;
        streamsize BufferSizeIncrease ;
    };
}

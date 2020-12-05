# Q: What is the highest seat ID on a boarding pass?

There are 128 rows (value 0 to 127)
There are 8 colums (value 0 to 7)

Ids are calculated with:
`
ID = RowVal * 8 + ColVal
`
Highest id therefore is.
`
ID = 127 * 8 + 7
ID = 1023
`

Well - No // We are supposed to check the existing boarding passes then.
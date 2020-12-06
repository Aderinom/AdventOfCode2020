
write-host "-------------------------------------------------------" -BackgroundColor Red
write-host "_  * -  _ *   Advent of Code 2020 - Day 2 *  -  _ *  _ " -BackgroundColor Red
write-host "-------------------------------------------------------" -BackgroundColor Red

$Passwords = get-content "input.txt"
$validpasswords = 0;
# Question 1

# foreach($pw in $passwords){
#     $test = $pw -match  "^(\d+)-(\d+) (\w): (.*)$"
#     if(-not $test){
#         write-warning $pw
#     }

#     $minchar = $matches[1];
#     $maxchar = $matches[2];
#     $char    = $matches[3];
#     $pw      = $matches[4].ToCharArray();
#     $ischar  = 0;

#     foreach ($c in $pw) {

#         if($c -eq $char){
#             $ischar ++
#         }
#     }

#     if($ischar -ge $minchar -and $ischar -le $maxchar){
#         $validpasswords ++;
#         write-host "$pw is valid - $validpasswords passwords are right now"
#     }

# }

$validpasswords = 0;
write-warning "New Policies"
# Question 2
foreach($pw in $passwords){
    $test = $pw -match  "^(\d+)-(\d+) (\w): (.*)$"
    if(-not $test){
        write-warning $pw
    }

    $indexone = ([int]$matches[1]) - 1;
    $indextwo = ([int]$matches[2]) - 1;
    $char    = $matches[3];
    $pw      = $matches[4].ToCharArray();

    if($pw[$indexone] -eq $char -xor $pw[$indextwo] -eq $char){
        $validpasswords ++;
        write-host "$pw is valid - $validpasswords passwords are right now"
    }

}
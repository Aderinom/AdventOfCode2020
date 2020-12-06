"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
require("./src/classes");
const readline = require("readline");
const classes_1 = require("./src/classes");
let Input = fs.readFileSync("input.txt", "utf8");
let PassMaker = new classes_1.PassportMaker;
let PassPorts = PassMaker.parseMultiplePassStrings(Input);
console.log("\x1b[41m-------------------------------------------------------");
console.log("_  * -  _ *   Advent of Code 2020 - Day 3 *  -  _ *  _ ");
console.log("-------------------------------------------------------\x1b[0m");
console.log("Q1 : Count the number of valid passports - those that have all \nrequired fields. Treat cid as optional. In your batch file, how many passports are valid?");
var validPassCount = 0;
PassPorts.forEach(p => {
    p.valid ? validPassCount++ : null;
});
console.log(validPassCount);
console.log("Q2 : In your batch file, how many passports are valid?");
validPassCount = 0;
PassPorts.forEach(p => {
    p.checkValidityExtended();
    p.valid ? validPassCount++ : null;
});
console.log(validPassCount);
console.log("\n");
readline.createInterface(process.stdin, process.stdout)
    .question("Press [Enter] to exit...", function () {
    process.exit();
});
//# sourceMappingURL=app.js.map
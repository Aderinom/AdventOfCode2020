"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
require("./src/classes");
const readline = require("readline");
const classes_1 = require("./src/classes");
let Input = fs.readFileSync("input.txt", "utf8").split("\n");
let bagRegister = new classes_1.BagRegister();
Input.forEach(i => bagRegister.Register(bagRegister.Ruleparser(i)));
console.log("\x1b[41m-------------------------------------------------------");
console.log("_  * -  _ *   Advent of Code 2020 - Day 7 *  -  _ *  _ ");
console.log("-------------------------------------------------------\x1b[0m");
console.log("Q1 : How many bag colors can eventually contain at least one shiny gold bag?");
console.log(bagRegister.GetPossibleHoders(bagRegister.GetBag("shiny gold")).count);
console.log("Q1 : How many individual bags are required inside your single shiny gold bag?");
console.log(bagRegister.GetContainedBags(bagRegister.GetBag("shiny gold")));
console.log("\n");
readline.createInterface(process.stdin, process.stdout)
    .question("Press [Enter] to exit...", function () {
    process.exit();
});
//# sourceMappingURL=app.js.map
import * as fs from "fs";
import "./src/classes";
import * as readline from "readline";
import { BagRegister, Bag } from "./src/classes";

let Input: string[] = fs.readFileSync("input.txt", "utf8").split("\n");
let bagRegister = new BagRegister();
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

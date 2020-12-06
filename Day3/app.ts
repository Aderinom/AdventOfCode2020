import * as fs from "fs";
import { Geology } from "./classes";
import * as readline from "readline";

let Input: String = fs.readFileSync("input.txt", "utf8");
let Geo: Geology = new Geology(Input);

console.log("\x1b[41m-------------------------------------------------------");
console.log("_  * -  _ *   Advent of Code 2020 - Day 3 *  -  _ *  _ ");
console.log("-------------------------------------------------------\x1b[0m");

console.log("Q1 : Starting at the top-left corner of your map and following a \nslope of right 3 and down 1, how many trees would you encounter?");
console.log(Geo.TrySlope(3, 1));

console.log("\nQ2 : What do you get if you multiply together the number of \ntrees encountered on each of the listed slopes?");
console.log(Geo.TrySlope(1, 1) * Geo.TrySlope(5, 1) * Geo.TrySlope(7, 1) * Geo.TrySlope(1, 2) * Geo.TrySlope(3, 1));

readline.createInterface(process.stdin, process.stdout)
    .question("Press [Enter] to exit...", function () {
        process.exit();
    });

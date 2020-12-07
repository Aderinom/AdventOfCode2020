"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BagContainCheck = exports.BagCountCheck = exports.BagParserCheck = exports.RuleParserCheck = void 0;
const assert = require("assert");
const classes_1 = require("../src/classes");
function RuleParserCheck() {
    var BagMaker = new classes_1.BagRegister();
    let rule = BagMaker.Ruleparser("dotted blue bags contain 5 wavy green bags, 3 pale beige bags");
    assert.ok(rule.color === "dotted blue", "Color was not correctly parsed");
    assert.ok(rule.rules.length == 2, "Rulecount was not correctly parsed");
    assert.ok(rule.rules[0].Count == 5, "Number of First bag not correctly parsed");
    assert.ok(rule.rules[0].MustContain === "wavy green", "Color of First bag not correctly parsed");
    assert.ok(rule.rules[1].Count == 3, "Number of Second bag not correctly parsed");
    assert.ok(rule.rules[1].MustContain === "pale beige", "Color of Second bag not correctly parsed");
}
exports.RuleParserCheck = RuleParserCheck;
;
function BagParserCheck() {
    var BagMaker = new classes_1.BagRegister();
    var TestInp = [
        "dotted blue bags contain 5 wavy green bags, 3 grey bags bags.",
        "wavy green bags contain 1 dotted blue bag, 3 dim brown bags.",
        "mirrored magenta bags contain 3 dotted blue bags, 2 plaid beige bags, 4 dull brown bags, 3 pale plum bags.",
        "grey bags contain no bags"
    ];
    var RuleDefinitions = new Array();
    TestInp.forEach(t => RuleDefinitions.push(BagMaker.Ruleparser(t)));
    var Bags = new Array();
    RuleDefinitions.forEach(t => Bags.push(BagMaker.Register(t)));
    assert.ok(Bags[0].color == "dotted blue", "wrong Color");
    assert.ok(Bags[0].isContainedIn.length == 2, "wrong length of is Contained In 0");
    assert.ok(Bags[0].isContainedIn[0].color == "wavy green", "wrong Color of is Contained In 0");
    assert.ok(Bags[0].isContainedIn[1].color == "mirrored magenta", "wrong Color of is Contained In 0");
    assert.ok(Bags[0].MyRules[0].Count == 5, "wrong count of MyRules In 0");
    assert.ok(Bags[0].MyRules[1].Count == 3, "wrong count of is MyRules In 0");
    assert.ok(Bags[0].MyRules[0].MustContain.color == "wavy green", "wrong color of MyRules In 0");
    assert.ok(Bags[0].MyRules[1].MustContain.color == "grey bags", "wrong color of is MyRules In 0");
}
exports.BagParserCheck = BagParserCheck;
;
function BagCountCheck() {
    var bagRegister = new classes_1.BagRegister();
    var TestInp = [
        "light red bags contain 1 bright white bag, 2 muted yellow bags.",
        "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
        "bright white bags contain 1 shiny gold bag.",
        "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
        "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
        "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
        "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
        "faded blue bags contain no other bags.",
        "dotted black bags contain no other bags."
    ];
    TestInp.forEach(i => bagRegister.Register(bagRegister.Ruleparser(i)));
    var PossibleHolders = bagRegister.GetPossibleHoders(bagRegister.GetBag("shiny gold"));
    assert.ok(PossibleHolders.count == 4, "Count not 4");
}
exports.BagCountCheck = BagCountCheck;
;
function BagContainCheck() {
    var bagRegister = new classes_1.BagRegister();
    var TestInp = [
        "shiny gold bags contain 2 dark red bags.",
        "dark red bags contain 2 dark orange bags.",
        "dark orange bags contain 2 dark yellow bags.",
        "dark yellow bags contain 2 dark green bags.",
        "dark green bags contain 2 dark blue bags.",
        "dark blue bags contain 2 dark violet bags.",
        "dark violet bags contain no other bags."
    ];
    TestInp.forEach(i => bagRegister.Register(bagRegister.Ruleparser(i)));
    var requiredBags = bagRegister.GetContainedBags(bagRegister.GetBag("shiny gold"));
    assert.ok(requiredBags == 126, "Count not 126");
}
exports.BagContainCheck = BagContainCheck;
;
//# sourceMappingURL=UnitTest1.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BagRegister = exports.BagRule = exports.Bag = void 0;
class Bag {
    constructor(color) {
        this.color = color;
        this.isContainedIn = new Array();
        this.MyRules = new Array();
    }
}
exports.Bag = Bag;
class BagRule {
    constructor(count, bag) {
        this.Count = count;
        this.MustContain = bag;
    }
}
exports.BagRule = BagRule;
class BagRegister {
    constructor() {
        this.KnownBags = new Object();
    }
    Ruleparser(ruleDefinition) {
        var matches = /(.*?) *bags *contain *(.*)/u.exec(ruleDefinition);
        if (matches.length != 3) {
            return null;
        }
        var bagColor = matches[1];
        var rules = new Array();
        matches[2].split(",").forEach(function (definition) {
            definition = /(\d+|no) *([^,.\n]*) bag/u.exec(definition);
            if (definition.length != 3 || definition[1] == "no") {
                return;
            }
            try {
                rules.push({
                    Count: parseInt(definition[1]),
                    MustContain: definition[2]
                });
            }
            catch (e) { }
        });
        return {
            color: bagColor,
            rules: rules
        };
    }
    Register(Definition) {
        var bag = this.GetBag(Definition.color);
        Definition.rules.forEach(rule => {
            let ruleBag = this.GetBag(rule.MustContain);
            bag.MyRules.push(new BagRule(rule.Count, ruleBag));
            ruleBag.isContainedIn.push(bag);
            ruleBag.containedInUniqueCount++;
            ruleBag.containedInOverall += rule.Count;
        });
        return bag;
    }
    GetPossibleHoders(bag, possibleHolders) {
        if (possibleHolders == undefined) {
            possibleHolders = {
                list: new Object(),
                count: 0
            };
        }
        bag.isContainedIn.forEach(b => {
            if (possibleHolders.list[b.color] == undefined) {
                possibleHolders.list[b.color] = b;
                possibleHolders.count++;
                this.GetPossibleHoders(b, possibleHolders);
            }
        });
        return possibleHolders;
    }
    GetContainedBags(bag) {
        var i = 0;
        bag.MyRules.forEach(b => {
            i += b.Count;
            i += b.Count * this.GetContainedBags(b.MustContain);
        });
        return i;
    }
    GetBag(color) {
        if (!this.KnownBags[color]) {
            this.KnownBags[color] = new Bag(color);
        }
        return this.KnownBags[color];
    }
}
exports.BagRegister = BagRegister;
//light red bags    contain     1 bright white bag, 2 muted yellow bags.
//dark orange bags  contain     3 bright white bags, 4 muted yellow bags.
//bright white bags contain     1 shiny gold bag.
//muted yellow bags contain     2 shiny gold bags, 9 faded blue bags.
//shiny gold bags   contain     1 dark olive bag, 2 vibrant plum bags.
//dark olive bags   contain     3 faded blue bags, 4 dotted black bags.
//vibrant plum bags contain     5 faded blue bags, 6 dotted black bags.
//faded blue bags   contain     no other bags.
//dotted black bags contain     no other bags.
//# sourceMappingURL=classes.js.map
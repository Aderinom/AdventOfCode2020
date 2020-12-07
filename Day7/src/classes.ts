import { error } from "console";


export interface IBagRuleDefinition {
    color: string;
    rules?: IBagRule[];
}
interface IBagRule {
    Count: number;
    MustContain: Bag | string;
}
export class Bag {
    public readonly color: string;
    public isContainedIn: Bag[];
    public MyRules: BagRule[]; 
    constructor(color: string) {
        this.color = color;
        this.isContainedIn = new Array<Bag>();
        this.MyRules = new Array<BagRule>();

    }
}
export class BagRule implements IBagRule {
    public Count: number;
    public MustContain: Bag;

    constructor(count: number, bag: Bag) {
        this.Count = count;
        this.MustContain = bag;
    }
}
export class BagRegister {
    public KnownBags = new Object();

    public Ruleparser(ruleDefinition: string): IBagRuleDefinition {
        var matches = /(.*?) *bags *contain *(.*)/u.exec(ruleDefinition);

        if (matches.length != 3) {
            return null;
        }

        var bagColor: string = matches[1];
        var rules: IBagRule[] = new Array<IBagRule>();
        matches[2].split(",").forEach(function (definition: any) {
            definition = /(\d+|no) *([^,.\n]*) bag/u.exec(definition);
            if (definition.length != 3 || definition[1] == "no") { return; }
            try {
                rules.push({
                    Count: parseInt(definition[1]),
                    MustContain: definition[2]
                });
            } catch (e) { }
        })


        return {
            color: bagColor,
            rules: rules
        }
    }

    public Register(Definition: IBagRuleDefinition) {
        var bag = this.GetBag(Definition.color);
        Definition.rules.forEach(rule => {
            let ruleBag = this.GetBag(rule.MustContain);
            bag.MyRules.push(new BagRule(rule.Count, ruleBag));
            ruleBag.isContainedIn.push(bag);
            ruleBag.containedInUniqueCount++;
            ruleBag.containedInOverall += rule.Count;
        })
        return bag;
    }
    public GetPossibleHoders(bag: Bag, possibleHolders?: { list: object, count: number }): { list: object, count: number } {
        if (possibleHolders == undefined) {
            possibleHolders ={
                list: new Object(),
                count: 0
            }
        }

        bag.isContainedIn.forEach(b => {
            if (possibleHolders.list[b.color] == undefined) {
                possibleHolders.list[b.color] = b;
                possibleHolders.count ++;
                this.GetPossibleHoders(b, possibleHolders)
            }            
        });
        return possibleHolders;
    }
    public GetContainedBags(bag: Bag ): number{
        var i = 0;
        bag.MyRules.forEach(b => {
            i += b.Count;
            i += b.Count * this.GetContainedBags(b.MustContain);
        });
        return i;
    }
    public GetBag(color) {
        if (!this.KnownBags[color]) {
            this.KnownBags[color] = new Bag(color);
        }
        return this.KnownBags[color];
    }
}

//light red bags    contain     1 bright white bag, 2 muted yellow bags.
//dark orange bags  contain     3 bright white bags, 4 muted yellow bags.
//bright white bags contain     1 shiny gold bag.
//muted yellow bags contain     2 shiny gold bags, 9 faded blue bags.
//shiny gold bags   contain     1 dark olive bag, 2 vibrant plum bags.
//dark olive bags   contain     3 faded blue bags, 4 dotted black bags.
//vibrant plum bags contain     5 faded blue bags, 6 dotted black bags.
//faded blue bags   contain     no other bags.
//dotted black bags contain     no other bags.
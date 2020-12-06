"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportMaker = exports.Passport = void 0;
class Passport {
    constructor(byr, iyr, eyr, hgt, hcl, ecl, pid, cid) {
        this.byr = byr;
        this.iyr = iyr;
        this.eyr = eyr;
        this.hgt = hgt;
        this.hcl = hcl;
        this.ecl = ecl;
        this.pid = pid;
        this.cid = cid;
        if (byr && iyr && eyr && hgt && hcl && ecl && pid) {
            this.valid = true;
        }
        else {
            this.valid = false;
        }
    }
    checkValidityExtended() {
        if (!this.valid) {
            return;
        }
        try {
            if (!(parseInt(this.byr) >= 1920 && parseInt(this.byr) <= 2002)) {
                this.valid = false;
                return;
            }
            if (!(parseInt(this.iyr) >= 2010 && parseInt(this.iyr) <= 2020)) {
                this.valid = false;
                return;
            }
            if (!(parseInt(this.eyr) >= 2020 && parseInt(this.eyr) <= 2030)) {
                this.valid = false;
                return;
            }
            if (/\dcm/.test(this.hgt)) {
                let height = parseInt(this.hgt.replace(/[^\d]/, ""));
                if (!(height >= 150 && height <= 193)) {
                    this.valid = false;
                    return;
                }
            }
            else {
                if (/\din/.test(this.hgt)) {
                    let height = parseInt(this.hgt.replace(/[^\d]/, ""));
                    if (!(height >= 59 && height <= 76)) {
                        this.valid = false;
                        return;
                    }
                }
                else {
                    this.valid = false;
                    return;
                }
            }
            if (!/^ *?#[0-9a-f]{6} *?$/.test(this.hcl)) {
                this.valid = false;
                return;
            }
            if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(this.ecl)) {
                this.valid = false;
                return;
            }
            if (!/^ *\d{9} *?$/.test(this.pid)) {
                this.valid = false;
                return;
            }
        }
        catch (e) {
            this.valid = false;
        }
    }
}
exports.Passport = Passport;
class PassportMaker {
    create(Data) {
        return new Passport(Data.byr, Data.iyr, Data.eyr, Data.hgt, Data.hcl, Data.ecl, Data.pid, Data.cid);
    }
    parsePassString(passText) {
        let Matches = passText.match(/([^ :]*) *?: *?([^ \r\n]+)\n?/gm);
        var Pass = {};
        Matches.forEach(f => {
            try {
                let FieldPair = /([^ :]*) *?: *?([^ ]+)/gm.exec(f.trim());
                if (FieldPair != null && FieldPair.length >= 3) {
                    Pass[FieldPair[1].trim()] = FieldPair[2];
                }
            }
            catch (e) {
            }
        });
        return this.create(Pass);
    }
    parseMultiplePassStrings(passText) {
        return passText.split(/\r?\n\r?\n/).map(P => {
            return this.parsePassString(P);
        });
    }
}
exports.PassportMaker = PassportMaker;
//# sourceMappingURL=classes.js.map

export class Passport{
    public valid: boolean;
    constructor(
        public byr?: string,
        public iyr?: string,
        public eyr?: string,
        public hgt?: string,
        public hcl?: string,
        public ecl?: string,
        public pid?: string,
        public cid?: string,
    ) {
        if (byr && iyr && eyr && hgt && hcl && ecl && pid) {
            this.valid = true;
        } else {
            this.valid = false;
        }
    }
    public checkValidityExtended() {
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
            } else {
                if (/\din/.test(this.hgt)) {
                    let height = parseInt(this.hgt.replace(/[^\d]/, ""));
                    if (!(height >= 59 && height <= 76)) {
                        this.valid = false;
                        return;
                    }
                } else {
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
        } catch (e) {
            this.valid = false;
        }
    }

}

export class PassportMaker {
    private create(Data: any): Passport {
        return new Passport(Data.byr, Data.iyr, Data.eyr, Data.hgt, Data.hcl, Data.ecl, Data.pid,Data.cid);
    }
    public parsePassString(passText: string): Passport {
        let Matches = passText.match(/([^ :]*) *?: *?([^ \r\n]+)\n?/gm);

        var Pass = {};
        Matches.forEach(f => {
            try {
                let FieldPair = /([^ :]*) *?: *?([^ ]+)/gm.exec(f.trim())
                if (FieldPair != null && FieldPair.length >= 3) {
                    Pass[FieldPair[1].trim()] = FieldPair[2];
                }
            } catch (e) {

            }
        })

        return this.create(Pass);
    }
    public parseMultiplePassStrings(passText: string): Passport[] {
        return passText.split(/\r?\n\r?\n/).map(P => {
            return this.parsePassString(P);
        })
    }
}


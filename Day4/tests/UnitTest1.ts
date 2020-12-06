import assert = require('assert');
import { PassportMaker, Passport } from '../src/classes';

export function ParseValidPassword() {

    const ValidPassString = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
 byr:1937 iyr:2017 cid:147 hgt:183cm`


    const PM = new PassportMaker;
    const ValidPass: Passport = new Passport("1937", "2017", "2020", "183cm", "#fffffd", "gry", "860033327", "147");
    let pass: Passport;
    try {
        pass = PM.parsePassString(ValidPassString);
    } catch (e) {
        assert.fail(e)
    }
    assert.deepEqual(pass, ValidPass, "Parsed Pass not expected values");
};

export function ParseInvalidPassport() {

    const ValidPassString = `iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929`

    const PM = new PassportMaker;
    const InvalidPass: Passport = new Passport("1929", "2013", "2023", undefined, "#cfa07d", "amb", "028048884", "350");
    let pass: Passport;
    try {
        pass = PM.parsePassString(ValidPassString);
    } catch (e) {
        assert.fail(e)
    }
    assert.deepEqual(pass, InvalidPass, "Parsed Pass not expected values");
    assert.ok(!pass.valid, "Passport is valid but shouldn't be");
};

export function ParseMultiblePasswords() {

    const ValidPassString = 
"ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm\n\n\
iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929\n\n\
hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm\n\n\
hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in"

    const PM = new PassportMaker;
    const ValidPass: Passport = new Passport("1937", "2017", "2020", "183cm", "#fffffd", "gry", "860033327", "147");

    let pass: Passport[];
    try {
        pass = PM.parseMultiplePassStrings(ValidPassString);
    } catch (e) {
        assert.fail(e)
    }
    assert.deepEqual(pass[0], ValidPass, "Parsed Pass not expected values");
};

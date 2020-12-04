// http://adventofcode.com/2020/day/4
const fs = require("fs")
const _ = require("lodash")

const parse = text => text
    .split("\n\n")
    .map(passport => _.fromPairs(passport
        .split(/\s+/g)
        .map(part => part.split(":"))
        .filter(part => part.length === 2))
    )

const validate = passport => {
    if (!passport.byr) { // (Birth Year)
        return false
    } else if (!passport.iyr) { // (Issue Year)
        return false
    } else if (!passport.eyr) { // (Expiration Year)
        return false
    } else if (!passport.hgt) { // (Height)
        return false
    } else if (!passport.hcl) { // (Hair Color)
        return false
    } else if (!passport.ecl) { // (Eye Color)
        return false
    } else if (!passport.pid) { // (Passport ID)
        return false
    } else if (!passport.cid) { // (Country ID)
    } else {
    }

    // byr (Birth Year) - four digits; at least 1920 and at most 2002.
    if (passport.byr.length !== 4) { 
        return false
    } else if (passport.byr < "1920") {
        return false
    } else if (passport.byr > "2002") {
        return false
    }

    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    if (passport.iyr.length !== 4) { 
        return false
    } else if (passport.iyr < "2010") {
        return false
    } else if (passport.iyr > "2020") {
        return false
    }

    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    if (passport.eyr.length !== 4) { 
        return false
    } else if (passport.eyr < "2020") {
        return false
    } else if (passport.eyr > "2030") {
        return false
    }

    // hgt (Height) - a number followed by either cm or in:
    const hgt_match = passport.hgt.match(/^([1-9]\d*)(cm|in)$/)
    if (!hgt_match) {
        return false
    } else {
        // If cm, the number must be at least 150 and at most 193.
        // If in, the number must be at least 59 and at most 76.
        const v = parseInt(hgt_match[1])
        if (hgt_match[2] === "cm") {
            if ((v < 150) || (v > 193)) {
                return false
            }
        } else {
            if ((v < 59) || (v > 76)) {
                return false
            }
        }
    }

    // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    const hcl_match = passport.hcl.match(/^#[0-9a-f]{6}$/)
    if (!hcl_match) {
        return false
    } 

    // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    const ecl_match = passport.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)
    if (!ecl_match) {
        return false
    } 

    // pid (Passport ID) - a nine-digit number, including leading zeroes.
    const pid_match = passport.pid.match(/^\d{9}$/)
    if (!pid_match) {
        return false
    } 

    // cid (Country ID) - ignored, missing or not.
    return true
}

const passports = parse(fs.readFileSync("day_04.txt", "utf-8"))
    .filter(validate)
console.log(passports.length)


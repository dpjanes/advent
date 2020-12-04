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
        return true // ok to be missing
    } else {
        return true
    }
}

const passports = parse(fs.readFileSync("day_04.txt", "utf-8"))
    .filter(validate)

console.log(passports.length)

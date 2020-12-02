// http://adventofcode.com/2020/day/2
const fs = require("fs")

const parse = text => 
    text
        .split("\n")
        .map(line => line.match(/^(?<min>\d+)-(?<max>\d+) (?<letter>[a-z]): (?<password>[a-z]*)/))
        .filter(match => match)
        .map(match => match.groups)
        .map(group => ({
            first: parseInt(group.min) - 1,
            second: parseInt(group.max) - 1,
            letter: group.letter,
            password: group.password.split(""),
        }))

const is_valid = d => 
    (d.password[d.first] === d.letter) ^ (d.password[d.second] === d.letter)

const passwords = parse(fs.readFileSync("day_02.txt", "utf-8"))
/*
const passwords = parse(`
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
`)
*/

console.log(passwords.filter(is_valid).length)

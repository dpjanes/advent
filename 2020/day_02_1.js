// http://adventofcode.com/2020/day/2
const fs = require("fs")

const parse = text => 
    text
        .split("\n")
        .map(line => line.match(/^(?<min>\d+)-(?<max>\d+) (?<letter>[a-z]): (?<password>[a-z]*)/))
        .filter(match => match)
        .map(match => match.groups)
        .map(group => ({
            min: parseInt(group.min),
            max: parseInt(group.max),
            letter: group.letter,
            password: group.password.split(""),
        }))

const is_valid = d => {
    const count = d.password.filter(letter => letter === d.letter).length
    return count >= d.min && count <= d.max
}

const passwords = parse(fs.readFileSync("day_02.txt", "utf-8"))

console.log(passwords.filter(is_valid).length)

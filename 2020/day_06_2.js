// http://adventofcode.com/2020/day/4
const fs = require("fs")
const _ = require("lodash")

const parse = text => text
    .split("\n\n")
    .map(line => _.intersection(...line
        .split("\n")
        .map(line => line.split("")))
    )

const answers = parse(fs.readFileSync("day_06.txt", "utf-8"))
// console.log(answers)
const count = answers
    .map(a => a.length)
    .reduce((r, c) => r + c, 0)

console.log(count)
/*
*/

// http://adventofcode.com/2020/day/6
const fs = require("fs")
const _ = require("lodash")

const parse = text => text
    .split("\n\n")
    .map(line => new Set(line.split("").filter(c => c.match(/^[a-z]$/))))

const answers = parse(fs.readFileSync("day_06.txt", "utf-8"))
const count = answers
    .map(a => a.size)
    .reduce((r, c) => r + c, 0)

console.log(count)

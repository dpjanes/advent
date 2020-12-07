// http://adventofcode.com/2020/day/7
const fs = require("fs")
const _ = require("lodash")

const parse = text => text
    .split("\n")
    .filter(line => line.length)
    .map(line => line.match(/^(?<type>[a-z ]*) bags contain (?<rest>.*)/))
    .map(lmatch => {
        const rule = {
            type: lmatch.groups.type,
            contains: {}
        }

        lmatch.groups.rest
            .split(/[,.]/g)
            .map(part => part.trim())
            .filter(part => part.length)
            .map(part => part.match(/^(?<count>\d+) (?<color>[a-z ]*) bag/))
            .filter(match => match)
            .forEach(match => rule.contains[match.groups.color] = parseInt(match.groups.count))

        return rule
    })

const rules = parse(fs.readFileSync("day_07.sample", "utf-8"))
console.log(rules)

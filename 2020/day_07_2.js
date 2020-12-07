// http://adventofcode.com/2020/day/7
const fs = require("fs")
const _ = require("lodash")

const parse = text => text
    .split("\n")
    .filter(line => line.length)
    .map(line => line.match(/^(?<type>[a-z ]*) bags contain (?<rest>.*)/))
    .map(lmatch => {
        const rule = {
            color: lmatch.groups.type,
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


const rules = parse(fs.readFileSync("day_07.txt", "utf-8"))
const colors = Array.from(new Set(rules.map(rule => rule.color)))

const ruled = {}
rules.forEach(rule => ruled[rule.color] = rule.contains)

const _traverse = color => {
    let count = 1

    _.mapValues(ruled[color], (n, subcolor) => {
        console.log(color, n, subcolor)
        count += n * _traverse(subcolor)
    })

    return count
}

console.log(_traverse("shiny gold") - 1)

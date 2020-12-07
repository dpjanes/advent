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
const ruled = {}
rules.forEach(rule => ruled[rule.color] = new Set(_.keys(rule.contains)))

const contains_color = (color, target) => {
    const contains = ruled[color]
    if (contains.has(target)) {
        return true
    }

    for (let subcolor of contains) {
        if (contains_color(subcolor, target)) {
            return true
        }
    }

    return false
}

const colors = Array.from(new Set(rules.map(rule => rule.color)))
count = 0
colors.forEach(color => {
    if (contains_color(color, "shiny gold")) {
        count += 1
        console.log(color)
    }
})

console.log(count)

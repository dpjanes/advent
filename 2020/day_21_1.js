// http://adventofcode.com/2020/day/3
const fs = require("fs")
const assert = require("assert")
const _ = require("lodash")

const parse = text => text
    .split("\n")
    .map(line => line.match(/^(.*) [(]contains (.*)[)]/))
    .map(match => {
        return [
            match[1].split(" ").map(x => x.trim()).filter(x => x.length),
            match[2].split(",").map(x => x.trim()).filter(x => x.length),
        ]
    })

const lines = parse(fs.readFileSync("day_21.sample", "utf-8"))

const allergins = new Set()
const foods = new Set()
const maybes = {}
lines.forEach(t => {
    console.log("-", t[0], t[1])
    for (let allergin of t[1]) {
        allergins.add(allergin)
        maybes[allergin] = maybes[allergin] || new Set()
        for (let food of t[0]) {
            maybes[allergin].add(food)
        }
    }

    for (let food of t[0]) {
        foods.add(food)
    }
})

console.log(maybes)
console.log(allergins)
console.log(foods)



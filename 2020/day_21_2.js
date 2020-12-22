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

const lines = parse(fs.readFileSync("day_21.txt", "utf-8"))
const possibles = {}
const gudfud = new Set()

lines.forEach(t => {
    const foods = t[0]
    const allergins = t[1]

    foods.forEach(food => {
        gudfud.add(food)
    })
    
    allergins.forEach(a => {
        if (!possibles[a]) {
            possibles[a] = foods
        } else {
            possibles[a] = _.intersection(possibles[a], foods)
        }
    })
})

const allergind = {}

let changes = true
while (changes) {
    changes = false

    _.mapValues(possibles, (foods, allergin) => {
        if (foods.length !== 1) {
            return
        }

        const food = foods[0]
        allergind[allergin] = food
        changes = true

        gudfud.delete(food)

        _.mapValues(possibles, (foods, allergin) => {
            _.pull(foods, food)
        })
    })
}

const items = _.toPairs(allergind)
items.sort()
console.log(items.map(item => item[1]).join(","))

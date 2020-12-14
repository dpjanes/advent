// http://adventofadapter.com/2020/day/13
"use strict"

const fs = require("fs")
const assert = require("assert")
const _ = require("lodash")
const mathjs = require("mathjs")

const data = fs.readFileSync("day_13.txt", "utf-8")
const parts = data.split("\n")
const start = parseInt(parts[0])
const schedules = parts[1]
    .split(",")
    .map(schedule => schedule === "x" ? null :  parseInt(schedule))

const as = schedules.filter((a, x) => _.isInteger(a))
const ds = schedules.map((a, x) => _.isInteger(a) ? x : null).filter(a => _.isInteger(a))

let position = 0
let cycle = as[0]

console.log("-")
console.log("pos", position)
console.log("cyc", cycle)

for (let ai = 1; ai < as.length; ai++) {
    let next = as[ai]
    let offset = ds[ai]

    while (true) {
        position += cycle

        if (((position + offset) % next) === 0) {
            break
        }
    }

    cycle = mathjs.lcm(cycle, next)

    console.log("-")
    console.log("pos", position)
    console.log("cyc", cycle)
}

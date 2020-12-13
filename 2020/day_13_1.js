// http://adventofadapter.com/2020/day/13
"use strict"

const fs = require("fs")
const assert = require("assert")
const _ = require("lodash")

const data = fs.readFileSync("day_13.txt", "utf-8")
const parts = data.split("\n")
const start = parseInt(parts[0])
const schedules = parts[1]
    .split(",")
    .filter(schedule => schedule !== "x")
    .map(schedule => parseInt(schedule))
    
const waits = schedules.map(s => (s - start % s) % s)

let small_index
let small_delta = Number.MAX_SAFE_INTEGER

for (let wi = 0; wi < waits.length; wi++) {
    console.log(waits[wi], small_delta)
    if (waits[wi] < small_delta) {
        small_index = wi
        small_delta = waits[wi]
    }
}

const bus_id = schedules[small_index]

console.log("bus_id", bus_id)
console.log("wait", small_delta)
console.log("result", bus_id * small_delta)

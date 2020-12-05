// http://adventofcode.com/2020/day/4
const fs = require("fs")
const _ = require("lodash")

const parse = text => text
    .split("\n")
    .filter(seat => seat.length)
    .map(seat => {
        const row = parseInt(seat.substring(0, 7)
            .replace(/F/g, "0")
            .replace(/B/g, "1"), 2)
        const col = parseInt(seat.substring(7)
            .replace(/L/g, "0")
            .replace(/R/g, "1"), 2)

        return [ row, col, row * 8 + col ]
    })

const seats = parse(fs.readFileSync("day_05.txt", "utf-8"))
console.log(Math.max(...seats.map(st => st[2])))

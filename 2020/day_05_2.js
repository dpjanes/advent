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

const seats = new Set()
parse(fs.readFileSync("day_05.txt", "utf-8")).forEach(st => {
    seats.add(st[2])
})

for (row = 0; row < 127; row++) {
    let all = true
    let anys = []
    for (col = 0; col < 8; col++) {
        const code = row * 8 + col
        if (seats.has(code)) {
            all = false
        } else {
            anys.push([ row, col, code ])
        }
    }

    if (all) {
        continue
    }

    anys
        .filter(any => seats.has(any[2] - 1) && seats.has(any[2] + 1))
        .forEach(any => {
            console.log(any)
        })
}

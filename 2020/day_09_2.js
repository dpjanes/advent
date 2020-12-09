// http://adventofcode.com/2020/day/9
const fs = require("fs")
const _ = require("lodash")

const parse = text => text
    .split("\n")
    .filter(line => line.length)
    .map(line => parseInt(line))

const find = (codes, window) => {
    for (let ci = window; ci < codes.length; ci++) {
        let c = codes[ci]

        let valid = false
        for (let xi = ci - window; xi < ci && !valid; xi++) {
            let x = codes[xi]

            for (let yi = ci - window; yi < ci && !valid; yi++) {
                let y = codes[yi]

                if (xi === yi) {
                    continue
                } else if ((x + y) === c) {
                    valid = true
                }
            }
        }

        if (!valid) {
            return ci
        }
    }

    return null
}

const run = (codes, position) => {
    const target = codes[position]

    for (let ci = 0; ci < position; ci++) {
        let sum = 0
        for (let xi = ci; xi < position; xi++) {
            sum += codes[xi]
            if (sum === target) {
                const range = codes.slice(ci, xi + 1)
                console.log(range)
                console.log(Math.min(...range) + Math.max(...range))
                return
            }
        }
    }

    console.log("no answer")
}

const codes = parse(fs.readFileSync("day_09.txt", "utf-8"))
const position = find(codes, 25)
run(codes, position) 

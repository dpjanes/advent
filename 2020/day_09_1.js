// http://adventofcode.com/2020/day/9
const fs = require("fs")
const _ = require("lodash")

const parse = text => text
    .split("\n")
    .filter(line => line.length)
    .map(line => parseInt(line))

const run = (codes, window) => {
    const validate = position => {
    }

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
            return c
        }
    }

    return null
}

const codes = parse(fs.readFileSync("day_09.sample", "utf-8"))
console.log(run(codes, 5))

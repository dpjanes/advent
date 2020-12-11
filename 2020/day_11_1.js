// http://adventofadapter.com/2020/day/11
"use strict"

const fs = require("fs")
const _ = require("lodash")

const FLOOR = 0
const EMPTY = 1
const OCCUPIED = 2
const OOB = 3

const parse = text => text
    .split("\n")
    .filter(line => line.length)
    .map(line => line
        .split("")
        .map(c => {
            switch (c) {
            case '.': return FLOOR
            case 'L': return EMPTY
            case '#': return OCCUPIED
            }
        })
    )

const pretty = grid => grid
    .map(row => row
        .map(c => {
            switch (c) {
            case EMPTY: return 'L'
            case FLOOR: return '.'
            case OCCUPIED: return '#'
            }
        })
        .join("")
    ).join("\n")

const iterate = ogrid => {
    const width = ogrid[0].length
    const height = ogrid.length

    for (let safety = 0; safety < 200; safety++) {
        const ngrid = new Array(height).fill(null).map(row => new Array(width).fill(FLOOR))

        const get = (_grid, x, y) => {
            if ((x < 0) || (x >= width) || (y < 0) || (y >= height)) {
                return OOB
            } else {
                return _grid[y][x]
            }
        }

        const set = (_grid, x, y, v) => {
            _grid[y][x] = v
        }

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const counts = [ 0, 0, 0, 0 ]

                /*
                let debug = false
                if (j === 9 && i === 2) {
                    debug = true
                }
                */

                for (let y = -1; y <= 1; y++) {
                    for (let x = -1; x <= 1; x++) {
                        if ((x === 0) && (y === 0)) {
                            continue
                        }

                        // if (debug) console.log("DEBUG", i, j, x + i, y + j, get(ogrid, x + i, y + j))

                        counts[get(ogrid, x + i, y + j)] += 1
                    }
                }

                set(ngrid, i, j, get(ogrid, i, j))


                switch (get(ogrid, i, j)) {
                case EMPTY:
                    if (counts[OCCUPIED] === 0) {
                        set(ngrid, i, j, OCCUPIED)
                    }
                    break

                case OCCUPIED:
                    if (counts[OCCUPIED] >= 4) {
                        set(ngrid, i, j, EMPTY)
                    }
                    break
                }
            }
        }

        let changes = 0
        const counts = [ 0, 0, 0, 0]
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (get(ngrid, i, j) !== get(ogrid, i, j)) {
                    changes += 1
                }

                counts[get(ngrid, i, j)] += 1
            }
        }

        // console.log("---", changes)
        // console.log(pretty(ngrid))

        if (changes === 0) {
            console.log(counts[OCCUPIED])
            return
        }

        ogrid = ngrid
    }

    console.log("BAD")
}

const grid = parse(fs.readFileSync("day_11.txt", "utf-8"))
// console.log(pretty(grid))
iterate(grid, 100000000)

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

const iterate = (ogrid, MAX) => {
    const width = ogrid[0].length
    const height = ogrid.length

    for (let safety = 0; safety < MAX; safety++) {
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

                const directions = [
                    [ -1, -1 ],
                    [ 0, -1 ],
                    [ 1, -1 ],

                    [ -1, 0 ],
                    [ 1, 0 ],

                    [ -1, 1 ],
                    [ 0, 1 ],
                    [ 1, 1 ],
                ]

                for (let di = 0; di < directions.length; di++) {
                    const d = directions[di]

                    let x = i
                    let y = j

                    while (true) {
                        x += d[0]
                        y += d[1]

                        // console.log("-", di, x, y)

                        const c = get(ogrid, x, y)
                        if (c === FLOOR) {
                            // keep looking
                        } else if (c === OOB) {
                            break
                        } else {
                            counts[c] += 1
                            break
                        }
                    }
                }

                // console.log(i, j, counts)

                set(ngrid, i, j, get(ogrid, i, j))

                switch (get(ogrid, i, j)) {
                case EMPTY:
                    if (counts[OCCUPIED] === 0) {
                        set(ngrid, i, j, OCCUPIED)
                    }
                    break

                case OCCUPIED:
                    if (counts[OCCUPIED] >= 5) {
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

        //console.log("---", changes)
        //console.log(pretty(ngrid))

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
iterate(grid, 200000)

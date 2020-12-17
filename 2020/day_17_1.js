// http://adventofadapter.com/2020/day/17
"use strict"

const fs = require("fs")
const _ = require("lodash")
const assert = require("assert")

const INACTIVE = "."
const ACTIVE = "#"

const Grid = () => {
    const self = Object.assign({})

    let minx = 0
    let maxx = 0
    let miny = 0
    let maxy = 0
    let minz = 0
    let maxz = 0
    
    const _key = (x, y, z) => `${x}/${y}/${z}`

    self.data = {}
    self.set = (x, y, z, c) => {
        if (!c) {
            delete self.data[_key(x, y, z)]
        } else {
            self.data[_key(x, y, z)] = c

            minx = Math.min(x, minx)
            miny = Math.min(y, miny)
            minz = Math.min(z, minz)

            maxx = Math.max(x, maxx)
            maxy = Math.max(y, maxy)
            maxz = Math.max(z, maxz)
        }

    }
    self.get = (x, y, z) => !!self.data[_key(x, y, z)]

    self.initialize = raw => {
        raw.split("\n")
            .filter(line => line.length)
            .forEach((line, y, lines) => {
                // y -= (lines.length - 1) / 2
                maxy = Math.max(y, maxy)
                miny = Math.min(y, miny)

                line.split("")
                    .forEach((c, x, cs) => {
                        // x -= (cs.length - 1) / 2
                        maxx = Math.max(x, maxx)
                        minx = Math.min(x, minx)
                        
                        self.set(x, y, 0, c === '#')
                    })
            })
    }

    self.pretty = () => {
        console.log("----")
        for (let z = minz; z <= maxz; z++) {
            console.log(`z=${z}`)
            for (let y = miny; y <= maxy; y++) {
                const cs = []
                for (let x = minx; x <= maxx; x++) {
                    cs.push(self.get(x, y, z) ? "#" : ".")
                }
                console.log(cs.join(""))
            }
        }
    }

    self.iterate = () => {
        const ngrid = Grid()

        for (let z = minz - 1; z <= maxz + 1; z++) {
// console.log()
            for (let y = miny - 1; y <= maxy + 1; y++) {
// let counts = []
                for (let x = minx - 1; x <= maxx + 1; x++) {
                    let count = 0

                    for (let dz = -1; dz <= 1; dz++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            for (let dx = -1; dx <= 1; dx++) {
                                if ((dx === 0) && (dy === 0) && (dz === 0)) {
                                    continue
                                } else if (self.get(x + dx, y + dy, z + dz)) {
                                    count += 1
                                }
                            }
                        }
                    }

// counts.push(count)
                    if (self.get(x, y, z)) {
                        if ((count === 2) || (count === 3)) {
                            ngrid.set(x, y, z, true)
                        } else {
                            ngrid.set(x, y, z, false)
                        }
                    } else {
                        if (count === 3) {
                            ngrid.set(x, y, z, true)
                        } else {
                            ngrid.set(x, y, z, false)
                        }
                    }

                    // console.log(x, y, z, "=", count)
                }
// console.log(counts.join(""))
            }
        }

        return ngrid
    }

    self.count = () => {
        let count = 0

        for (let z = minz; z <= maxz; z++) {
            for (let y = miny; y <= maxy; y++) {
                for (let x = minx; x <= maxx; x++) {
                    count += self.get(x, y, z) ? 1 : 0
                }
            }
        }

        return count
    }

    return self
}

const run = (raw, iterations) => {
    let grid = Grid()
    grid.initialize(raw)
    grid.pretty()

    for (let i = 0; i < iterations; i++) {
        /*
        if ((i % 10000) === 0) {
            console.log("*", i)
        }
        */

        grid = grid.iterate()
        // grid.pretty()

    }

    console.log("COUNT", grid.count())


}

run(fs.readFileSync("day_17.txt", "utf-8"), 6)

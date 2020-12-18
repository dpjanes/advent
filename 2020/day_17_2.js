// http://adventofadapter.com/2020/day/17
"use strict"

const fs = require("fs")
const _ = require("lodash")
const assert = require("assert")

const Grid = () => {
    const self = Object.assign({})

    let minx = 0
    let maxx = 0
    let miny = 0
    let maxy = 0
    let minz = 0
    let maxz = 0
    let minw = 0
    let maxw = 0
    
    const _key = (x, y, z, w) => `${x}/${y}/${z}/${w}`

    self.data = {}
    self.set = (x, y, z, w, c) => {
        if (!c) {
            delete self.data[_key(x, y, z, w)]
        } else {
            self.data[_key(x, y, z, w)] = c

            minx = Math.min(x, minx)
            miny = Math.min(y, miny)
            minz = Math.min(z, minz)
            minw = Math.min(w, minw)

            maxx = Math.max(x, maxx)
            maxy = Math.max(y, maxy)
            maxz = Math.max(z, maxz)
            maxw = Math.max(w, maxw)
        }

    }
    self.get = (x, y, z, w) => !!self.data[_key(x, y, z, w)]

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
                        
                        self.set(x, y, 0, 0, c === '#')
                    })
            })
    }

    self.pretty = () => {
        console.log("----")
        for (let w = minw; w <= maxw; w++) {
            for (let z = minz; z <= maxz; z++) {
                console.log(`z=${z},w=${w}`)
                for (let y = miny; y <= maxy; y++) {
                    const cs = []
                    for (let x = minx; x <= maxx; x++) {
                        cs.push(self.get(x, y, z, w) ? "#" : ".")
                    }
                    console.log(cs.join(""))
                }
            }
        }
    }

    self.iterate = () => {
        const ngrid = Grid()

        for (let w = minw - 1; w <= maxw + 1; w++) {
            for (let z = minz - 1; z <= maxz + 1; z++) {
                for (let y = miny - 1; y <= maxy + 1; y++) {
                    for (let x = minx - 1; x <= maxx + 1; x++) {
                        let count = 0

                        for (let dw = -1; dw <= 1; dw++) {
                            for (let dz = -1; dz <= 1; dz++) {
                                for (let dy = -1; dy <= 1; dy++) {
                                    for (let dx = -1; dx <= 1; dx++) {
                                        if ((dx === 0) && (dy === 0) && (dz === 0) && (dw === 0)) {
                                            continue
                                        } else if (self.get(x + dx, y + dy, z + dz, w + dw)) {
                                            count += 1
                                        }
                                    }
                                }
                            }
                        }

                        if (self.get(x, y, z, w)) {
                            if ((count === 2) || (count === 3)) {
                                ngrid.set(x, y, z, w, true)
                            } else {
                                ngrid.set(x, y, z, w, false)
                            }
                        } else {
                            if (count === 3) {
                                ngrid.set(x, y, z, w, true)
                            } else {
                                ngrid.set(x, y, z, w, false)
                            }
                        }
                    }
                }
            }
        }

        return ngrid
    }

    self.count = () => {
        let count = 0

        for (let w = minw; w <= maxw; w++) {
            for (let z = minz; z <= maxz; z++) {
                for (let y = miny; y <= maxy; y++) {
                    for (let x = minx; x <= maxx; x++) {
                        count += self.get(x, y, z, w) ? 1 : 0
                    }
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
    console.log("COUNT", grid.count())
        grid = grid.iterate()
        // grid.pretty()
    }

    console.log("COUNT", grid.count())


}

run(fs.readFileSync("day_17.sample", "utf-8"), 6)

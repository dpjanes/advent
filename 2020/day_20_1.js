// http://adventofadapter.com/2020/day/20
"use strict"

const fs = require("fs")
const _ = require("lodash")
const assert = require("assert")

const Grid = (raw) => {
    const self = Object.assign({})

    let minx = 0
    let maxx = 0
    let miny = 0
    let maxy = 0
    let tile = 0
    
    const _key = (x, y) => `${x}/${y}`

    self.tile = () => tile
    self.data = {}
    self.set = (x, y, c) => {
        if (!c) {
            delete self.data[_key(x, y)]
        } else {
            self.data[_key(x, y)] = c

            minx = Math.min(x, minx)
            miny = Math.min(y, miny)

            maxx = Math.max(x, maxx)
            maxy = Math.max(y, maxy)
        }

    }
    self.get = (x, y) => !!self.data[_key(x, y)]

    self.initialize = raw => {
        raw.split("\n")
            .filter(line => line.length)
            .forEach((line, y, lines) => {
                const match = line.match(/Tile (\d+):/)
                if (match) {
                    tile = parseInt(match[1])
                    return
                }

                y -= 1 // lol

                maxy = Math.max(y, maxy)
                miny = Math.min(y, miny)

                line.split("")
                    .forEach((c, x, cs) => {
                        // x -= (cs.length - 1) / 2
                        maxx = Math.max(x, maxx)
                        minx = Math.min(x, minx)
                        
                        self.set(x, y, c === '#')
                    })
            })
    }

    self.borders = () => {
        const bs = []

        {
            const a = []
            const b = []
            for (let xi = minx; xi <= maxx; xi++) {
                a.push(self.get(xi, miny) ? '#' : '.')
                b.push(self.get(xi, maxy) ? '#' : '.')
            }
            bs.push(a.join(""))
            bs.push(b.join(""))
        }

        {
            const a = []
            const b = []
            for (let yi = miny; yi <= maxy; yi++) {
                a.push(self.get(minx, yi) ? '#' : '.')
                b.push(self.get(maxx, yi) ? '#' : '.')
            }
            bs.push(a.join(""))
            bs.push(b.join(""))
        }

        return bs
    }

    self.pretty = () => {
        console.log("----", tile)
        for (let y = miny; y <= maxy; y++) {
            const cs = []
            for (let x = minx; x <= maxx; x++) {
                cs.push(self.get(x, y) ? "#" : ".")
            }
            console.log(cs.join(""))
        }
    }

    self.initialize(raw)

    return self
}

const _flip = s => {
    const parts = s.split("")
    parts.reverse()
    return parts.join("")
}

const run = (raw, iterations) => {
    const grids = raw.split("\n\n").map(block => Grid(block))

    const neighbours = {}
    const borders = {}
    for (let grid of grids) {
        for (let border of grid.borders()) {
            borders[border] = borders[border] || new Set()
            borders[border].add(grid.tile())

            border = _flip(border)
            borders[border] = borders[border] || new Set()
            borders[border].add(grid.tile())
        }

        neighbours[grid.tile()] = []
    }

    console.log(borders)

    _.mapValues(borders, (tiles, border) => {
        if (tiles.size <= 1) {
            return
        }
        
        for (let t1 of tiles) {
            for (let t2 of tiles) {
                if ((t1 !== t2) && (neighbours[t1].indexOf(t2) === -1)) {
                    neighbours[t1].push(t2)
                }
            }
        }
    })

    console.log(neighbours)

    const corners = []
    _.mapValues(neighbours, (tiles, tile) => {
        if (tiles.length === 2) {
            corners.push(tile)
        }
    })

    console.log(corners)
    assert.strictEqual(corners.length, 4)

    console.log(corners[0] * corners[1] * corners[2] * corners[3])
}

run(fs.readFileSync("day_20.txt", "utf-8"), 6)

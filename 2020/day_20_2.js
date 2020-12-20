// http://adventofadapter.com/2020/day/20
"use strict"

const fs = require("fs")
const _ = require("lodash")
const assert = require("assert")

const TOP = 0
const BOTTOM = 1
const LEFT = 2
const RIGHT = 3

const Grid = (raw) => {
    const self = Object.assign({})

    let minx = 0
    let maxx = 0
    let miny = 0
    let maxy = 0
    
    const _key = (x, y) => `${x}/${y}`

    self.posx = null
    self.posy = null
    self.tile = null
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
                    self.tile = parseInt(match[1])
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

    // returns TOP, BOTTOM, LEFT, RIGHT
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

    self.swap = (x0, y0, x1, y1) => {
        let v0 = self.get(x0, y0)
        let v1 = self.get(x1, y1)

        self.set(x0, y0, v1)
        self.set(x1, y1, v0)
    }

    self.transpose = () => {
        const R = maxx + 1
        for (let i = 0; i < R; i++) {
            for (let j = i; j < R; j++) {
                self.swap(i, j, j, i)
            }
        }
    }

    self.reverse = () => {
        const R = maxx + 1
        for (let i = 0; i < R; i++) {
            for (let j = 0, k = R - 1; j < k; j++, k--) {
                self.swap(j, i, k, i)
            }
        }
    }

    self.rotate = () => {
        assert.ok(minx === 0)
        assert.ok(miny === 0)
        assert.ok(maxx === maxy)

        self.transpose()
        self.reverse()
    }


    self.pretty = () => {
        console.log("----", self.tile)
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
    const gridd = {}
    grids.forEach(grid => gridd[grid.tile] = grid)

    const neighbours = {}
    const borders = {}
    for (let grid of grids) {
        for (let border of grid.borders()) {
            borders[border] = borders[border] || new Set()
            borders[border].add(grid.tile)

            border = _flip(border)
            borders[border] = borders[border] || new Set()
            borders[border].add(grid.tile)
        }

        neighbours[grid.tile] = []
    }

    // console.log(borders)

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

    // order the tiles
    const dones = new Set()

    const _iterate = tile => {
        if (dones.has(tile)) {
            return
        } else {
            dones.add(tile)
        }

        const grid = gridd[tile]
        if (!dones.size) {
            grid.posx = 0
            grid.posy = 0
        }

        const borders = grid.borders() // TOP BOTTOM LEFT RIGHT
        const ntiles = neighbours[tile]
        for (let ntile of ntiles) {
            console.log("-", tile, ntile)

            let placed = false
            let ngrid = gridd[ntile]
            for (let outer = 0; outer < 2 && !placed; outer++) {
                for (let inner = 0; inner < 4 && !placed; inner++) {
                    // ngrid.pretty()
                    const nborders = ngrid.borders()
                    if (borders[TOP] === nborders[BOTTOM]) {
                        placed = true
                        ngrid.posx = ngrid.posx
                        ngrid.posy = ngrid.posy - 1
                        gridd[ntile] = ngrid
                        // console.log("PLACED")
                    } else if (borders[BOTTOM] === nborders[TOP]) {
                        placed = true
                        ngrid.posx = ngrid.posx
                        ngrid.posy = ngrid.posy + 1
                        gridd[ntile] = ngrid
                        // console.log("PLACED")
                    } else if (borders[LEFT] === nborders[RIGHT]) {
                        placed = true
                        ngrid.posx = ngrid.posx - 1
                        ngrid.posy = ngrid.posy
                        gridd[ntile] = ngrid
                        // console.log("PLACED")
                    } else if (borders[RIGHT] === nborders[LEFT]) {
                        placed = true
                        ngrid.posx = ngrid.posx + 1
                        ngrid.posy = ngrid.posy
                        gridd[ntile] = ngrid
                        // console.log("PLACED")
                    } else {
                        // console.log("NOT PLACED")
                        // console.log(borders, nborders)
                    }

                    ngrid.rotate()
                }

                ngrid.transpose()
            }

            assert.ok(placed)
            _iterate(ntile)
        }

    }

    _iterate(corners[0])

    console.log(_.values(gridd).map(grid => ({
        tile: grid.tile,
        posx: grid.posx,
        posy: grid.posy,
        
    })))
        

    // console.log(dones)
}

run(fs.readFileSync("day_20.sample", "utf-8"), 6)

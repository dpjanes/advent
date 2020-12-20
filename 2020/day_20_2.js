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

    self.N = () => maxx - minx + 1
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

    self.prettys = () => {
        const cs = []

        for (let y = miny; y <= maxy; y++) {
            for (let x = minx; x <= maxx; x++) {
                cs.push(self.get(x, y) ? "#" : ".")
            }
            cs.push("\n")
        }

        return cs.join("")
    }

    if (raw) {
        self.initialize(raw)
    }

    return self
}

const _flip = s => {
    const parts = s.split("")
    parts.reverse()
    return parts.join("")
}

const run = (raw, iterations) => {
    let grids = raw.split("\n\n").map(block => Grid(block))
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
    const seens = {}

    const _iterate = tile => {
        // console.log("+", tile)
        if (dones.has(tile)) {
            return
        } else {
            dones.add(tile)
        }

        const grid = gridd[tile]

        const key = `${grid.posx}/${grid.posy}`
        if (seens[key]) {
            console.log("WHAT", key, seens[key], tile)
        }
        seens[`${grid.posx}/${grid.posy}`] = tile

        const borders = grid.borders() // TOP BOTTOM LEFT RIGHT
        const ntiles = neighbours[tile]
        for (let ntile of ntiles) {
            // console.log("-", tile, ntile)

            let placed = false
            let ngrid = gridd[ntile]
            for (let outer = 0; outer < 2 && !placed; outer++) {
                for (let inner = 0; inner < 4 && !placed; inner++) {
                    // ngrid.pretty()
                    const nborders = ngrid.borders()
                    if (borders[TOP] === nborders[BOTTOM]) {
                        placed = true
                        ngrid.posx = grid.posx
                        ngrid.posy = grid.posy - 1
                        // console.log("PLACED")
                    } else if (borders[BOTTOM] === nborders[TOP]) {
                        placed = true
                        ngrid.posx = grid.posx
                        ngrid.posy = grid.posy + 1
                        // console.log("PLACED")
                    } else if (borders[LEFT] === nborders[RIGHT]) {
                        placed = true
                        ngrid.posx = grid.posx - 1
                        ngrid.posy = grid.posy
                        // console.log("PLACED")
                    } else if (borders[RIGHT] === nborders[LEFT]) {
                        placed = true
                        ngrid.posx = grid.posx + 1
                        ngrid.posy = grid.posy
                        // console.log("PLACED")
                    } else {
                        // console.log("NOT PLACED")
                        // console.log(borders, nborders)
                    }

                    /*
                    if (placed) {
                        const key = `${ngrid.posx}/${ngrid.posy}`
                        if (seens[key]) {
                            console.log("REPEAT???", key)
                            // placed = false
                        }
                    }
                    */
                    if (placed) {
                        gridd[ntile] = ngrid
                        break
                    }

                    ngrid.rotate()
                }

                if (placed) {
                    break
                }

                ngrid.transpose()
            }

            assert.ok(placed)
            _iterate(ntile)
        }

    }

    _iterate(corners[0])

    grids = _.values(gridd)

    if (0) console.log(_.values(gridd).map(grid => ({
        tile: grid.tile,
        posx: grid.posx,
        posy: grid.posy,
        
    })))

    // sanity check
    {
        const seens = new Set()
        grids.forEach(grid => {
            const key = `${grid.posx}/${grid.posy}`
            // console.log(key)
            assert.ok(!seens.has(key))
            seens.add(key)
        })
    }

    // make the master grid
    let minposx = Math.min(...grids.map(grid => grid.posx))
    let minposy = Math.min(...grids.map(grid => grid.posy))
    grids.forEach(grid => {
        grid.posx -= minposx
        grid.posy -= minposy
    })

    let maxposx = Math.max(...grids.map(grid => grid.posx))
    let maxposy = Math.max(...grids.map(grid => grid.posy))

    const master = Grid()
    const N = grids[0].N()
    const N2 = N - 2

    grids.forEach(grid => {
        for (let x = 0; x < N - 2; x++) {
            for (let y = 0; y < N - 2; y++) {
                master.set(
                    grid.posx * N2 + x,
                    grid.posy * N2 + y,
                    grid.get(x + 1, y + 1))
            }
        }
    })

    const monster = [
        new RegExp("^..................#"),
        new RegExp("^#....##....##....###"),
        new RegExp("^.#..#..#..#..#..#"),
    ]

    console.log("=======")

    let matches = 0
    for (let outer = 0; outer < 2 && !matches; outer++) {
        for (let inner = 0; inner < 4 && !matches; inner++) {
            console.log("*", outer, inner)

            const lines = master.prettys().split("\n")
            for (let li = 0; li < lines.length - 2; li++) {
                for (let xi = 0; xi < lines[li].length; xi++) {
                    let is_match = true

                    for (let mi = 0; mi < monster.length; mi++) {
                        const text = lines[li + mi].substring(xi)
                        const match = text.match(monster[mi])
                        if (!match) {
                            is_match = false
                            break
                        }
                    }

                    if (is_match) {
                        console.log("MATCH", li, xi)
                        matches++
                    }
                }
            }
            master.rotate()
        }
        master.transpose()
    }


    const hashes = master.prettys().replace(/[^#]/g, "").length
    console.log(hashes - 15 * matches)

}

run(fs.readFileSync("day_20.txt", "utf-8"), 6)

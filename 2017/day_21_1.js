// http://adventofcode.com/2017/day/20
"use strict";

const assert = require("assert");

const Grid = (size) => {
    const self = Object.assign({})

    self.data = {}

    self.size = () => size;
    self.set = (x, y, c) => self.data[`${x}/${y}`] = c;
    self.get = (x, y) => self.data[`${x}/${y}`] || ".";

    self.fill = (x, y, pattern) => {
        pattern
            .split("/")
            .forEach((line, y_offset) => {
                line
                    .split("")
                    .forEach((c, x_offset) => {
                        self.set(x + x_offset, y + y_offset, c)
                    })
            })
    }

    self.count = () => Object.values(self.data).filter(c => c === "#").length;

    self.subgrid = (x_offset, y_offset, subsize) => {
        const grid = Grid(subsize)

        for (let y = 0; y < subsize; y++) {
            for (let x = 0; x < subsize; x++) {
                grid.set(x, y, self.get(x_offset + x, y_offset + y))
            }
        }

        return grid;
    }

    self.compact = () => {
        const cs = [];

        for (let y = 0; y < size; y++) {
            if (y) {
                cs.push("/")
            }

            for (let x = 0; x < size; x++) {
                cs.push(self.get(x, y))
            }
        }

        return cs.join("")
    }

    self.pretty = () => {
        const cs = [];

        for (let y = 0; y < size; y++) {
            if (y) {
                cs.push("\n")
            }
            cs.push("   ")

            for (let x = 0; x < size; x++) {
                cs.push(self.get(x, y))
            }
        }

        return cs.join("")
    }

    self.flip = () => {
        const grid = Grid(size)

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                grid.set(x, y, self.get(size - x - 1, y))
            }
        }

        return grid;
    }

    self.rotate = () => {
        const grid = Grid(size)

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                grid.set(size - x - 1, y, self.get(y, x))
            }
        }

        return grid;
    }

    self.patterns = subsize => {
        const ps = [];

        let start = self.subgrid(0, 0, subsize)

        for (var i = 0; i < 4; i++) {
            ps.push(start.compact())
            ps.push(start.flip().compact())

            start = start.rotate()
        }

        return ps;
    }

    return self;
}

const run = (raw, iterations) => {
    const rules = raw
        .split("\n")
        .filter(line => line.length)
        .map(line => line.split(" => "))
        .map(parts => ({
            from: parts[0],
            to: parts[1],
        }))

    let ogrid = Grid(3)
    ogrid.fill(0, 0, ".#./..#/###")

    for (let i = 0; i < iterations; i++) {
        console.log("*", i)
        const osize = ogrid.size();

        let oincrement;
        let nincrement;
        let ngrid;
        let nsize;

        if ((osize % 2) === 0) {
            oincrement = 2
            nincrement = 3
            nsize = osize / oincrement * nincrement
            ngrid = Grid(nsize)
        } else if ((osize % 3) === 0) {
            oincrement = 3
            nincrement = 4
            nsize = osize / oincrement * nincrement
            ngrid = Grid(nsize)
        } else {
            assert(0)
        }

        for (let nx = 0, ox = 0; nx < nsize; nx += nincrement, ox += oincrement) {
            for (let ny = 0, oy = 0; ny < nsize; ny += nincrement, oy += oincrement) {
                const osubgrid = ogrid.subgrid(ox, oy, oincrement)
                const patterns = osubgrid.patterns(oincrement)

                const rule = rules.find(rule => patterns.indexOf(rule.from) > -1)
                if (rule) {
                    ngrid.fill(nx, ny, rule.to)
                }
            }
        }

        ogrid = ngrid;
    }

    return ogrid.count()

    // console.log(ogrid.count())
    // return grid.patterns(0, 0, 3)
}

console.log(run(`
../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`, 2))
console.log(run(`
../.. => .../.##/##.
#./.. => .##/.##/#..
##/.. => ..#/.../###
.#/#. => #.#/..#/##.
##/#. => .#./.#./..#
##/## => #.#/#../###
.../.../... => ..../#.../.##./..#.
#../.../... => ####/#.##/##.#/..#.
.#./.../... => ..##/..##/..##/..##
##./.../... => ..../..#./##../##.#
#.#/.../... => ##.#/..../####/...#
###/.../... => .#.#/.###/.#../.#.#
.#./#../... => .###/#.#./...#/##..
##./#../... => #.##/#.../####/###.
..#/#../... => ####/...#/...#/#.##
#.#/#../... => .#../##../..##/..#.
.##/#../... => .#../..##/..../.##.
###/#../... => #.../..#./.#.#/#..#
.../.#./... => #.#./.#.#/.###/...#
#../.#./... => ###./.#../...#/.#..
.#./.#./... => ##.#/.#../#..#/##..
##./.#./... => #..#/...#/.#.#/###.
#.#/.#./... => .##./#.../#..#/.###
###/.#./... => .#.#/##.#/..../##.#
.#./##./... => ##.#/#.##/.#.#/#.##
##./##./... => #.##/..#./..#./.##.
..#/##./... => ..../#.../..#./..##
#.#/##./... => .##./####/####/####
.##/##./... => #.##/####/#.##/#..#
###/##./... => .#../.###/##../...#
.../#.#/... => ...#/...#/#.##/####
#../#.#/... => ..#./..#./###./.##.
.#./#.#/... => .##./##../.###/.#.#
##./#.#/... => #.#./.#../.##./...#
#.#/#.#/... => ##.#/..##/#.../##.#
###/#.#/... => ..##/##../.#.#/..##
.../###/... => .#../#.../.##./....
#../###/... => ..##/..##/...#/.##.
.#./###/... => #..#/..#./#.#./..##
##./###/... => #.##/.#../##.#/##.#
#.#/###/... => ####/###./.##./...#
###/###/... => #..#/#.##/..../.##.
..#/.../#.. => #.#./.#../##../..#.
#.#/.../#.. => ##.#/####/##../.#.#
.##/.../#.. => ####/##../#..#/..#.
###/.../#.. => ##../..#./####/##.#
.##/#../#.. => ##../#.#./###./..##
###/#../#.. => ..../.#../#..#/...#
..#/.#./#.. => ..#./...#/.###/.#.#
#.#/.#./#.. => ###./..../#.#./###.
.##/.#./#.. => ####/#.##/.#.#/.#..
###/.#./#.. => ###./#.##/##../####
.##/##./#.. => ##.#/..##/..#./.#..
###/##./#.. => ##.#/.##./.###/.##.
#../..#/#.. => #.../###./##.#/#..#
.#./..#/#.. => ..##/.###/...#/..#.
##./..#/#.. => ##../#.#./...#/.#..
#.#/..#/#.. => ..#./###./##../.###
.##/..#/#.. => #.../.##./..../#.#.
###/..#/#.. => .#.#/#.##/#.##/..#.
#../#.#/#.. => ..##/..##/#.../####
.#./#.#/#.. => #.../...#/..../..##
##./#.#/#.. => ###./..##/.#../.##.
..#/#.#/#.. => ...#/..##/..#./.#..
#.#/#.#/#.. => #.#./.#../..../##..
.##/#.#/#.. => ..#./.###/##.#/....
###/#.#/#.. => #.##/..##/...#/##..
#../.##/#.. => #.#./##../###./.#.#
.#./.##/#.. => .###/#..#/.##./....
##./.##/#.. => .#.#/.#../.###/.##.
#.#/.##/#.. => .#../..##/###./#.##
.##/.##/#.. => ##../.##./..#./.#..
###/.##/#.. => .#.#/..#./#..#/.###
#../###/#.. => #.##/#..#/.#.#/#.#.
.#./###/#.. => #.../#..#/#.../.#.#
##./###/#.. => ##../####/##../.###
..#/###/#.. => #.../..../####/##.#
#.#/###/#.. => ...#/..../...#/..##
.##/###/#.. => .#../####/#.##/.#..
###/###/#.. => ###./.#.#/#.../##..
.#./#.#/.#. => ...#/##../####/...#
##./#.#/.#. => ####/#..#/###./#.##
#.#/#.#/.#. => .###/#..#/..#./...#
###/#.#/.#. => ###./.###/##.#/###.
.#./###/.#. => #..#/#.../..#./####
##./###/.#. => #.../..../#..#/..##
#.#/###/.#. => #..#/.#.#/#.../##..
###/###/.#. => .#.#/..../.#.#/#.##
#.#/..#/##. => .#../..##/...#/###.
###/..#/##. => .###/..#./##.#/##.#
.##/#.#/##. => ####/#.##/.##./##..
###/#.#/##. => #..#/#..#/####/#.##
#.#/.##/##. => .###/#.#./#..#/.#.#
###/.##/##. => #.#./#.#./#.##/..##
.##/###/##. => ####/###./##.#/##.#
###/###/##. => ##../..##/#.#./#...
#.#/.../#.# => .#../###./.###/##.#
###/.../#.# => ..../.#.#/#..#/##..
###/#../#.# => ..#./#.../.##./...#
#.#/.#./#.# => ...#/#.../##.#/.##.
###/.#./#.# => ..../..../#.#./##.#
###/##./#.# => .#../...#/...#/###.
#.#/#.#/#.# => ...#/#.../##../.###
###/#.#/#.# => #.../...#/.#../#.##
#.#/###/#.# => ..../.##./..../##..
###/###/#.# => .##./.#.#/#.##/.##.
###/#.#/### => #.#./####/.##./.##.
###/###/### => .#.#/..##/#.##/.##.
`, 5))

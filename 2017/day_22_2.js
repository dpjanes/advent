// http://adventofcode.com/2017/day/22
"use strict";

const assert = require("assert");

const CLEAN = "."
const WEAKENED = "W"
const FLAGGED = "F"
const INFECTED = "#"

const Grid = () => {
    const self = Object.assign({})

    let cx = 0;
    let cy = 0;
    let dx = 0;
    let dy = -1;
    let maxx = 0;
    let maxy = 0;
    let minx = 0;
    let miny = 0;
    let infected = 0;
    
    self.data = {}
    self.set = (x, y, c) => {
        if (c === '.') {
            delete self.data[`${x}/${y}`];
        } else {
            self.data[`${x}/${y}`] = c;
        }
    }
    self.get = (x, y) => self.data[`${x}/${y}`] || ".";

    self.initialize = raw => {
        raw.split("\n")
            .filter(line => line.length)
            .forEach((line, y, lines) => {
                y -= (lines.length - 1) / 2
                maxy = Math.max(y, maxy)
                miny = Math.min(y, miny)

                line.split("")
                    .forEach((c, x, cs) => {
                        x -= (cs.length - 1) / 2
                        maxx = Math.max(x, maxx)
                        minx = Math.min(x, minx)

                        self.set(x, y, c)
                    })
            })
    }

    self.infected = () => infected;

    self.reverse = () => {
        dx = -dx;
        dy = -dy;
    }

    self.right = () => {
        if (dx === 1) {
            dx = 0;
            dy = 1;
        } else if (dx === -1) {
            dx = 0;
            dy = -1;
        } else if (dy === 1) {
            dy = 0;
            dx = -1;
        } else if (dy === -1) {
            dy = 0;
            dx = 1;
        } else {
            assert.ok(false);
        }
    }

    self.left = () => {
        if (dx === 1) {
            dx = 0;
            dy = -1;
        } else if (dx === -1) {
            dx = 0;
            dy = 1;
        } else if (dy === 1) {
            dy = 0;
            dx = 1;
        } else if (dy === -1) {
            dy = 0;
            dx = -1;
        } else {
            assert.ok(false);
        }
    }

    self.move = () => {
        assert.ok(dx + dy);

        if (self.get(cx, cy) === INFECTED) {
            self.right()
            self.set(cx, cy, FLAGGED)
        } else if (self.get(cx, cy) === FLAGGED) {
            self.reverse()
            self.set(cx, cy, CLEAN)
        } else if (self.get(cx, cy) === WEAKENED) {
            self.set(cx, cy, INFECTED)
            infected ++;
        } else if (self.get(cx, cy) === CLEAN) {
            self.left()
            self.set(cx, cy, WEAKENED)
        } else {
            assert.ok(0)
        }

        cx += dx;
        cy += dy;

        maxx = Math.max(cx, maxx)
        maxy = Math.max(cy, maxy)
        minx = Math.min(cx, minx)
        miny = Math.min(cy, miny)
    }

    self.pretty = () => {
        const cs = [];

        for (let y = miny; y <= maxy; y++) {
            if (y !== miny) {
                cs.push("\n")
            }
            cs.push("   ")

            for (let x = minx; x <= maxx; x++) {
                if ((x === cx) && (y === cy)) {
                    cs.push("[" + self.get(x, y) + "]")
                } else {
                    cs.push(" " + self.get(x, y) + " ")
                }
            }
        }

        return cs.join("")
    }

    // initial state
    self.set(-1, 0, '#')
    self.set(1, -1, '#')

    return self;
}

const run = (raw, iterations) => {
    let grid = Grid()
    grid.initialize(raw)
    // console.log(grid.pretty())

    for (let i = 0; i < iterations; i++) {
        if ((i % 10000) === 0) {
            console.log("*", i)
        }
        /*
        console.log("*", i)
        console.log(grid.pretty());
        */

        grid.move()
    }

    return grid.infected();

}

/*
console.log(run(`
..#
#..
...
`, 100))
console.log(run(`
..#
#..
...
`, 10000000))
*/
console.log(run(`
#..#...#.#.#..#.#...##.##
.....##.#....#.#......#.#
..#.###.#.#######.###.#.#
.......#.##.###.###..##.#
#....#...#.###....##.....
#.....##.#########..#.#.#
.####.##..#...###.##...#.
#....#..#.###.##.#..##.#.
#####.#.#..#.##..#...####
##.#.#..#.#....###.######
.##.#...#...##.#.##..####
...#..##.#.....#.#..####.
#.##.###..#######.#..#.#.
##....##....##.#..#.##..#
##.#.#.#.##...##.....#...
.#####..#.#....#.#######.
####....###.###.#.#..#..#
.###...#.###..#..#.#####.
#.###..#.#######.#.#####.
.##.#.###.##.##.#.#...#..
######.###.#.#.##.####..#
##..####.##..##.#...##...
...##.##...#..#..##.####.
#.....##.##.#..##.##....#
#.#..####.....#....#.###.
`, 10000000))

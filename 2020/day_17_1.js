// http://adventofadapter.com/2020/day/17
"use strict"

const fs = require("fs")
const _ = require("lodash")
const assert = require("assert")

const INACTIVE = "."
const ACTIVE = "#"

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

    /*
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
    */

    self.pretty = () => {
        const cs = [];

        for (let y = miny; y <= maxy; y++) {
            if (y !== miny) {
                cs.push("\n")
            }
            cs.push("")

            for (let x = minx; x <= maxx; x++) {
                if (false && (x === cx) && (y === cy)) {
                    cs.push("[" + self.get(x, y) + "]")
                } else {
                    cs.push("" + self.get(x, y) + "")
                }
            }
        }

        return cs.join("")
    }

    return self;
}

const run = (raw, iterations) => {
    let grid = Grid()
    grid.initialize(raw)
    console.log(grid.pretty())

    for (let i = 0; i < iterations; i++) {
        if ((i % 10000) === 0) {
            console.log("*", i)
        }

        // grid.move()
    }

    // return grid.infected();

}

run(fs.readFileSync("day_17.sample", "utf-8"), 1)

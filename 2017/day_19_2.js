// http://adventofcode.com/2017/day/12
"use strict";

const assert = require("assert");
const fs = require("fs");

const parse = diagram => {
    const self = Object.assign({})

    const data = {}
    let start;

    self.set = (x, y, token) => data[`${x}/${y}`] = token;
    self.get = (x, y) => data[`${x}/${y}`];

    diagram
        .split('\n')
        .forEach((line, y) => {
            line
                .split("")
                .forEach((token, x) => {
                    if (token !== " ") {
                        self.set(x, y, token)

                        if (y === 0) {
                            start = x
                        }
                    }
                })
            
        })

    self.run = () => {
        const letters = []

        let x = start;
        let y = 0;
        let x_direction = 0;
        let y_direction = +1;
        let steps = 0;

        while (true) {
            const token = self.get(x, y);
            // console.log("+", x, y, token)
            if (!token) {
                break
            }
                
            if (token.match(/[A-Za-z]/)) {
                letters.push(token)
            } else if (token === "+") {
                if (y_direction) {
                    y_direction = 0;

                    if (self.get(x - 1, y)) {
                        x_direction = -1
                    } else if (self.get(x + 1, y)) {
                        x_direction = +1
                    } else {
                        assert(false)
                    }
                } else {
                    x_direction = 0;

                    if (self.get(x, y - 1)) {
                        y_direction = -1;
                    } else if (self.get(x, y + 1)) {
                        y_direction = +1;
                    } else {
                        assert(false)
                    }
                }
            }

            x += x_direction
            y += y_direction
            steps ++;
        }

        return steps;
    }

    return self;
}

console.log(parse(`\
     |
     |  +--+
     A  |  C
 F---|----E|--+
     |  |  |  D
     +B-+  +--+
`).run())

console.log(parse(fs.readFileSync("day_19.input", "utf8")).run())


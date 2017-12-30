// http://adventofcode.com/2017/day/20
"use strict";

const assert = require("assert");
const fs = require("fs");

const parse = rules => {
    return rules.split("\n")
        .filter(line => line.length)
        .map(line => line.match(/p=<\s*([-\d]+),\s*([-\d]+),\s*([-\d]+)>, v=<\s*([-\d]+),\s*([-\d]+),\s*([-\d]+)>, a=<\s*([-\d]+),\s*([-\d]+),\s*([-\d]+)>/))
        .filter(match => match)
        .map((match, index) => ({
            index: index,
            p: [
                parseInt(match[1]),
                parseInt(match[2]),
                parseInt(match[3]),
            ],
            v: [
                parseInt(match[4]),
                parseInt(match[5]),
                parseInt(match[6]),
            ],
            a: [
                parseInt(match[7]),
                parseInt(match[8]),
                parseInt(match[9]),
            ]
        }))
}

const run = raw => {
    const rules = parse(raw)

    let best = null;

    rules.forEach(rule => {
        if (best === null) {
            best = rule;
            return;
        }

        const ar = Math.max.apply(null, rule.a.map(a => Math.abs(a)))
        const ab = Math.max.apply(null, best.a.map(a => Math.abs(a)))
        if (ar < ab) {
            best = rule;
            return;
        } else if (ar > ab) {
            return;
        }

        const vr = Math.max.apply(null, rule.v.map(a => Math.abs(a)))
        const vb = Math.max.apply(null, best.v.map(a => Math.abs(a)))
        if (vr < vb) {
            best = rule;
            return;
        } else if (vr > vb) {
            return;
        }

        const pr = Math.max.apply(null, rule.p.map(a => Math.abs(a)))
        const pb = Math.max.apply(null, best.p.map(a => Math.abs(a)))
        if (pr < pb) {
            best = rule;
            return;
        } else if (pr > pb) {
            return;
        }
    })

    return best.index;

}

console.log(run(`
p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>
`))

console.log(run(fs.readFileSync("day_20.input", "utf-8")))

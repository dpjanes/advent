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
    let rules = parse(raw)

    const move = rules => {
        rules.forEach(rule => {
            rule.v = rule.v.map((a, x) => a + rule.a[x])
            rule.p = rule.p.map((v, x) => v + rule.v[x])
        })
    }

    const trim = rules => {
        const n = {}

        return rules
            .map(rule => {
                rule.key = rule.p.join("/")
                n[rule.key] = (n[rule.key] || 0) + 1
                return rule;
            })
            .filter(rule => n[rule.key] === 1)
    }

    let same = 0;

    while (same < 100) {
        const olength = rules.length;
        rules = trim(rules)
        move(rules)

        if (olength === rules.length) {
            same ++;
        } else {
            same = 0;
        }
    }

    return rules.length;
}

console.log(run(fs.readFileSync("day_20.input", "utf-8")))

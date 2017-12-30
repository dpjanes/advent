// http://adventofcode.com/2017/day/12
"use strict";

const fs = require("fs")

const spin = length => _state => {
    const state = _state.concat([])

    for (let i = 0; i < state.length; i++) {
        state[i] = _state[(i - length + state.length) % state.length];
    }

    return state;
}

const exchange = (from, to) => _state => {
    const state = _state.concat([])

    state[from] = _state[to];
    state[to] = _state[from];

    return state;
}

const partner = (a, b) => _state => {
    const state = _state.concat([])
    const from = _state.indexOf(a)
    const to = _state.indexOf(b)

    state[from] = _state[to];
    state[to] = _state[from];

    return state;
}

const parse = rules => rules
    .split(",")
    .map(rule => rule.match(/^([sxp])([^\/]+)(\/(.+))?/))
    .filter(match => match)
    .map(match => {
        switch (match[1]) {
        case "s": return spin(parseInt(match[2]))
        case "x": return exchange(parseInt(match[2]), parseInt(match[4]))
        case "p": return partner(match[2], match[4])
        }
    })

const run = (rules, period) => {
    const program = parse(rules)
    let state = Array(period).fill().map((v, i) => String.fromCharCode("a".charCodeAt() + i))

    // console.log(state.join(""))
    while (program.length) {
        const instruction = program.shift()

        state = instruction(state)
        // console.log(state.join(""))
    }

    return state.join("")
}

console.log(run(`s1,x3/4,pe/b`, 5))
console.log(run(fs.readFileSync("day_16.input", "utf8"), 16))

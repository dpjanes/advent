// http://adventofcode.com/2017/day/12
"use strict";

/*
 *  How cycles work

    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 
    0 1 2 3 4 0 1 2 3 4 0  1  2  3  4  0  1

    Let's say cycle is detected at N=5 and we want to know
    what the state will be at 16.

    It will be the same as (16 % 5) = 1 
 */


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
    const billion = 1000 * 1000 * 1000;

    const first_code = state.join("")
    let end = billion;
    for (let loop = 0; loop < end; loop++) {
        for (let pi = 0; pi < program.length; pi++) {
            state = program[pi](state)
        }

        const state_code = state.join("")
        if (state_code === first_code) {
            end = (end % (loop + 1)) + 1;
            loop = 0;
        }
    }

    return state.join("")
}

// console.log(run(`s1,x3/4,pe/b`, 5))
console.log(run(fs.readFileSync("day_16.input", "utf8"), 16))

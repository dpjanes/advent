// http://adventofcode.com/2017/day/23
"use strict";

const assert = require("assert")

const parse = raw => raw
    .split("\n")
    .map(line => line.split("/"))
    .filter(parts => parts.length === 2)
    .map(parts => ({
        a: parseInt(parts[0]),
        b: parseInt(parts[1])
    }))

const run = raw => {
    const source = parse(raw)
    const states = []
    states.push({
        parts: source,
        connect: 0,
        bridge: [],
        strength: 0,
    })
    let max = 0;

    while (states.length) {
        const state = states.shift()
        const parts = state.parts
            .map((part, index) => {
                part = Object.assign({ index: index }, part)
                part.used = false
                if (part.a === state.connect) {
                    part.used = true;
                    part.from = part.a;
                    part.to = part.b;
                    return part;
                } else if (part.b === state.connect) {
                    part.used = true;
                    part.from = part.b;
                    part.to = part.a;
                    return part;
                } else {
                    part.used = false;
                    return part;
                }
            });

        const nexts = parts.filter(part => part.used)

        if (nexts.length === 0) {
            // console.log(state.bridge.map(part => `${part.from}/${part.to}`))
            max = Math.max(max, state.strength)
        }

        nexts.forEach(next => {
            const nstate = Object.assign({}, state)
            nstate.connect = next.to;
            nstate.bridge = nstate.bridge.concat([ next ])
            nstate.strength += next.a + next.b;
            nstate.parts = parts.filter(part => part !== next)

            states.push(nstate)
        })
    }


    return max;
}

console.log(run(`
0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10
`))
console.log(run(`
32/31
2/2
0/43
45/15
33/24
20/20
14/42
2/35
50/27
2/17
5/45
3/14
26/1
33/38
29/6
50/32
9/48
36/34
33/50
37/35
12/12
26/13
19/4
5/5
14/46
17/29
45/43
5/0
18/18
41/22
50/3
4/4
17/1
40/7
19/0
33/7
22/48
9/14
50/43
26/29
19/33
46/31
3/16
29/46
16/0
34/17
31/7
5/27
7/4
49/49
14/21
50/9
14/44
29/29
13/38
31/11
`))

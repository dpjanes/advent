// http://adventofcode.com/2017/day/13
"use strict";

const parse = raw => raw
    .split("\n")
    .map(line => line.match(/^(\d+): (\d+)/))
    .filter(match => match)
    .reduce((cfg, match) => {
        cfg.push({
            layer: parseInt(match[1]), 
            depth: parseInt(match[2]),
            position: 0,
            direction: 1,
        });
        return cfg;
    }, []);

const advance = cfg => {
    cfg.forEach(item => {
        item.position += item.direction;
        if (item.position === 0) {
            item.direction = 1;
        } else if (item.position == (item.depth - 1)) {
            item.direction = -1;
        }
    })

    return cfg;
}

const clone = cfg => cfg.map(item => Object.assign({}, item))

const run = raw => {
    const protocfg = parse(raw)
    const max = Math.max.apply(null, protocfg.map(item => item.layer))
    let start = clone(protocfg)

    for (let delay = 0; /* delay < 20 */; delay++) {
        let caught = false;
        let cfg = clone(start)

        if ((delay % 100000) === 0) {
            console.log(delay) // , cfg.map(item => item.position))
        }

        for (let layer = 0; layer <= max; layer++) {
            const current = cfg.find(item => item.layer === layer)
            if (current && (current.position === 0)) {
                caught = true;
                // console.log("*", "caught", layer)
                break;
            }

            advance(cfg);
        }

        if (!caught) {
            return delay;
        }

        start = advance(clone(start))
    }
}

console.log(run(`
0: 3
1: 2
4: 4
6: 4
`))
console.log(run(`
0: 4
1: 2
2: 3
4: 5
6: 8
8: 6
10: 4
12: 6
14: 6
16: 8
18: 8
20: 6
22: 8
24: 8
26: 8
28: 12
30: 12
32: 9
34: 14
36: 12
38: 12
40: 12
42: 12
44: 10
46: 12
48: 12
50: 10
52: 14
56: 12
58: 14
62: 14
64: 14
66: 12
68: 14
70: 14
72: 17
74: 14
76: 14
80: 20
82: 14
90: 24
92: 14
98: 14
`))

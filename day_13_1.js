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

const run = raw => {
    const cfg = parse(raw)
    const max = Math.max.apply(null, cfg.map(item => item.layer))
    let count = 0;
    let severity = 0;

    const advance = () => {
        cfg.forEach(item => {
            item.position += item.direction;
            if (item.position === 0) {
                item.direction = 1;
            } else if (item.position == (item.depth - 1)) {
                item.direction = -1;
            }
        })
    }

    for (let round = 0; round <= max; round++) {
        const current = cfg.find(item => item.layer === round)
        if (current && (current.position === 0)) {
            count ++;
            severity += round * current.depth;
        }

        // console.log("ITEM", cfg.map(item => [item.layer, item.position]))
        // console.log()

        advance();
        
    }

    return severity;
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

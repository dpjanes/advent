// http://adventofadapter.com/2020/day/10
"use strict"

const fs = require("fs")
const _ = require("lodash")

const parse = text => text
    .split("\n")
    .filter(line => line.length)
    .map(line => parseInt(line))

const run = _adapters => {
    const device = Math.max(..._adapters) + 3
    const adapters = new Set(_adapters)
    adapters.add(device)

    const deltas = [ 0, 0, 0, 0 ]
    const used = new Set()

    const _search = v => {
        used.add(v)

        for (let d = 1; d <= 3; d++) {
            const vd = v + d
            if (adapters.has(vd) && !used.has(vd)) {
                deltas[d] += 1
                _search(vd)
            }
        }
    }

    _search(0)

    console.log(deltas)
    console.log(deltas[1] * deltas[3])
}

const adapters = parse(fs.readFileSync("day_10.txt", "utf-8"))
run(adapters)

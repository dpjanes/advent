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
    const solutions = {}

    const _search = v => {
        let count = 0

        for (let d = 1; d <= 3; d++) {
            const vd = v + d
            if (solutions[vd] > -1) {
                count += solutions[vd]
            } else if (vd === device) {
                count += 1
            } else if (adapters.has(vd)) {
                const s = _search(vd)
                count += s
                solutions[vd] = s
            } else {
            }
        }

        return count
    }

    console.log(_search(0))
}

const adapters = parse(fs.readFileSync("day_10.txt", "utf-8"))
run(adapters)

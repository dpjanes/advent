// http://adventofadapter.com/2020/day/16
"use strict"

const fs = require("fs")
const assert = require("assert")
const _ = require("lodash")

const parse = text => {
    const self = new Object({})
    const lines = text.split("\n")

    self.constraints = {}
    lines
        .map(line => line.match(/^([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/))
        .filter(match => match)
        .forEach(match => {
            self.constraints[match[1]] = [
                parseInt(match[2]),
                parseInt(match[3]),
                parseInt(match[4]),
                parseInt(match[5]),
            ]
        })
    self.constraintvs = _.values(self.constraints)
    self.constraintks = _.keys(self.constraints)

    self.tickets = []
    lines
        .filter(line => line.match(/^([\d,])+$/))
        .forEach(line => {
            self.tickets.push(line.split(",").map(part => parseInt(part)))
        })

    self.validate_number = n => {
        for (let ci = 0; ci < self.constraintvs.length; ci++) {
            const constraint = self.constraintvs[ci]
            if ((n >= constraint[0]) && (n <= constraint[1])) {
                return true
            }
            if ((n >= constraint[2]) && (n <= constraint[3])) {
                return true
            }
        }

        return false
    }

    self.validate_ticket = ns => {
        const invalids = []

        for (let ni = 0; ni < ns.length; ni++) {
            if (!self.validate_number(ns[ni])) {
                invalids.push(ns[ni])
            }
        }

        return invalids
    }

    self.discard_invalids = () => {
        self.tickets = self.tickets
            .filter(ticket => self.validate_ticket(ticket).length === 0)
    }

    self.run = () => {
        self.discard_invalids()

        let pss = []
        for (let ci = 0; ci < self.constraintks.length; ci++) {
            const constraint = self.constraintvs[ci]
            const positions = []

            for (let pi = 0; pi < self.constraintks.length; pi++) {
                let valid = true
                
                for (let ti = 1; ti < self.tickets.length; ti++) {
                    const ticket = self.tickets[ti]
                    const n = ticket[pi]
                    if ((n >= constraint[0]) && (n <= constraint[1])) {
                    } else if ((n >= constraint[2]) && (n <= constraint[3])) {
                    } else {
                        valid = false
                        break
                    }
                }

                if (valid) {
                    positions.push(pi)
                }
            }

            positions.push(ci)
            pss.push(positions)
        }

        pss.sort((a, b) => a.length - b.length)
        const tuples = pss.map(ps => {
            return [ self.constraintks[ps.pop() ], ps ]
        })

        let result = 1
        const results = []
        tuples.forEach(tuple => {
            const tag = tuple[0]
            const values = tuple[1]
            console.log(tag, values)

            for (let vi = 0; vi < values.length; vi++) {
                const value = values[vi]

                if (results.indexOf(value) === -1) {
                    results.push(value)

                    if (tag.startsWith("departure")) {
                        result *= self.tickets[0][value]
                    }

                    break
                }
            }
        })

        console.log("RESULTS", results)
        console.log("result", result)
    }
    
    return self
}

const data = parse(fs.readFileSync("day_16.txt", "utf-8"))
// console.log(data.constraints)
data.run()

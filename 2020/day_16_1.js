// http://adventofadapter.com/2020/day/16
"use strict"

const fs = require("fs")
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
    self.constraintv = _.values(self.constraints)

    self.tickets = []
    lines
        .filter(line => line.match(/^([\d,])+$/))
        .forEach(line => {
            self.tickets.push(line.split(",").map(part => parseInt(part)))
        })

    self.validate_number = n => {
        for (let ci = 0; ci < self.constraintv.length; ci++) {
            const c = self.constraintv[ci]
            if ((n >= c[0]) && (n <= c[1])) {
                return true
            }
            if ((n >= c[2]) && (n <= c[3])) {
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

    self.run = () => {
        const invalids = []
        
        self.tickets.forEach((ticket, ticketx) => {
            self.validate_ticket(ticket).forEach(invalid => {
                invalids.push(invalid)
            })
        })

        let sum = 0
        for (let invalid of invalids) {
            sum += invalid
        }

        console.log(sum)
    }
    
    return self
}

const data = parse(fs.readFileSync("day_16.txt", "utf-8"))
console.log(data.constraints)
data.run()

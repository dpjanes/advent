// http://adventofcode.com/2020/day/19
const fs = require("fs")
const assert = require("assert")
const _ = require("lodash")

const data = fs.readFileSync("day_19.txt", "utf-8")
const parts = data.split("\n\n")
assert.strictEqual(parts.length, 2)

const rulesd = {}

parts[0].split("\n")
    .forEach(rule => {
        const match = rule.match(/^(\d+): (.*)/)
        assert.ok(match)

        rulesd[match[1]] = match[2]
            .split("|")
            .map(subpart => {
                subpart = subpart.replace(/"/g, " ")
                subpart = subpart
                    .split(" ")
                    .filter(x => x.length)

                return subpart
            })
    })

const _join = (l) => {
    if (l.length === 1) {
        return l[0]
    } else {
        return "(" + l.join("|") + ")"
    }
}

const crunch = index => {
    if (index === "a") {
        return "a"
    } else if (index === "b") {
        return "b"
    }
    const rules = rulesd[index]

    return _join(rules.map(rule => {
        return rule.map(index => crunch(index)).map(rule => "(" + rule + ")").join("")
    }))

    // return rule.map(subrule => crunch(subrule))
    
}

// console.log(rulesd)
const crunched = crunch("0")
// console.log(JSON.stringify(crunched, null, 2))
const pattern = new RegExp("^" + crunch("0") + "$")
// console.log(pattern)

let count = 0
const texts = parts[1].split("\n")
texts.forEach(text => {
    result = text.match(pattern) ? true : false
    if (result) {
        count += 1
    }

    console.log(text, result)
})
console.log("matches", count)

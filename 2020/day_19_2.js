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

delete rulesd["8"]
delete rulesd["11"]

// 0: 8 11
// 8: 42 | 42 8
// 11: 42 31 | 42 11 31

const crunched42 = crunch("42")
const crunched42_rex = new RegExp("^" + crunched42)

const crunched31 = crunch("31")
const crunched31_rex = new RegExp("^" + crunched31)

const crunch0 = new RegExp("^(" + crunched42 + "){2,}(" + crunched31 + ")+$")

const match = text => {
    let n42 = 0
    let n31 = 0

    while (true) {
        const match = text.match(crunched42_rex)
        if (match) {
            text = text.substring(match[0].length)
            n42 ++
        } else {
            break
        }
    }

    while (true) {
        const match = text.match(crunched31_rex)
        if (match) {
            text = text.substring(match[0].length)
            n31++
        } else {
            break
        }
    }

    console.log(n42, n31)

    if ((n42 > 1) && n31 && n42 > n31 && text.length === 0) {
        return true
    } else {
        return false
    }
}

let count = 0
const texts = parts[1].split("\n").filter(x => x.length)
texts.forEach(text => {
    console.log()
    result = match(text) ? true : false
    if (result) {
        count += 1
    }

    console.log(text, result, !!text.match(crunch0))
})
console.log("matches", count)

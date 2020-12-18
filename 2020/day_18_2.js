// http://adventofcode.com/2020/day/18
"use strict"

const fs = require("fs")
const _ = require("lodash")
const assert = require("assert")

const bracket_rex = new RegExp(/[(]([^()]*)[)]/)
const add_rex = new RegExp(/(\d+)\s*([+])\s*(\d+)/)
const mul_rex = new RegExp(/(\d+)\s*([*])\s*(\d+)/)
const evaluate = input => {
    let str = input
    
    // get rid of brackets
    while (true) {
        const nstr = str.replace(bracket_rex, (match, inner) => {
            assert.strictEqual(inner.indexOf("("), -1)
            return evaluate(inner)
        })

        if (nstr === str) {
            break
        }

        str = nstr
    }

    assert.strictEqual(str.indexOf("("), -1)

    // do add
    while (true) {
        const nstr = str.replace(add_rex, (match, a, op, b) => {
            if (op === "+") {
                return parseInt(a) + parseInt(b)
            } else {
                assert.ok(false)
            }
        })

        if (nstr === str) {
            break
        }
        str = nstr
    }

    // do mul
    while (true) {
        const nstr = str.replace(mul_rex, (match, a, op, b) => {
            if (op === "*") {
                return parseInt(a) * parseInt(b)
            } else {
                assert.ok(false)
            }
        })

        if (nstr === str) {
            break
        }
        str = nstr
    }

    return parseInt(str)
}

assert.strictEqual(evaluate("2 * 3 + (4 * 5)"), 46)
assert.strictEqual(evaluate("5 + (8 * 3 + 9 + 3 * 4 * 3)"), 1445)
assert.strictEqual(evaluate("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"), 669060)
assert.strictEqual(evaluate("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"), 23340)

const lines = fs.readFileSync("day_18.txt", "utf-8").split("\n").filter(line => line.length)

let sum = 0
lines.forEach(line => {
    sum += evaluate(line)
})

console.log(sum)

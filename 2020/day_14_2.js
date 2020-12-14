// http://adventofadapter.com/2020/day/14
"use strict"

const fs = require("fs")
const _ = require("lodash")
const assert = require("assert")

const MASK = "M"
const SET = "S"

const _binary = n => (n >>> 0).toString(2)

const parse = text => text
    .split("\n")
    .filter(line => line.length)
    .map(line => {
        let match

        match = line.match(/^mask = ([01X]{36})$/)
        if (match) {
            const m = match[1]
            const value = BigInt("0b" + m.replace(/X/g, "0"), 2)
            const mask = BigInt("0b" + m
                .replace(/[0-1]/g, "Y")
                .replace(/X/g, "0")
                .replace(/Y/g, "1")
            , 2)

            const xs = m
                .split("")
                .map((c, x) => c === "X" ? x : -1)
                .filter(v => v !== -1)
                .map(v => 35 - v)

            return {
                op: MASK,
                mask: mask,
                value: value,
                xs: xs,
            }
        }

        match = line.match(/^mem\[(\d+)] = (\d+)/)
        if (match) {
            return {
                op: SET,
                address: BigInt(match[1]),
                value: BigInt(match[2]),
            }
        }

        assert.ok(false)
        
    })


const run = ops => {
    let mask = null
    const md = {}

    ops.forEach(op => {
        if (op.op === MASK) {
            mask = op
        } else if (op.op === SET) {
            assert.ok(mask)

            const max = Math.pow(2, mask.xs.length)
            for (let i = 0; i < max; i++) {
                let address = op.address | mask.value

                for (let j = 0; j < mask.xs.length; j++) {
                    const bit = 0x1 << j
                    if (i & bit) {
                        address |= BigInt(1) << BigInt(mask.xs[j])
                    } else {
                        address &= ~(BigInt(1) << BigInt(mask.xs[j]))
                    }
                }

                md[address] = op.value
            }
        } else {
            assert.ok(false)
        }
    })

    let total = BigInt(0)
    _.mapValues(md, v => total += v)

    console.log(total)
}

const ops = parse(fs.readFileSync("day_14.txt", "utf-8"))
/*
const ops = parse(`
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1
`)
console.log(ops)
*/
run(ops)

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

            return {
                op: MASK,
                mask: mask,
                value: value,
            }
        }

        match = line.match(/^mem\[(\d+)] = (\d+)/)
        if (match) {
            return {
                op: SET,
                address: parseInt(match[1]),
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

            let value = op.value
            value |= mask.value
            value &= ~(~mask.value & mask.mask)

            md[op.address] = value
        } else {
            assert.ok(false)
        }
    })

    let total = BigInt(0)
    _.mapValues(md, v => total += v)

    console.log(total)
}

const ops = parse(fs.readFileSync("day_14.txt", "utf-8"))
run(ops)

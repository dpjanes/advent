// http://adventofadapter.com/2020/day/15
"use strict"

const fs = require("fs")
const _ = require("lodash")
const assert = require("assert")

let position = 0
let last_number = null
let last_position = null
let last_zero = null
const state = []
const es = []

const emit = (how, number) => {
    ++position

    last_number = number
    last_position = state[number]
    state[number] = position

    /*
    if (how === "N") {
        // console.log(how, `${position}`.padStart(8, "0"), number, position - last_zero)
    } else {
        // console.log(how, `${position}`.padStart(8, "0"), number)
    }
    // console.log(number, position)

    if (number === 0) {
        last_zero = position
    }

    es.push(last_number)
    */
}

const run = (seeds, end) => {
    seeds.forEach(number => {
        emit("S", number)
    })

    const start = new Date().getTime()

    for (; position < end; ) {
        if (last_position > 0) {
            emit("R", position - last_position)
        } else {
            emit("N", 0)
        }

        /*
        if (last_number === 175594) {
            console.log("DONE")
            return
        }

        const l = es.length - seeds.length
        if (l % 2 === 0) {
            const half = l / 2
            let repeat = true
            for (let i = seeds.length, j = half + seeds.length; i < half; i++, j++) {
                if (es[i] !== es[j]) {
                    repeat = false
                    break
                }
            }

            if (repeat) {
                console.log("REPEAT", repeat)
            }
        }

        */
        if (position % 100000 === 0) {
            const now = new Date().getTime()
            const delta = (now - start) / 1000

            console.log(position, Math.round(position / end * 1000) / 10, delta)
        }
    }

    console.log("last_number", last_number)
    console.log("last_position", last_position)
}

run([  8,13,1,0,18,9 ], 30000000)

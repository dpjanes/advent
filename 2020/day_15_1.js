// http://adventofadapter.com/2020/day/14
"use strict"

const fs = require("fs")
const _ = require("lodash")
const assert = require("assert")

let position = 0
let last_number = null
let last_position = null
const state = {}

const emit = (how, number) => {
    ++position

    last_number = number
    last_position = state[number]
    state[number] = position

    console.log(how, position, last_number)
}

const seed = (...numbers) => {
}

const run = (seeds, end) => {
    seeds.forEach(number => {
        emit("S", number)
    })

    for (; position < end; ) {
        if (last_position > 0) {
            emit("R", position - last_position)
        } else {
            emit("N", 0)
        }
    }
}

run([ 8,13,1,0,18,9 ], 2020)

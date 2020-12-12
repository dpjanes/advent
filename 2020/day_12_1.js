// http://adventofadapter.com/2020/day/12
"use strict"

const fs = require("fs")
const assert = require("assert")
const _ = require("lodash")

const make = (x, y, face) => ({ x: x, y: y, face: face })
const zero = () => make(0, 0, 0);

// E:0 N:3 W:2 S:1
const rotate = (face, amount) => ((face - (amount / 90)) + 4) % 4

const move = (position, move) => {
    const nposition = Object.assign({}, position);
    let direction = move.direction
    
    switch (direction) {
    case "L":
        nposition.face = rotate(nposition.face, move.amount)
        break

    case "R":
        nposition.face = rotate(nposition.face, -move.amount)
        break

    break;
    }

    if (direction === "F") {
        switch (nposition.face) {
        case 0: direction = "E"; break;
        case 1: direction = "S"; break;
        case 2: direction = "W"; break;
        case 3: direction = "N"; break;
        default:
            console.log("bad direction [1]")
            process.exit()
        }
    }

    console.log("-")
    console.log("TODO", move.direction, direction, move.amount)

    switch (direction) {
    case "N":
        nposition.y += move.amount;
        break;
    case "S":
        nposition.y -= move.amount;
        break;
    case "E":
        nposition.x += move.amount;
        break;
    case "W":
        nposition.x -= move.amount;
        break;

    case "L":
    case "R":
        break

    default:
        console.log("bad direction [2]")
        process.exit()
    }

    assert.ok(_.isInteger(nposition.x))
    assert.ok(_.isInteger(nposition.y))

    return nposition;
}

const same = (a, b) => (a.x === b.x) && (a.y === b.y);

const parse = text => text
    .split("\n")
    .filter(line => line.length)
    .map(line => line.match(/^([A-Z])(\d+)$/))
    .map(match => ({
        direction: match[1],
        amount: parseInt(match[2]),
    }))

const moves = parse(fs.readFileSync("day_12.txt", "utf-8"))

let position = zero()
moves.forEach(m => {
    position = move(position, m)
    console.log("NEW ", position)
})
console.log(Math.abs(position.x) + Math.abs(position.y))

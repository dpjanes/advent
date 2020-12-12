// http://adventofadapter.com/2020/day/12
"use strict"

const fs = require("fs")
const assert = require("assert")
const _ = require("lodash")

const make = (x, y, face) => ({ x: x, y: y, face: face })
const zero = () => make(0, 0, 0);

// E:0 N:3 W:2 S:1
const rotate = (face, amount) => ((face - (amount / 90)) + 4) % 4

const forward = (ship, waypoint, move) => {
    const np = Object.assign({}, ship);
    let direction = move.direction

    np.x += waypoint.x * move.amount
    np.y += waypoint.y * move.amount

    assert.ok(_.isInteger(np.x))
    assert.ok(_.isInteger(np.y))

    return np;
}

const move_waypoint = (ship, waypoint, move) => {
    const np = Object.assign({}, waypoint);
    let direction = move.direction
    
    switch (direction) {
    case "N":
        np.y += move.amount;
        break;
    case "S":
        np.y -= move.amount;
        break;
    case "E":
        np.x += move.amount;
        break;
    case "W":
        np.x -= move.amount;
        break;

    case "L":
    case "R":
    case "F":
        assert.ok(false)
    }

    assert.ok(_.isInteger(np.x))
    assert.ok(_.isInteger(np.y))

    return np;
}

const rotate_waypoint = (ship, waypoint, move) => {
    const np = Object.assign({}, waypoint);
    let direction = move.direction
    
    let moves = 0

    switch (direction) {
    case "L":
        moves = 4 - move.amount / 90
        break
    case "R":
        moves = move.amount / 90
        break

    case "N":
    case "S":
    case "E":
    case "W":
    case "F":
        assert.ok(false)
    }

// 10 units east and 4 units north
// 4 units east and 10 units south of the ship

// console.log("A", np)
    for (let mi = 0; mi < moves; mi++) {
        let x = np.x
        let y = np.y

        np.x = y
        np.y = -x
    }
// console.log("B", np)

    assert.ok(_.isInteger(np.x))
    assert.ok(_.isInteger(np.y))

    return np;
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

let ship = zero()
let waypoint = make(10, 1, 0)
moves.forEach((m, x) => {
    console.log("-", m.direction, m.amount)
    switch (m.direction) {
    case "F":
        ship = forward(ship, waypoint, m)
        console.log("FORW", ship, waypoint)
        break

    case "N":
    case "S":
    case "E":
    case "W":
        waypoint = move_waypoint(ship, waypoint, m)
        console.log("MOVE", ship, waypoint)
        break

    case "L":
    case "R":
        waypoint = rotate_waypoint(ship, waypoint, m)
        console.log("ROTE", ship, waypoint)
        break

    default:
        assert.ok(false)
        break

    }
})

console.log(Math.abs(ship.x) + Math.abs(ship.y))

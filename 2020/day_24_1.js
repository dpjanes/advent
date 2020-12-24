// http://adventofcode.com/2020/day/24
const fs = require("fs")
const assert = require("assert")
const _ = require("lodash")

const make = (x, y) => ({ x: x, y: y })
const zero = () => make(0, 0);
const same = (a, b) => (a.x === b.x) && (a.y === b.y);

const move = (position, direction) => {
    const move = {
        'w':  [-2,  0],
        'e':  [+2,  0],
        'sw': [-1, -1],
        'nw': [-1, +1],
        'se': [+1, -1],
        'ne': [+1, +1],
    }[direction]

    return make(position.x + move[0], position.y + move[1])
}

const grid = {}
const key = (p) => `${p.x}@${p.y}`
const get = (p) => !!grid[key(p)]
const set = (p, v) => grid[key(p)] = !!v
const flip = (p, v) => set(p, !get(p))

const raw = fs.readFileSync("day_24.txt", "utf-8")
// const raw = 'esew'
const ruless = raw.split("\n")
    .map(part => part.split(/(se|sw|nw|ne|e|w)/g).filter(rule => rule.length))
ruless.forEach(rules => {
    position = zero()
    rules.forEach(direction => position = move(position, direction))
    flip(position)
})

/*
ruless.forEach(rule => console.log(rule.join(", ")))
console.log(grid)
*/
console.log(_.values(grid).filter(v => v))
console.log(_.values(grid).filter(v => v).length)

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
const key = (p) => `${p.x}@${p.y}`
const get = (grid, p) => !!grid[key(p)]
const set = (grid, p, v) => grid[key(p)] = !!v
const flip = (grid, p, v) => set(grid, p, !get(grid, p))

const raw = fs.readFileSync("day_24.txt", "utf-8")
// const raw = 'esew'
const ruless = raw.split("\n")
    .map(part => part.split(/(se|sw|nw|ne|e|w)/g).filter(rule => rule.length))

const init = {}
ruless.forEach(rules => {
    position = zero()
    rules.forEach(direction => position = move(position, direction))
    flip(init, position)
})

const iterate = ogrid => {
    const countd = {}

    _.mapValues(ogrid, (is_black, coords) => {
        if (!is_black) {
            return
        }

        const match = coords.match(/^(-?\d+)@(-?\d+)/)
        assert.ok(match)

        const x = parseInt(match[1]);
        const y = parseInt(match[2]);

        [
            [-2,  0],
            [+2,  0],
            [-1, -1],
            [-1, +1],
            [+1, -1],
            [+1, +1],
        ].forEach(adj => {
            const np = make(x + adj[0], y + adj[1])
            const nkey = key(np)

            countd[nkey] = (countd[nkey] || 0) + 1
        })
    })

    // console.log(countd)

    const ngrid = {}
    _.mapValues(countd, (count, coords) => {
        const is_black = !!ogrid[coords]
        // console.log(!!ogrid[coords], count)
        if (is_black) {
            // Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
            if ((count === 1) || (count === 2)) {
                ngrid[coords] = true
            }
        } else {
            // Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
            if (count === 2) {
                ngrid[coords] = true
            }
        }
    })

    const sorted = a => {
        a.sort()
        return a
    }

    // console.log(sorted(_.toPairs(ogrid)))
    // console.log(sorted(_.toPairs(ngrid)))
    // process.exit()
    
    return ngrid
}


let g = init
for (let i = 0; i < 100; i++) {
    g = iterate(g)
    console.log(`Day ${i + 1}: ${_.values(g).filter(v => v).length}`)
}

// console.log(_.values(init).filter(v => v))

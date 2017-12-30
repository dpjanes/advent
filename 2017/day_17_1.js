// http://adventofcode.com/2017/day/17
"use strict";

const Spinlock = step => {
    const self = Object.assign({})
    
    let values = [ 0 ];
    let position = 0;
    let next = 0;

    self.move = value => {
        position += step
        position %= values.length

        next = values[position + 1];
        values = [].concat(values.slice(0, position + 1), [ value ], values.slice(position + 1))
        position ++
    }

    self.pretty = () => values.map((value, x) => (x % values.length) === position ? `(${value}) ` : ` ${value} `).join("");

    self.position = () => position;
    self.get = x => values[x % values.length];
    self.next = () => next;

    return self;
}

const run = step => {
    const spinlock = Spinlock(step)

    for (let i = 0; i < 2017; i++) {
        // console.log("*", i, ":", spinlock.pretty())
        spinlock.move(i + 1)
    }

    return spinlock.next()
}

console.log(run(3))
console.log(run(329))

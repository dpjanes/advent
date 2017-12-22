// http://adventofcode.com/2017/day/17
"use strict";

const Spinlock = step => {
    const self = Object.assign({})
    
    let position = 0;
    let zero = 0;

    self.move = value => {
        position = ((position + step) % value) + 1;

        if (position === 1) {
            zero = value
        }
    }

    self.zero = () => zero;

    return self;
}

const run = (step, iterations) => {
    const spinlock = Spinlock(step)

    for (let i = 0; i < iterations; i++) {
        if ((i % 10000) === 0) {
            console.log("*", i)
        }
        spinlock.move(i + 1)
    }

    return spinlock.zero()
}

// console.log(run(3, 10))
// console.log(run(3, 2017))
console.log(run(329, 50000000))

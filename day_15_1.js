// http://adventofcode.com/2017/day/15
"use strict";

const generate = (value, factor) => (value * factor) % 2147483647;
const generate_a = value => generate(value, 16807)
const generate_b = value => generate(value, 48271)

const run = (a, b) => {
    let count = 0;

    for (let i = 0; i < 40 * 1000 * 1000; i++) {
        a = generate_a(a)
        b = generate_b(b)

        if ((a & 0xFFFF) === (b & 0xFFFF)) {
            count++;
        }
    }

    return count;
}

console.log(run(65, 8921))
console.log(run(512, 191))

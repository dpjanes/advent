// http://adventofcode.com/2017/day/14
"use strict";

const list = period => Array(period).fill().map((v, i) => i)

const hash = (string) => {
    const period = 256;
    const protolengths = string
        .split("")
        .map(c => c.charCodeAt(0))
        .concat([ 17, 31, 73, 47, 23])

    const table = list(period);
    let position = 0;
    let skip = 0;

    const get = position => table[position % period];
    const put = (position, value) => table[position % period] = value;

    const read = length => Array(length).fill().map((v, i) => get(position + (length - i - 1)))
    const write = subarray => subarray.forEach((v, i) => put(position + i, v))

    for (let round = 0; round < 64; round++) {
        const lengths = protolengths.slice()

        while (lengths.length) {
            const length = lengths.shift();

            write(read(length))

            position += length + skip++;
            position %= 256; // pedantic, needed for Gb sized inputs
        }
    }

    const hashed = []

    for (let outer = 0; outer < 256; outer += 16) {
        let value = 0;

        for (let inner = 0; inner < 16; inner ++) {
            value ^= table[outer + inner];
        }

        hashed.push(value)
        /*

        if (value < 16) {
            hashed.push("0")
        }
        hashed.push(value.toString(16));
        */
    }

    return hashed;
}


const bitson = n => 
    ((n & 0x01) ? 1 : 0) +
    ((n & 0x02) ? 1 : 0) +
    ((n & 0x04) ? 1 : 0) +
    ((n & 0x08) ? 1 : 0) +
    ((n & 0x10) ? 1 : 0) +
    ((n & 0x20) ? 1 : 0) +
    ((n & 0x40) ? 1 : 0) +
    ((n & 0x80) ? 1 : 0);

const run = input => {
    let count = 0;
    for (let row = 0; row < 128; row++) {
        count = hash(`${input}-${row}`).reduce((sum, value) => sum + bitson(value), count)
    }

    return count
}

console.log(run("flqrgnkx"))
console.log(run("wenycdww"))

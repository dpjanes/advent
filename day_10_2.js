// http://adventofcode.com/2017/day/10
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

    const read = length => Array(length).fill().map((v, i) => get(position + i))
    const write = subarray => subarray.forEach((v, i) => put(position + i, v))

    for (let round = 0; round < 64; round++) {
        const lengths = protolengths.slice()

        while (lengths.length) {
            const length = lengths.shift();

            const subarray = read(length)
            subarray.reverse()
            write(subarray)

            position += length + skip++;
        }
    }

    const hashed = []

    for (let outer = 0; outer < 256; outer += 16) {
        let value = 0;

        for (let inner = 0; inner < 16; inner ++) {
            value ^= table[outer + inner];
        }

        if (value < 16) {
            hashed.push("0")
        }
        hashed.push(value.toString(16));
    }

    return hashed.join("")
}

console.log(hash("AoC 2017"))
console.log(hash("88,88,211,106,141,1,78,254,2,111,77,255,90,0,54,205"))

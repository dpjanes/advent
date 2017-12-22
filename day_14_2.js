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
    // make the matrix
    const rows = []
    for (let ri = 0; ri < 128; ri++) {
        const row = [];

        hash(`${input}-${ri}`).forEach(value => {
            for (let bit = 7; bit >= 0; bit--) {
                row.push((value & (0x01 << bit)) ? -1 : 0)
            }
        })

        rows.push(row)
    }

    const flood = (x, y, region) => {
        const floods = []
        floods.push([ x, y ])

        while (floods.length) {
            const first = floods.shift()
            x = first[0]
            y = first[1]

            if (x < 0) continue;
            if (y < 0) continue;
            if (x > 127) continue;
            if (y > 127) continue;

            if (region === 1) {
                console.log("" + x + "," + y, region, rows[y][x])
            }

            const value = rows[y][x];
            if (value !== -1) {
                continue
            }

            rows[y][x] = region;
            floods.push([ x - 1, y ])
            floods.push([ x + 1, y ])
            floods.push([ x, y - 1 ])
            floods.push([ x, y + 1 ])
        }
    }

    // flood fill
    let regions = 0;
    for (let ri = 0; ri < 128; ri++) {
        for (let ci = 0; ci < 128; ci++) {
            const v = rows[ri][ci];
            if (v === -1) {
                flood(ci, ri, ++regions)
            }
        }
    }

    return regions
}

console.log(run("flqrgnkx"))
console.log(run("wenycdww"))

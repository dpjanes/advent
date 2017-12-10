// http://adventofcode.com/2017/day/10
"use strict";

const list = period => Array(period).fill().map((v, i) => i)

const hash = (period, lengths) => {
    lengths = lengths.slice();
    const table = list(period);
    let position = 0;
    let skip = 0;

    const get = position => table[position % period];
    const put = (position, value) => table[position % period] = value;

    const read = length => Array(length).fill().map((v, i) => get(position + i))
    const write = subarray => subarray.forEach((v, i) => put(position + i, v))

    while (lengths.length) {
        const length = lengths.shift();

        const subarray = read(length)
        subarray.reverse()
        write(subarray)

        position += length + skip++;
    }

    return table[0] * table[1];
}

console.log(hash(5, [ 3, 4, 1, 5 ]))
console.log(hash(256, [ 88,88,211,106,141,1,78,254,2,111,77,255,90,0,54,205 ]))

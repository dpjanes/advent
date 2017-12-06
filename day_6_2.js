// http://adventofcode.com/2017/day/5
"use strict";

const isUndefined = v => typeof v === "undefined";

const execute = banks => {
    banks = banks
        .split(/\s+/)
        .filter(line => line.length)
        .map(value => parseInt(value));

    const seen = {}

    const check = (_banks, where) => {
        const key = _banks.join("/")
        const value = seen[key];
        if (!isUndefined(value)) {
            return value;
        }

        seen[key] = where;
    }

    let count = 0;

    while (isUndefined(check(banks, count))) {
        const max = Math.max.apply(null, banks)
        const start = banks.indexOf(max)

        banks[start] = 0;
        for (let i = 0; i < max; i++) {
            banks[(start + i + 1) % banks.length] += 1
        }

        count += 1;
    }

    return count - check(banks)
}

console.log(execute("0 2 7 0"))
console.log(execute("4  10  4   1   8   4   9   14  5   1   14  15  0   15  3   5"))

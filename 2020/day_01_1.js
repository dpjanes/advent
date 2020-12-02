// http://adventofcode.com/2020/day/1
const fs = require("fs")
const numbers = fs.readFileSync("day_01.txt", "utf-8")
    .split("\n")
    .filter(s => s.length)
    .map(s => parseInt(s))

let _done = false
for (let i = 0; i < numbers.length && !_done; i++) {
    for (let j = i + 1; j < numbers.length && !_done; j++) {
        const a = numbers[i]
        const b = numbers[j]
        if ((a + b) == 2020) {
            console.log(a, b, a * b)
            _done = true
        }
    }
}

// http://adventofcode.com/2020/day/1
const fs = require("fs")
const numbers = fs.readFileSync("day_01_1.txt", "utf-8")
    .split("\n")
    .filter(s => s.length)
    .map(s => parseInt(s))

let _done = false
for (let i = 0; i < numbers.length && !_done; i++) {
    const a = numbers[i]

    for (let j = i + 1; j < numbers.length && !_done; j++) {
        const b = numbers[j]
        const ab = a + b
        if (ab > 2020) {
            continue
        }

        for (let k = j + 1; k < numbers.length && !_done; k++) {
            const c = numbers[k]

            if ((ab + c) == 2020) {
                console.log(a, b, c, a * b * c)
                _done = true
            }
        }
    }
}

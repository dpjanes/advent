// http://adventofcode.com/2020/day/3
const fs = require("fs")

const parse = text => text
    .split("\n")
    .map(line => line
        .split("")
        .map(c => c === "#" ? 1 : 0)
    )

const height = course => course.length
const get = (x, y) => course[y][x % course[0].length]

const navigate = (course, x_delta) => {
    let count = 0
    let x = 0
    for (let y = 1; y < height(course); y++) {
        x += x_delta

        if (get(x, y)) {
            count++
        }
    }

    return count
}

const course = parse(fs.readFileSync("day_03.txt", "utf-8"))
const count = navigate(course, 3)
console.log(count)

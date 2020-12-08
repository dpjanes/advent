// http://adventofcode.com/2020/day/8
const fs = require("fs")
const _ = require("lodash")

const parse = text => text
    .split("\n")
    .filter(line => line.length)
    .map(line => line.match(/^([a-z]{3}) ([-+]\d+)/))
    .map(match => ({
        op: match[1],
        value: parseInt(match[2]),
    }))

const run = statements => {
    let acc = 0
    let index = 0
    let count = 0
    let seen = new Set()

    while (true) {
        if (index === statements.length) {
            return acc
        } else if (seen.has(index)) {
            return null
        } else {
            seen.add(index)
        }

        const statement = statements[index]
        switch (statement.op) {
        case "nop":
            index ++
            break

        case "acc":
            acc += statement.value
            index ++
            break

        case "jmp":
            index += statement.value
            break
        }

        // console.log(`count=${count} index=${index} acc=${acc}`, statement)
        count++
    }
}

const statements = parse(fs.readFileSync("day_08.txt", "utf-8"))
for (let si = 0; si < statements.length; si++) {
    const op = statements[si].op
    switch (op) {
    case "nop":
        statements[si].op = "jmp"
        break

    case "jmp":
        statements[si].op = "nop"
        break

    default:
        continue
    }

    const result = run(statements)
    if (result !== null) {
        console.log("FIXED", si, result)
    }

    statements[si].op = op
}

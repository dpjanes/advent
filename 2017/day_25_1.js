// http://adventofcode.com/2017/day/25
"use strict";

const assert = require("assert")

const parse = raw => {
    const program = {
        state: null,
        steps: null,
        states: {}
    }
    let match;
    let state;
    let rule;

    raw.split("\n")
        .filter(line => line.length)
        .forEach(line => {
            match = line.match(/^Begin in state ([A-Z])./);
            if (match) {
                program.state = match[1];
                return;
            }

            match = line.match(/^Perform a diagnostic checksum after (\d+) steps./);
            if (match) {
                program.steps = parseInt(match[1]);
                return;
            }

            match = line.match(/^In state ([A-Z]):/);
            if (match) {
                state = {
                    state: match[1],
                    rules: [
                        {
                            state: null,
                            move: null,
                            write: 0,
                        },
                        {
                            state: null,
                            move: null,
                            write: 1,
                        },
                    ]
                }
                program.states[state.state] = state
                return;
            }

            match = line.match(/^  If the current value is (0|1):/);
            if (match) {
                rule = state.rules[parseInt(match[1])]
                return;
            }

            match = line.match(/^    - Continue with state ([A-Z])./);
            if (match) {
                rule.state = match[1];
                return;
            }

            match = line.match(/^    - Move one slot to the (left|right)./);
            if (match) {
                if (match[1] === "left") {
                    rule.move = -1;
                } else {
                    rule.move = +1;
                }
                return;
            }

            match = line.match(/^    - Write the value (0|1)./);
            if (match) {
                rule.write = parseInt(match[1])
                return;
            }

        })

    return program;
}

const Turing = program => {
    const self = Object.assign({});

    let min = 0;
    let max = 0;
    let pc = 0;
    let state = program.state;

    const tape = {};
    const get = position => tape[position] || 0;
    const set = (position, value) => {
        min = Math.min(position, min)
        max = Math.max(position, max)

        if (value) {
            tape[position] = 1;
        } else {
            delete tape[position];
        }
    }

    self.pretty = () => {
        const parts = []

        for (let pi = min; pi <= max; pi++) {
            if (pi === pc) {
                parts.push(`(${get(pi)})`)
            } else {
                parts.push(`${get(pi)}`)
            }
        }

        return parts.join(" ");
    }

    self.step = () => {
        const rule = program.states[state].rules[get(pc)];

        state = rule.state;
        set(pc, rule.write)
        pc += rule.move;
    }

    self.run = () => {
        console.log(`* 0:`, self.pretty())
        for (let i = 0; i < program.steps; i++) {
            self.step();
            if (!(i % 10000)) {
                console.log(i)
                // console.log(`* ${i+1}:`, self.pretty())
            }
        }

        return Object.keys(tape).length;
    }

    return self;
}

const run = raw => Turing(parse(raw)).run()

console.log(run(`
Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
`))
console.log(run(`
Begin in state A.
Perform a diagnostic checksum after 12586542 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 0.
    - Move one slot to the right.
    - Continue with state C.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state B.

In state C:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state D.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state A.

In state D:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state E.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state F.

In state E:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state D.

In state F:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state E.
`))

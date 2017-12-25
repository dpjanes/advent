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
                            write: null,
                        },
                        {
                            state: null,
                            move: null,
                            write: null,
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

console.log(parse(`
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

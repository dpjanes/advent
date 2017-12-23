// http://adventofcode.com/2017/day/23
"use strict";

const assert = require("assert")

const parse = raw => raw
    .split("\n")
    .map(line => line.match(/^([a-z]+) ([-a-z0-9])( (.*))?/))
    .filter(match => match)
    .reduce((cfg, match) => {
        cfg.push({
            op: match[1],
            x: match[2],
            y: match[3] ? match[4] : null, 
        });
        return cfg;
    }, []);

const run = raw => {
    const program = parse(raw)

    const registers = {}
    const get = register => register.match(/[a-z]/) ? (registers[register] || 0) : parseInt(register)
    const set = (register, value) => registers[register] = value;

    let pc = 0;
    let count = 0;

    while (true) {
        const instruction = program[pc];
        if (!instruction) {
            break;
        }
        // console.log(pc, instruction, registers)

        switch (instruction.op) {
        case "set": 
            // sets register X to the value of Y.
            set(instruction.x, get(instruction.y))
            break;
            
        case "mul": 
            // sets register X to the result of multiplying the 
            // value contained in register X by the value of Y.
            set(instruction.x, get(instruction.x) * get(instruction.y))
            count++;
            break;

        case "sub": 
            // decreases register X by the value of Y.
            set(instruction.x, get(instruction.x) - get(instruction.y))
            break;

        case "jnz":     
            // Y jumps with an offset of the value of Y, 
            // but only if the value of X is not zero. 
            // (An offset of 2 skips the next instruction, 
            // an offset of -1 jumps to the previous instruction, 
            // and so on.)
            if (get(instruction.x) !== 0) {
                pc += get(instruction.y) - 1;
            }
            break;

        default:
            assert.ok(false);
        }

        pc += 1
    }

    return count;
}

console.log(run(`
set b 65
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23
`))

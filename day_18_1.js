// http://adventofcode.com/2017/day/13
"use strict";

const assert = require("assert")

const parse = raw => raw
    .split("\n")
    .map(line => line.match(/^([a-z]+) ([a-z])( (.*))?/))
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
    let sound = 0;

    while (true) {
        const instruction = program[pc];
        console.log(pc, instruction.op, registers)
        assert.ok(instruction)

        switch (instruction.op) {
        case "snd": 
            // plays a sound with a frequency equal to the value of X.
            sound = get(instruction.x)
            break;
            
        case "set": 
            // sets register X to the value of Y.
            set(instruction.x, get(instruction.y))
            break;
            
        case "add": 
            // increases register X by the value of Y.
            set(instruction.x, get(instruction.x) + get(instruction.y))
            break;

        case "mul": 
            // sets register X to the result of multiplying the 
            // value contained in register X by the value of Y.
            set(instruction.x, get(instruction.x) * get(instruction.y))
            break;

        case "mod": 
            // sets register X to the remainder of dividing 
            // the value contained in register X by the value of Y 
            // (that is, it sets X to the result of X modulo Y).
            set(instruction.x, get(instruction.x) % get(instruction.y))
            break;

        case "rcv": 
            // recovers the frequency of the last sound played, 
            // but only when the value of X is not zero. (If it is zero, the command does nothing.)
            if (get(instruction.x)) {
                return sound;
            }
            break;

        case "jgz":     
            // jumps with an offset of the value of Y, but only 
            // if the value of X is greater than zero. (An offset 
            // of 2 skips the next instruction, an offset of -1 
            // jumps to the previous instruction, and so on.)
            if (get(instruction.x) > 0) {
                pc += get(instruction.y) - 1;
            }
            break;

        default:
            assert.ok(false);
        }

        pc += 1
    }
}


console.log(run(`
set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2
`))
console.log(run(`
set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 680
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19
`))

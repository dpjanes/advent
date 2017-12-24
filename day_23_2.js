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

const _register = x => x.match(/^[a-h]/)

const decompile = raw => {

    console.log(`
void main()
{
    int a = 1;
    int b = 0;
    int c = 0;
    int d = 0;
    int e = 0;
    int f = 0;
    int g = 0;
    int h = 0;
`)

    parse(raw).forEach((step, line) => {
        // console.log()
        console.log(`// ${step.op} ${step.x} ${step.y}`)
        // console.log(`step${line}:`)

        switch (step.op) {
        case "set":
            console.log(`step${line}: ${step.x} = ${step.y};`)
            break;

        case "mul":
            console.log(`step${line}: ${step.x} *= ${step.y};`)
            break;

        case "sub":
            console.log(`step${line}: ${step.x} -= ${step.y}; `)
            break;
                
        case "jnz":     
            console.log(`step${line}: if (${step.x}) goto step${line + parseInt(step.y)};`)
            break
        }
    })

    /*
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
                console.log("--");
            }
    */

    console.log("}")
}

decompile(`
## 
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

## group 1
set g d
mul g e
sub g b
jnz g 2
set f 0

## group 2
sub e -1
set g e
sub g b
jnz g -8

## group 2
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
`)

// http://adventofcode.com/2017/day/3
"use strict";

/*

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23  24  25

*/

const find = target => {
    const values = {}

    const set = (x, y, value) => values[`${x},${y}`] = value;
    const get = (x, y) => values[`${x},${y}`] || 0;
    const sum = (x, y) => 
        get(x - 1, y + 1) +
        get(x + 0, y + 1) +
        get(x + 1, y + 1) +
        get(x - 1, y + 0) +
        get(x + 1, y + 0) +
        get(x - 1, y - 1) +
        get(x + 0, y - 1) +
        get(x + 1, y - 1);

    set(0, 0, 1);

    for (let ring = 1; ; ring++) {
        let side = ring * 2;
        let end = (side + 1) ** 2
        let start = end - side * 4 + 1;

        // console.log("==")

        for (let position = start; position <= end; position++) {
            let edge = Math.floor((end - position) / side)
            let edge_center = end - (side / 2) - (edge * side)
            
            let x, y;
            switch (edge) {
            case 3: x = ring; y = position - edge_center; break;
            case 2: y = ring; x = edge_center - position; break;
            case 1: x = -ring; y = edge_center - position; break;
            case 0: y = -ring; x = position - edge_center; break;
            }

            let value = set(x, y, sum(x, y))
            if (value > target) {
                return value;
            }
                
            // console.log(position, ":", x, y, "=", value)
        }
    }
}
    
console.log(find(361527))

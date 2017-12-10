// http://adventofcode.com/2017/day/3
"use strict";

/*

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...

*/

/**
 *  If you follow this through a step at a time
 *  and think about it, you'll get it. I
 *  didn't look this up lol.
 *
 *  Core insight is that the number of steps = 
 *  Steps to the edge, plus steps from center 
 *  of edge, both of which can be simply computed
 *
 *  But for say 12,
 *
 *      ring = 1
 *      side = 4 (not 5!)
 *      end = 25
 *      edge = 3 (edges are 0-3)
 *      edge_center = 11
 *
 *  So now we know it's 1 move up on the (11 to 12)
 *  and it's 2 moves to get to the ring itself
 */
const distance = position => {
    if (position === 1) {
        return 0;
    }

    const ring = Math.ceil(Math.ceil(Math.sqrt(position)) / 2 - 0.5)
    const side = ring * 2;
    const end = (side + 1) ** 2
    const edge = Math.floor((end - position) / side)
    const edge_center = end - (side / 2) - (edge * side)

    return Math.abs(edge_center - position) + ring;
}

console.log(distance(1))
console.log(distance(12))
console.log(distance(23))
console.log(distance(1024))
console.log(distance(361527))

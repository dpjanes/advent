// http://adventofcode.com/2020/day/23
const fs = require("fs")
const assert = require("assert")

const Circle = () => {
    const self = new Object({})

    let currentv = 0
    let maxv = 0
    let state = []
    let valued = {}

    self.push = value => {
        maxv = Math.max(value, maxv)

        if (state.length === 0) {
            state.push({
                value: value,
                next: 0,
                // prev: 0,
            })
        } else {
            state[state.length - 1].next = state.length
            state.push({
                value: value,
                next: 0,
                // prev: state.length,
            })
        }

        const last = state[state.length - 1]
        valued[last.value] = last
    }

    self.initialize = s => {
        s.replace(/[^\d]/g, "")
            .split("")
            .map(s => parseInt(s))
            .forEach(i => self.push(i))

        currentv = state[0].value

        for (let i = maxv + 1; i <= 1000 * 1000; i++) {
            self.push(i)
        }
    }

    self.flat = () => {
        return []
        const parts = []

        let cursor = valued[1]
        for (let i = 1; i < state.length; i++) {
            cursor = state[cursor.next]
            parts.push(`${cursor.value}`)
        }

        return parts.join("")
    }

    self.prettys = () => {
        return []
        const parts = []

        let cursor = valued[currentv]
        for (let i = 0; i < state.length; i++) {
            if (i === 0) {
                parts.push(`(${cursor.value})`)
            } else {
                parts.push(`${cursor.value}`)
            }

            cursor = state[cursor.next]
        }

        return parts.join(" ")
    }

    self.state = () => {
        state.forEach((d, x) => {
            console.log(x, d)
        })
    }

    self.play = MOVES => {
        let nmove = 0
        const move = () => {
            ++nmove
            if (nmove % 10000 === 0) {
                console.log(`-- move ${nmove} --`)
            }
            // console.log(`cups: ${self.prettys()}`)

            const currentd = valued[currentv]
            // console.log("CURRENT", currentd)
            let popd = currentd
            const popds = []
            for (let i = 0; i < 3; i++) {
                popd = state[popd.next]
                popds.push(popd)
                // console.log("POP", popd)
            }

            let nextv = currentv
            while (true) {
                --nextv

                if (nextv === 0) {
                    nextv = maxv
                }

                if ((nextv !== popds[0].value) && (nextv !== popds[1].value) && (nextv !== popds[2].value)) {
                    break
                }
            }

            const nextd = valued[nextv]

            const nextd_next = nextd.next
            const currentd_next = currentd.next

            currentd.next = popds[2].next
            nextd.next = currentd_next
            popds[2].next = nextd_next

            /*
            console.log("NEXT", nextd)
            self.state()
            */

            currentv = state[currentd.next].value
        }


        for (let mi = 0; mi < MOVES; mi++) {
            move()
        }

        let d1 = valued[1]
        let d2 = state[d1.next]
        let d3 = state[d2.next]

        console.log("FINAL", d1, d2, d3)
        console.log("RESULT", d2.value * d3.value)
    }

    return self
}

const circle = Circle()
// circle.initialize("389125467") // test
circle.initialize("562893147") // real
circle.play(1000 * 1000 * 10)

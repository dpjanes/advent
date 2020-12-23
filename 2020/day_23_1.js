// http://adventofcode.com/2020/day/23
const fs = require("fs")
const assert = require("assert")


const Circle = () => {
    const self = new Object({})

    let currentv = 0
    let max
    let state = []

    self.initialize = s => {
        state = s
            .replace(/[^\d]/g, "")
            .split("")
            .map(s => parseInt(s))

        currentv = state[0]
        max = Math.max(...state)
    }

    self.flat = () => {
        const parts = []
        let x = state.indexOf(1)
        for (let i = 1; i < state.length; i++) {
            parts.push(state[(x + i) % state.length])
        }
        return parts.map(n => `${n}`).join("")
    }

    self.prettys = () => {
        return state
            .map((n, nx) => n === currentv ? `(${n})` : `${n}`)
            .join(" ")
    }

    self.play = MOVES => {
        let nmove = 0
        const move = () => {
            console.log(`-- move ${++nmove} --`)
            console.log(`cups: ${self.prettys()}`)

            // this can float around so we compute
            let currentx = state.indexOf(currentv)

            // remove 3 cups immediately to right of current
            const removed = []
            for (let i = 0; i < 3; i++) {
                let picki = (currentx + i + 1) % state.length
                removed.push(state[picki])
                state[picki] = "X"
            }

            state = state.filter(s => s !== "X")
            currentx = state.indexOf(currentv)

            console.log(`pick up: ${removed.join(", ")}`)
            console.log(`state: ${self.prettys()}`)

            // find the destination
            let destinationv = state[currentx] 
            let destinationx = -1
            while (destinationx === -1) {
                destinationv--

                if (destinationv === 0) {
                    destinationv = max
                }

                destinationx = state.indexOf(destinationv)
            }

            console.log(`destination: ${destinationv} (@ ${destinationx})`)

            // insert cups to the right of the destination
            state.splice((destinationx + 1)/* % state.length*/, 0, ...removed)
            console.log(`state: ${self.prettys()}`)

            // remove X cups
            // state = state.filter(s => s !== "X")

            // next state
            currentx = state.indexOf(currentv)
            currentv = state[(currentx + 1) % state.length]

            console.log(`final: ${self.prettys()}`)
            console.log()
        }

        for (let mi = 0; mi < MOVES; mi++) {
            move()
        }

        console.log("FINAL", self.flat())
    }

    return self
}

const circle = Circle()
// circle.initialize("389125467") // test
circle.initialize("562893147") // real
circle.play(100)

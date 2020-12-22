// http://adventofcode.com/2020/day/22
const fs = require("fs")
const assert = require("assert")
const _ = require("lodash")


const parse = raw => {
    const cards = []
    let current = 0

    raw.split("\n").forEach(line => {
        let match

        if (match = line.match(/^Player ([12]):/)) {
            current = parseInt(match[1])
            cards[current] = []
        }

        if (match = line.match(/^(\d+)$/)) {
            cards[current].unshift(parseInt(match[1]))
        }
    })

    return cards
}

const cards = parse(fs.readFileSync("day_22.txt", "utf-8"))
console.log(cards)

let n = 0
const round = () => {
    console.log(`-- Round ${++n} --`)
    console.log(`Player 1's deck: ${cards[1].join(", ")}`)
    console.log(`Player 2's deck: ${cards[2].join(", ")}`)

    const card1 = cards[1].pop()
    const card2 = cards[2].pop()

    console.log(`Player 1 plays: ${card1}`)
    console.log(`Player 2 plays: ${card2}`)

    if (card1 > card2) {
        console.log(`Player 1 wins the round!`)

        cards[1].unshift(card1)
        cards[1].unshift(card2)
        return 1
    } else {
        console.log(`Player 2 wins the round!`)
        cards[2].unshift(card2)
        cards[2].unshift(card1)
        return 2
    }
}

let winner
while (cards[1].length && cards[2].length) {
    winner = round()
}

let total = 0
cards[winner].forEach((card, cardx) => {
    total += card * (cardx + 1)
})

console.log(total)

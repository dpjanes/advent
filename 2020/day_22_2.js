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
            cards[current].push(parseInt(match[1]))
        }
    })

    return cards
}

let ngame = 0

const game = (cards1, cards2, depth) => {
    let nround = 0
    const seen = new Set()

    console.log(`== Game ${++ngame} ==`)
    // console.log("cards1", cards1)
    // console.log("cards2", cards2)

    let winner
    while (cards1.length && cards2.length) {
        const KEY = cards1.join(",") + "@" + cards2.join(",")
        if (seen.has(KEY)) {
            console.log("RECURSION WINNER (deck1 repeat)")
            return 1
        } else {
            seen.add(KEY)
        }

        // console.log(`-- Round ${++nround} --`)
        // console.log(`Player 1's deck: ${cards1.join(", ")}`)
        // console.log(`Player 2's deck: ${cards2.join(", ")}`)

        const card1 = cards1.shift()
        const card2 = cards2.shift()
        // console.log(`Player 1 plays: ${card1}`)
        // console.log(`Player 2 plays: ${card2}`)

        if ((card1 <= cards1.length) && (card2 <= cards2.length)) {
            // console.log("playing subgame")
            winner = game(
                cards1.slice(0, card1),
                cards2.slice(0, card2),
                depth + 1
            )
            // console.log("SUBWINNER", winner)
        } else if (card1 > card2) {
            // console.log(`Player 1 wins the round!`)
            winner = 1
        } else {
            // console.log(`Player 2 wins the round!`)
            winner = 2
        }

        if (winner == 1) {
            cards1.push(card1)
            cards1.push(card2)
        } else {
            cards2.push(card2)
            cards2.push(card1)
        }
    }

    if (depth === 0) {
        let cs = winner === 1 ? cards1 : cards2
        let total = 0
        cs.forEach((card, cardx, cs) => {
            total += card * (cs.length - cardx)
        })
        console.log("WINNER", winner)
        console.log("TOTAL", total)
    }

    return winner
}


const raw = fs.readFileSync("day_22.txt", "utf-8")
const xraw = `Player 1:
43
19

Player 2:
2
29
14`
const cards = parse(raw)
game(cards[1].slice(), cards[2].slice(), 0)

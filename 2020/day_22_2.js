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

const play = () => {
    let ngame = 0

    const game = cards => {
        let nround = 0
        const seens = [ null, new Set(), new Set() ]

        console.log(`== Game ${++ngame} ==`)


        const round = () => {
            const deck1 = cards[1].join(", ")
            const deck2 = cards[2].join(", ")

            if (seens[1].has(deck1)) {
                console.log("RECURSION WINNER (deck1 repeat)")
                return -1
            } else if (seens[2].has(deck2)) {
                console.log("RECURSION WINNER (deck2 repeat)")
                return -1
            }

            seens[1].add(deck1)
            seens[2].add(deck2)

            // console.log(`-- Round ${++nround} --`)
            // console.log(`Player 1's deck: ${deck1}`)
            // console.log(`Player 2's deck: ${deck2}`)

            const card1 = cards[1].shift()
            const card2 = cards[2].shift()

            // console.log(`Player 1 plays: ${card1}`)
            // console.log(`Player 2 plays: ${card2}`)

            // If both players have at least as many cards remaining in their deck as the value of the card they just drew, the winner of the round is determined by playing a new game of Recursive Combat (see below).
            // Otherwise, at least one player must not have enough cards left in their deck to recurse; the winner of the round is the player with the higher-value card.
            let winner = 0
            if ((card1 <= cards[1].length) && (card2 <= cards[2].length)) {
                // console.log("playing subgame")
                winner = game([
                    null,
                    cards[1].slice(),
                    cards[2].slice(),
                ])
            } else if (card1 > card2) {
                // console.log(`Player 1 wins the round!`)
                winner = 1
            } else {
                // console.log(`Player 2 wins the round!`)
                winner = 2
            }

            if (winner < 0) {
                return winner
            } else if (winner == 1) {
                cards[1].push(card1)
                cards[1].push(card2)
                return 1
            } else {
                cards[2].push(card2)
                cards[2].push(card1)
                return 2
            }
        }

        let winner
        while (cards[1].length && cards[2].length) {
            winner = round()
            if (winner < 0) {
                return -winner
            }
        }

        let total = 0
        cards[winner].forEach((card, cardx, cs) => {
            total += card * (cs.length - cardx)
        })
        console.log(total)

        return winner
    }

    const winner = game([
        null,
        cards[1].slice(),
        cards[2].slice(),
    ])

    console.log(winner)
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
play()

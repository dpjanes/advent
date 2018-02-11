/*
 *  649.js
 *
 *  David Janes
 *  2018-02-11
 *
 *  This simulates a bar game at the local pub,
 *  based on the 6/49 lotto.
 *
 *  Every player chooses 6 distinct numbers.
 *  Every week 6 distinct random numbers are drawn.
 *  Those numbers are struck from the player's numbers.
 *  The first player to get all their numbers struck win.
 *
 *  This will run 1000 simulations for 1-25 players,
 *  printing the average number of weeks to win, plus
 *  the least and the most.
 */
const roll = () => Math.floor(Math.random() * 49) + 1
const six = () => {
    const numbers = []

    while (numbers.length < 6) {
        const number = roll()
        if (numbers.indexOf(number) === -1) {
            numbers.push(number)
        }
    }

    return numbers
}

const players = n => {
    const sixs = []

    for (let i = 0; i < n; i++) {
        sixs.push(six())
    }

    return sixs;
}

const subtract = (six_a, six_b) => {
    six_a = six_a.slice(0)
    six_b.forEach(value => {
        const index = six_a.indexOf(value)
        if (index > -1) {
            six_a.splice(index, 1);
        }
    })

    return six_a
}

const play = n => {
    let state = players(n)
    let rounds = 1

    do {
        const now = six()
        state = state.map(player => subtract(player, now))

        /*
        console.log()
        console.log(now)
        console.log(state)
        */

        if (state.find(player => player.length === 0)) {
            break
        }
        
        rounds++
    } while (true)

    return rounds
}

const superplay = (n, rounds) => {
    let sum = 0
    let max = 0
    let min = 9999

    for (let i = 0; i < rounds; i++) {
        const result = play(n)
        sum += result
        max = Math.max(max, result)
        min = Math.min(min, result)
    }

    return [ sum / rounds, min, max ];
}

for (let players = 1; players <= 25; players++) {
    console.log("players", players, "weeks", superplay(players, 1000))
}

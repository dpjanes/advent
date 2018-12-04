// http://adventofcode.com/2018/day/03

package main

import "fmt"
import "io/ioutil"
import "strings"
import "regexp"
import "strconv"

func check(e error) {
    if e != nil {
        panic(e)
    }
}

type square struct {
    id string
    x int
    y int
    width int
    height int
}

func parse_square(s string) *square {
    // #3 @ 604,922: 11x17
    re := regexp.MustCompile("^#(\\d+) @ (\\d+),(\\d+): (\\d+)x(\\d+)$")
    match := re.FindStringSubmatch(s)
    if (len(match) == 0) {
        return nil
    }

    x, _ := strconv.Atoi(match[2])
    y, _ := strconv.Atoi(match[3])
    width, _ := strconv.Atoi(match[4])
    height, _ := strconv.Atoi(match[5])

    return &square{
        id: match[1],
        x: x + 1,
        y: y + 1,
        width: width,
        height: height,
    }
}

func expand_square(sq square) []string {
    vs := []string {}

    for xi := 0; xi < sq.width; xi++ {
        for yi := 0; yi < sq.height; yi++ {
            vs = append(vs, fmt.Sprintf("%v@%v", xi + sq.x, yi + sq.y))
        }
    }

    return vs
}

func main() {
    dat, err := ioutil.ReadFile("data.dat")
    check(err)

    sqs := []square {}
    s_squares := strings.Split(string(dat), "\n")
    for _, s_square := range s_squares {
        ptr_sq := parse_square(s_square)
        if (ptr_sq != nil) {
            sqs = append(sqs, *ptr_sq)
        }
    }

    used := map[string]int {}

    for _, sq := range sqs {
        for _, point := range expand_square(sq) {
            used[point] += 1
        }
    }

    // everything else is the same above; find which square was only used once
    for _, sq := range sqs {
        ok := true

        for _, point := range expand_square(sq) {
            if used[point] != 1 {
                ok = false
                break
            }
        }

        if ok {
            fmt.Printf("%v\n", sq.id)
            break
        }
    }
}

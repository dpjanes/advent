// http://adventofcode.com/2018/day/02

package main

import "fmt"
import "io/ioutil"
import "strings"
// import "strconv"

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func counts(s string) (map[int]int) {
    seen := map[string]int {}
    for _, c := range strings.Split(s, ""){
        seen[c] += 1
    }

    c := map[int]int {}
    for _, value := range seen {
        c[value] += 1
    }

    return c
}

func main() {
    dat, err := ioutil.ReadFile("data.dat")
    check(err)

    s_codes := strings.Split(string(dat), "\n")

    twos := 0
    threes := 0
    for _, s_code := range s_codes {
        c := counts(s_code)
        if c[2] != 0 {
            twos += 1
        }
        if c[3] != 0 {
            threes += 1
        }
    }

    fmt.Printf("%v %v %v\n", twos, threes, twos * threes)

}

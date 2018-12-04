// http://adventofcode.com/2018/day/1

package main

import "fmt"
import "io/ioutil"
import "strings"
import "strconv"

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
    dat, err := ioutil.ReadFile("data.dat")
    check(err)

    s_changes := strings.Split(string(dat), "\n")

    frequency := 0
    found := false
    seen := map[int]bool {
        0: true,
    }

    for !found {
        for _, s_change := range s_changes {
            i_change, err := strconv.Atoi(s_change)
            if err == nil {
                frequency += i_change

                if seen[frequency] {
                    fmt.Printf("%v\n", frequency)
                    found = true
                    break
                }

                seen[frequency] = true
            }
        }
    }
}

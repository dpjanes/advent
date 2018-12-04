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

    s_changes := strings.Split(string(dat), "\n")

    frequency := 0
    i_changes := make([]int, 0)
    for _, v := range s_changes {
        i, err := strconv.Atoi(v)
        if err == nil {
            i_changes = append(i_changes, i)
            frequency += i
        }
    }

    fmt.Printf("%v\n", frequency)
}

// http://adventofcode.com/2018/day/07

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
    /*
    dat, err := ioutil.ReadFile("data.dat")
    check(err)

    s_changes := strings.Split(string(dat), "\n")

    frequency := 0
    for _, s_change := range s_changes {
        i_change, err := strconv.Atoi(s_change)
        if err == nil {
            frequency += i_change
        }
    }

    fmt.Printf("%v\n", frequency)
    */
}

// http://adventofcode.com/2018/day/02

package main

import "fmt"
import "io/ioutil"
import "strings"

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
    dat, err := ioutil.ReadFile("data.dat")
    check(err)

    s_codess := [][]string {}

    s_codes := strings.Split(string(dat), "\n")
    for _, s_code := range s_codes {
        if len(s_code) > 0 {
            s_codess = append(s_codess, strings.Split(s_code, ""))
        }
    }

    found := false
    outerx := 0
    for outerx < len(s_codess) && !found {
        s_outer := s_codess[outerx]
        outerx ++

        innerx := outerx + 1
        for innerx < len(s_codess) {
            s_inner := s_codess[innerx]
            innerx ++

            count := 0
            for sx, sc := range s_outer {
                if (sc != s_inner[sx]) {
                   count += 1
                }
            }

            if count == 1 {
                for sx, sc := range s_outer {
                    if (sc == s_inner[sx]) {
                        fmt.Print(sc)
                    }
                }
                fmt.Print("\n")

                found = true
                break
            }

        }

    }
}

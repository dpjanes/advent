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

type Event struct {
    event string
    id string
    year int
    month int
    day int
    hour int
    minute int
}

func parse_event(line string, ptr_last_event *Event) *Event {
    // [1518-05-24 23:56] Guard #1721 begins shift
    // [1518-08-22 00:09] falls asleep
    // [1518-05-19 00:53] wakes up
    re := regexp.MustCompile("^\\[(\\d+)-(\\d+)-(\\d+) (\\d+):(\\d+)\\] Guard #(\\d+) begins shift$")
    match := re.FindStringSubmatch(line)
    if (len(match) != 0) {
        year, _ := strconv.Atoi(match[1])
        month, _ := strconv.Atoi(match[2])
        day, _ := strconv.Atoi(match[3])
        hour, _ := strconv.Atoi(match[4])
        minute, _ := strconv.Atoi(match[5])
        id := match[6]

        return &Event{
            event: "begin",
            id: id,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
        }
    }

    re = regexp.MustCompile("^\\[(\\d+)-(\\d+)-(\\d+) (\\d+):(\\d+)\\] falls asleep$")
    match = re.FindStringSubmatch(line)
    if (len(match) != 0) {
        year, _ := strconv.Atoi(match[1])
        month, _ := strconv.Atoi(match[2])
        day, _ := strconv.Atoi(match[3])
        hour, _ := strconv.Atoi(match[4])
        minute, _ := strconv.Atoi(match[5])

        return &Event{
            event: "sleep",
            id: ptr_last_event.id,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
        }
    }

    re = regexp.MustCompile("^\\[(\\d+)-(\\d+)-(\\d+) (\\d+):(\\d+)\\] wakes up$")
    match = re.FindStringSubmatch(line)
    if (len(match) != 0) {
        year, _ := strconv.Atoi(match[1])
        month, _ := strconv.Atoi(match[2])
        day, _ := strconv.Atoi(match[3])
        hour, _ := strconv.Atoi(match[4])
        minute, _ := strconv.Atoi(match[5])

        return &Event{
            event: "wake",
            id: ptr_last_event.id,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
        }
    }


    return nil
}

func main() {
    dat, err := ioutil.ReadFile("data.dat")
    check(err)

    events := []Event {}
    ptr_prev_event := (*Event) (nil)

    lines := strings.Split(string(dat), "\n")
    for _, line := range lines {
        ptr_this_event := parse_event(line, ptr_prev_event)
        if (ptr_this_event != nil) {
            events = append(events, *ptr_this_event)
            ptr_prev_event = ptr_this_event
        }
    }

    for ex, event := range events {
        fmt.Printf("Event: %v\n", ex, event)
    }

    /*
    used := map[string]int {}

    for sqx, event := range events {
        fmt.Printf("Event: %v\n", sqx)
        for _, point := range expand_square(event) {
            used[point] += 1
        }
    }

    count := 0
    for _, value := range used {
        if value >= 2 {
            count += 1
        }
    }

    */
    fmt.Printf("%v\n", 0)
}

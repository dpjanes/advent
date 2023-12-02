import io
import re

def part1(fin):
    sum = 0
    for line in fin:
        line = re.sub("[^0-9]", "", line)
        value = line[:1] + line[-1:]
        value = int(value)
        sum += value

    print(sum)

def part2(data):
    sum = 0
    for line in fin:
        parts = []
        for index, _ in enumerate(line):
            m = re.match("^([0-9]|one|two|three|four|five|six|seven|eight|nine)", line[index:])
            if m:
                parts.append(m[1])

        parts = [ parts[0], parts[-1], ]
        for x in range(2):
            if parts[x] == "one": parts[x] = 1
            elif parts[x] == "two": parts[x] = 2
            elif parts[x] == "three": parts[x] = 3
            elif parts[x] == "four": parts[x] = 4
            elif parts[x] == "five": parts[x] = 5
            elif parts[x] == "six": parts[x] = 6
            elif parts[x] == "seven": parts[x] = 7
            elif parts[x] == "eight": parts[x] = 8
            elif parts[x] == "nine": parts[x] = 9
            else: parts[x] = int(parts[x])

        value = parts[0] * 10 + parts[1]
        sum += value

    print(sum)

FILE = "day01-sample.dat"
FILE = "day01-sample2.dat"
FILE = "day01.dat"
print("===")
with open(FILE, "r") as fin:
    part2(fin)

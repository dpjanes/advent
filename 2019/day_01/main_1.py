## https://adventofcode.com/2019/day/1

def fuel(n):
    return n // 3 - 2

with open("data.dat") as fin:
    total = 0

    for line in fin:
        total += fuel(int(line.strip()))

    print total

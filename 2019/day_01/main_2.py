## https://adventofcode.com/2019/day/1

def fuel(n):
    return n // 3 - 2

def nfuel(n):
    total = 0

    while True:
        n = fuel(n)
        if n <= 0:
            break

        total += n

    return total

with open("data.dat") as fin:
    total = 0

    for line in fin:
        total += nfuel(int(line.strip()))

    print total

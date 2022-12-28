import os
import pprint

def main(filename, part):
    instructions = []
    with open(filename) as fin:
        for line in fin.read().splitlines():
            match line.split(" "):
                case [ "noop", ]:
                    instructions.append(("noop",0,1))
                case [ "addx", value ]:
                    value = int(value)
                    instructions.append(("addx",value,2))

    if part == 1:
        def emit(cycle, X):
            if (cycle - 20) % 40 == 0:
                ## print(cycle, cycle * X)
                return cycle * X
            else:
                return 0

        X = 1
        cycle = 0
        total = 0
        for op, value, cycles in instructions:
            for x in range(cycles):
                cycle += 1
                total += emit(cycle, X)

                if x == cycles - 1 and op == "addx":
                    X += value

        total += emit(cycle+1, X)
        print(total)


            
        pass
    elif part == 2:
        pass


if __name__ == "__main__":
    main("day_10.dat", 1)


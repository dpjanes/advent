import re 
import sys
from functools import reduce
import operator

def is_number(s: str) -> bool:
    try:
        int(s)
        return True
    except ValueError:
        return False

def xform(inputs: list[str]) -> list[int]:
    # print("------")
    # print(inputs)
    results = []
    for x in range(len(inputs[0])):
        result = ""
        for row in inputs:
            result += row[x]

        result = result.strip()
        if not result:
            continue

        results.append(int(result))

    # print(results)
    # return [0]
    return results

def main(filename: str):
    ACCUM = []

    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip("\n")

    positions = [i for i, ch in enumerate(line) if ch in [ "*", "+" ]]
    positions.append(len(line)+1)

    sum = 0
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip("\n")
            if not line:
                continue

            parts = []
            for posx in range(len(positions)-1):
                start = positions[posx]
                end = positions[posx+1]
                parts.append(line[start:end])

            # print(parts)
            # return

            if not ACCUM:
                ACCUM = [[] for _ in parts]

            if "*" not in line:
                for px, part in enumerate(parts):
                    ACCUM[px].append(part)
            else:
                for px, op in enumerate(parts):
                    op = op.strip()
                    if op == "+":
                        op = operator.add
                    elif op == "*":
                        op = operator.mul
                    else:
                        raise ValueError(f"Unknown operator: {op}")
                    
                    row = ACCUM[px]
                    nrow = xform(row)
                    
                    sum += reduce(op, nrow)

                break

    # print(ACCUM)



    print(sum)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
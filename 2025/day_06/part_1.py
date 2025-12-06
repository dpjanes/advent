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

ACCUM = []

def main(filename: str):
    sum = 0
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()
            if not line:
                continue

            parts = line.split()
            if is_number(parts[0]):
                for px, part in enumerate(parts):
                    if len(ACCUM) <= px:
                        ACCUM.append([])

                    ACCUM[px].append(int(part))
            else:
                for px, op in enumerate(parts):
                    if op == "+":
                        op = operator.add
                    elif op == "*":
                        op = operator.mul
                    else:
                        raise ValueError(f"Unknown operator: {op}")
                    
                    # print(op, ACCUM[px])
                    sum += reduce(op, ACCUM[px])

    # print(ACCUM)



    print(sum)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
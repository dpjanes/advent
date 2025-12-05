import re 
import sys

DB: list[list[int, int]] = []

def main(filename: str):
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()
            if not line:
                continue

            parts = line.split("-")
            if len(parts) == 2:
                DB.append([ int(parts[0]), int(parts[1])])

    DB.sort()

    merged: list[list[int, int]] = []
    current = DB[0]
    merged.append(current)

    for a, b in DB[1:]:
        if a <= current[1]:
            current[1] = max(current[1], b)
        else:
            current = [a, b]
            merged.append(current)

    sum = 0
    for a, b in merged:
        print(a, b, b - a + 1)
        sum += b - a + 1

    print(sum)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
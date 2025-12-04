import re 
import sys

DB: set[bool] = set()
AROUND = [
    (-1, -1), (-1, 0), (-1, 1),
    (0, -1),          (0, 1),
    (1, -1),  (1, 0),  (1, 1),
]

def main(filename: str):
    rows = 0
    cols = 0
    with open(filename, 'r') as fin:
        row = 0
        for line in fin:
            line = line.strip()
            if not line:
                continue

            row += 1
            for x, ch in enumerate(line):
                if ch == '@':
                    DB.add((row, x + 1))

                cols = x + 1

            rows = row

    sum = 0

    while True:
        removals = set()

        for row in range(1, rows + 1):
            for col in range(1, cols + 1):
                if (row, col) not in DB:
                    continue

                count = 0
                for dr, dc in AROUND:
                    nr, nc = row + dr, col + dc
                    if (nr, nc) in DB:
                        count += 1

                if count < 4:
                    sum += 1
                    removals.add((row, col))
        
        if not removals:
            break

        for item in removals:
            DB.remove(item)

    # print(rows, cols)
    # print(DB)
    print(sum)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
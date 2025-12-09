import re 
import sys

DB: set[tuple[int, int]] = set()
ROW_DB: dict[int, list[tuple[int, int]]] = {}
COL_DB: dict[int, list[tuple[int, int]]] = {}

def main(filename: str):
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()
            parts = line.split(',')
            if len(parts) != 2:
                continue

            col, row = map(int, parts)
            DB.add((col, row))

            ROW_DB.setdefault(row, []).append((col, row))
            COL_DB.setdefault(col, []).append((col, row))

    for val in ROW_DB.values():
        val.sort()
    for val in COL_DB.values():
        val.sort(key=lambda x: x[1])

    biggest = 0
    biggest_a = None
    biggest_b = None
    for a in DB:
        for b in DB:
            if a == b:
                continue

            col_diff = abs(a[0] - b[0]) + 1
            row_diff = abs(a[1] - b[1]) + 1
            size = col_diff * row_diff
            # print(a, b, size)
            if size < biggest:
                continue

            biggest = size
            biggest_a = a
            biggest_b = b

    # print(ROW_DB)
    print(biggest)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
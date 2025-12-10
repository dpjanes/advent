import re 
import sys
from util import print_quad_grid, print_grid

DB: set[tuple[int, int]] = set()
ROW_DB: dict[int, list[int]] = {}

def main(filename: str):
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()
            parts = line.split(',')
            if len(parts) != 2:
                continue

            col, row = map(int, parts)
            DB.add((col, row))
            ROW_DB.setdefault(row, []).append(col)

    for val in ROW_DB.values():
        val.sort()

    min_row = min(ROW_DB.keys())
    max_row = max(ROW_DB.keys())
    last_valid = ROW_DB[min_row]
    for row in range(min_row + 1, max_row):
        this_row = ROW_DB.get(row)
        if this_row is None:
            ROW_DB[row] = last_valid
        else:
            last_valid = this_row

    print(sorted(ROW_DB.items()))
    # return
    #
    #
    def is_in(col, row):
        row = ROW_DB.get(row) or {}
        return col in row
        return False
    
    print_grid(14, 12, is_in)
    
    return

    biggest = 0
    squares = len(DB) * len(DB)
    n = 0
    for ax, a in enumerate(DB):
        for bx, b in enumerate(DB):
            if bx > ax:
                continue

            if n % 10000 == 0:
                print(f"Progress: {n}/{squares} ({n/squares:.2%})")
            n += 1

            if a == b:
                continue

            col_diff = abs(a[0] - b[0]) + 1
            row_diff = abs(a[1] - b[1]) + 1
            size = col_diff * row_diff
            if size < biggest:
                continue

            debug = False
            if size == 50:
                debug = True

            if debug:
                print(f"Checking {a} to {b} => size {size}")
                print(min(a[1], b[1]), max(a[1], b[1]))

            overlap = False
            for row in range(min(a[1], b[1]), max(a[1], b[1]) + 1):
                col_min = min(a[0], b[0])
                col_max = max(a[0], b[0])
                actual_min, actual_max = ROW_DB[row]
                if debug:
                    print(f" Row {row}: cols {col_min}-{col_max} vs actual {actual_min}-{actual_max}")
                # if col_max < actual_min or col_min > actual_max:
                #     overlaps = False
                #     break

                if (col_max < actual_min or col_min > actual_max):
                    overlap = True
                    break
    
            if debug:
                print(f"  => overlap = {overlap}")
            if not overlap:
                continue

            biggest = size

    # print(ROW_DB)
    print(biggest)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 

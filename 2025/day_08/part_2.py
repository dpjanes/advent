import re 
import sys
import pprint

DB: dict[tuple[int, int, int], int] = {}

def main(filename: str) -> None:
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()
            parts = line.split(",")
            if len(parts) != 3:
                continue

            DB[(int(parts[0]), int(parts[1]), int(parts[2]))] = 0

    BOXES = list(DB.keys())
    SIZE = len(DB)
    DISTANCES: list[tuple[float, tuple[int, int, int], tuple[int, int, int]]] = []

    for x in range(SIZE):
        for y in range(SIZE):
            if y >= x:
                continue

            bx = BOXES[x]
            by = BOXES[y]
            dx = bx[0] - by[0]
            dy = bx[1] - by[1]
            dz = bx[2] - by[2]
            dist = (dx * dx + dy * dy + dz * dz) ** 0.5
            DISTANCES.append((int(dist), bx, by))

    DISTANCES.sort(reverse=True)
    # pprint.pprint(DISTANCES)
    # return
    # for dist in DISTANCES:
    #     print(dist)

    ZEROS = len(DB)
    CIRCUIT = 0
    while DISTANCES:
        bx, by = DISTANCES.pop()[1:]
        cx = DB[bx]
        cy = DB[by]
        print("--")
        print(f"{bx}={cx}")
        print(f"{by}={cy}")

        if cx == 0 and cy == 0:
            CIRCUIT += 1
            DB[bx] = CIRCUIT
            DB[by] = CIRCUIT
            ZEROS -= 2

            # print(f"[1] ASSIGNING {bx} and {by} to CIRCUIT {CIRCUIT}")
        elif cx and cy:
            CIRCUIT += 1
        elif cx:
            DB[by] = cx
            # print(f"[3] ASSIGNING {by} to CIRCUIT {cx} because of {bx}")
            ZEROS -= 1
        elif cy:
            DB[bx] = cy
            # print(f"[4] ASSIGNING {bx} to CIRCUIT {cy} because of {by}")
            ZEROS -= 1
        else:
            raise RuntimeError("Unreachable")
        
        print(f"ZEROS remaining: {ZEROS}")
        if ZEROS == 0:
            print("ANSWER", bx[0] * by[0])
            break

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
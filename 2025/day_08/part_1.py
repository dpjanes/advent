import re 
import sys
import pprint

DB: dict[tuple[int, int, int], int] = {}

def main(filename: str, n: int) -> None:
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

    DB_KEYS = list(DB.keys())
    CIRCUIT = 0
    for i in range(n):
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

            print(f"[1] ASSIGNING {bx} and {by} to CIRCUIT {CIRCUIT}")
        elif cx and cy:
            CIRCUIT += 1
            for bo, co in list(DB.items()):
                if co not in [ cx, cy ]:
                    continue

                DB[bo] = CIRCUIT
                print(f"[2] ASSIGNING {bo} CIRCUIT {CIRCUIT} (was {co})")
        elif cx:
            DB[by] = cx
            print(f"[3] ASSIGNING {by} to CIRCUIT {cx} because of {bx}")
        elif cy:
            DB[bx] = cy
            print(f"[4] ASSIGNING {bx} to CIRCUIT {cy} because of {by}")
        else:
            raise RuntimeError("Unreachable")


    accum: dict[int, int] = {}
    for key, co in DB.items():
        accum[co] = accum.get(co, 0) + 1

    values = []
    for key, co in accum.items():
        if key == 0:
            continue
        print(f"CIRCUIT {key}: {co} boxes")
        values.append(co)

    values.sort(reverse=True)
    print(values[:3])
    print("RESULT", values[0] * values[1] * values[2])

    # while True:

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: python {sys.argv[0]} <input_file> <n>")
        sys.exit(1)

    main(sys.argv[1], int(sys.argv[2]))
 
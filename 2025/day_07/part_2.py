import re 
import sys

def main(filename: str):
    ROWS: dict[int, set[int]] = dict()
    BEAMS: set[int] = set()

    y = 0
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()
            if not line:
                continue

            for chx, ch in enumerate(line):
                if ch == "S":
                    BEAMS.add(chx)
                elif ch == "^":
                    ROWS.setdefault(y, set()).add(chx)

            y += 1

    MAXY = y
    SOLVED: dict[tuple[int, int], int] = dict()

    def solve(beam_x, y) -> int:
        KEY = (beam_x, y)
        if KEY in SOLVED:
            return SOLVED[KEY]
        
        if y >= MAXY:
            return 1

        result = 0
        ROW = ROWS.get(y, set())
        if beam_x in ROW:
            result += solve(beam_x - 1, y + 1)
            result += solve(beam_x + 1, y + 1)
        else:
            result = solve(beam_x, y + 1)

        SOLVED[KEY] = result
        return result

    # print(ROWSS)
    # print(BEAMS)
    # print(ROWSS[2])
    # return

    worlds = 0
    for beam_x in BEAMS:
        worlds += solve(beam_x, 0)


    print(worlds)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
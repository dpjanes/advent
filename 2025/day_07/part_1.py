import re 
import sys

def main(filename: str):
    ROWSS: dict[int, set[int]] = dict()
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
                    ROWSS.setdefault(y, set()).add(chx)

            y += 1

    MAXY = y    

    # print(ROWSS)
    # print(BEAMS)
    # print(ROWSS[2])
    # return

    splits = 0
    for y in range(MAXY):
        # print("---", y)
        NBEAMS: set[int] = set()
        ROWS = ROWSS.get(y, set())
        # print(ROWS)
        for beam_x in BEAMS:
            # print("...", beam_x)
            if beam_x in ROWS:
                splits += 1
                NBEAMS.add(beam_x - 1)
                NBEAMS.add(beam_x + 1)
            else:
                NBEAMS.add(beam_x)
        BEAMS = NBEAMS


    print(splits)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
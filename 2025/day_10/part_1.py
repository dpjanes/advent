import re 
import sys
import dataclasses

'''
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}'''

@dataclasses.dataclass
class Row:
    lights: set[int] = dataclasses.field(default_factory=set)
    wirings: list[list[int]] = dataclasses.field(default_factory=list)
    joltages: list[int] = dataclasses.field(default_factory=list)

    @classmethod
    def from_line(cls, line: str) -> 'Row':
        line = line.strip()
        if not line:
            return None
        
        row = cls()
        
        parts = line.split()
        for part in parts:
            if part[0] == '[':
                part = part[1:-1]
                row.lights = {chx for chx, ch in enumerate(part) if ch == '#'}
            elif part[0] == '(':
                part = part[1:-1]
                row.wirings.append([int(x) for x in part.split(',')])
            elif part[0] == '{':
                part = part[1:-1]
                row.joltages = [int(x) for x in part.split(',')]

        return row

def main(filename: str):
    with open(filename, 'r') as fin:
        for line in fin:
            row = Row.from_line(line)
            if row is None:
                continue

            # print(line.strip())
            # print(row)
            # print()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
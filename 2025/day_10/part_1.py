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
    
def solve_depth_first(row: Row, state: set[int], wiring: list[int], steps: list[list[int]]) -> list[list[int]]:
    # print("X", wiring)
    state = set(state)
    for wx in wiring or []:
        if wx in state:
            state.remove(wx)
        else:
            state.add(wx)

    if state == row.lights:
        # print("Found solution:", wiring)
        return steps
    
    if len(steps) > 5:
        # print("Max depth reached")
        return

    for wiring in row.wirings:
        solution = solve_depth_first(row, state, wiring, steps + [ wiring ])
        if solution:
            return solution
        
def solve_breadth_first(row: Row) -> list[list[int]]:
    stack = [
        ( set(), [], [] )
    ]
    stack_index = 0
    while stack_index < len(stack):
        state, wiring, steps = stack[stack_index]
        stack_index += 1

        state = set(state)
        for wx in wiring:
            if wx in state:
                state.remove(wx)
            else:
                state.add(wx)

        if state == row.lights:
            return steps
        
        if len(steps) > 10:
            print("Max depth reached")
            continue

        for wiring in row.wirings:
            stack.append( ( state, wiring, steps + [ wiring ] ) )
    pass


def main(filename: str):
    rows: list[Row] = []
    with open(filename, 'r') as fin:
        for line in fin:
            row = Row.from_line(line)
            if row is None:
                continue

            rows.append(row)

    count = 0
    for row in rows:
        solution = solve_breadth_first(row)
        count += len(solution) if solution else 0
        print("Solution:", solution)

    print("Total count:", count)



            # print(line.strip())
            # print(row)
            # print()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
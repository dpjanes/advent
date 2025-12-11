import sys
import dataclasses
import itertools
import sympy as sp

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
        
def solve_breadth_first(row: Row) -> list[list[int]]:
    # wiring_plan = list(row.wirings)
    # wiring_plan.sort(key=lambda w: -sum(w))

    BEST_SOLUTION = None
    stack = [
        ( [ 0 ] * len(row.joltages), [], [] )
    ]
    seen = set()
    while stack:
        joltages, wiring, steps = stack.pop()
        if tuple(joltages) in seen:
            print("Already seen:", joltages)
            continue

        if BEST_SOLUTION and len(steps) > len(BEST_SOLUTION):
            continue

        joltages = list(joltages)
        stop = False
        for wx in wiring:
            joltages[wx] += 1
            if joltages[wx] > row.joltages[wx]:
                stop = True
                break

        if stop:
            continue

        # print(joltages, row.joltages, len(steps))
        if joltages == row.joltages:
            if not BEST_SOLUTION or len(steps) < len(BEST_SOLUTION):
                BEST_SOLUTION = list(steps)
                print("New best solution:", BEST_SOLUTION)

        seen.add( tuple(joltages) )

        # print(len(steps), len(BEST_SOLUTION) if BEST_SOLUTION else "N/A")
        
        if len(steps) > 40:
            # print("Max depth reached")
            continue

        for wiring in row.wirings:
            stack.append( ( joltages, wiring, steps + [ wiring ] ) )

    return BEST_SOLUTION

def osc():
    yield 0

    index = 1
    while index < 40:
        yield index
        yield -index

        index += 1


def solve_with_zero_free_params(wirings: list[list[int]], joltages: list[int]) -> list[int]:
    A = sp.Matrix(list(zip(*wirings)))
    b = sp.Matrix(joltages)

    sol, params = A.gauss_jordan_solve(b)
    if not params:
        return list(map(int, sol))

    for t in itertools.product(osc(), repeat=len(params)):
        subs_map = {p: v for p, v in zip(params, t)}   # params is a tuple of tau0, tau1, ...
        nsol = sol.subs(subs_map)

        result = list(map(int, nsol))

        ok = True
        for r in result:
            if r < 0:
                ok = False
                break

        if ok:
            return result

    print("NO SOLUTIONS")        
    return []

    # Substitute all free parameters with 0
    for x in range(0, 75):
        for y in range(0, 75):
            print("PARAMS", len(params), params)
            subs_map = {p: x for p in params}   # params is a tuple of tau0, tau1, ...
            if len(subs_map) > 1:
                subs_map[params[1]] = y
            nsol = sol.subs(subs_map)

            result = list(map(int, nsol))

            ok = True
            for r in result:
                if r < 0:
                    ok = False

            if ok:
                return result

            print("RETRY:", x, result, params, subs_map)


    print("NO SOLUTIONS")
    # raise RuntimeError("No solution found with non-negative integers")


    return result

def solve_new(row: Row) -> list[list[int]]:
    print()
    print("joltages:", row.joltages)
    print('wirings:')
    vss = []
    for wiring in row.wirings:
        vs = [ 0 ] * len(row.joltages)
        for wx in wiring:
            vs[wx] = 1

        vss.append(vs)
        print(" ", vs)

    result = solve_with_zero_free_params(vss, row.joltages)
    print("Result:", result, sum(result))
    return sum(result)

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
        solution = solve_new(row)
        count += solution or 0
        ## print("Solution:", solution, len(solution) if solution else "No solution")
        ## break

    print("Total count:", count)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
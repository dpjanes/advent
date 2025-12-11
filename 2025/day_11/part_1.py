import re 
import sys

DB: dict[str, str] = {}

def main(filename: str):
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()
            if not line:
                continue

            d_from, back = line.split(":", 1)
            d_tos = back.split()

            for d_to in d_tos:
                DB.setdefault(d_to, []).append(d_from)


    solved: dict[str, int] = {}

    def solve(d_to: str, seen: set):
        if d_to in seen:
            return 0
        
        if d_to in solved:
            return solved[d_to]

        if d_to == "you":
            return 1
        
        seen = seen | {d_to}
        
        result = 0
        for d_from in DB.get(d_to, []):
            result += solve(d_from, seen)

        solved[d_to] = result
        return result



    result = solve("out", set())
    print(result)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
import re 
import sys

DB: list[tuple[int, int]] = []

def main(filename: str):
    sum = 0
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()
            if not line:
                continue

            parts = line.split("-")
            if len(parts) == 2:
                DB.append((int(parts[0]), int(parts[1])))
                
            if len(parts) == 1:
                target = int(parts[0])
                for a, b in DB:
                    if a <= target <= b:
                        sum += 1
                        break


    print(sum)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
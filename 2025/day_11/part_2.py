import re 
import sys

def main(filename: str):
    sum = 0
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()


    print(sum)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
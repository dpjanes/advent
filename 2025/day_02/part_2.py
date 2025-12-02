import re 
import sys

pattern_re = r"^(\d+)-(\d+)"

def is_valid(number: int) -> bool:
    str_number = str(number)
    len_number = len(str_number)
    if len_number < 2:
        return True
    
    for split in range(1, len_number):
        if len_number % split != 0:
            continue

        ok = False
        seq = str_number[:split]
        for i in range(split, len_number, split):
            if str_number[i:i+split] != seq:
                ok = True
                break

        if not ok:
            return False


    
    return True

def main(filename: str):
    with open(filename, 'r') as fin:
        data = fin.read()

    invalid_sum = 0
    for chunk in data.split(","):
        chunk = chunk.strip()
        match = re.match(pattern_re, chunk.strip())
        first = int(match.group(1))
        last = int(match.group(2))
        print()
        print(f"First: {first}, Last: {last}")
        for i in range(first, last + 1):
            # print(f". {i}: {is_valid(i)}")
            if not is_valid(i):
                invalid_sum += i

        # break

    print(f"Sum of invalid numbers: {invalid_sum}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
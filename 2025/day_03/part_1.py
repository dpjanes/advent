import re 
import sys

def main(filename: str):
    sum = 0
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()
            numbers = [ int(n) for n in line ]
            first_digit = max(numbers[:-1])
            first_digit_index = numbers.index(first_digit)
            second_digit = max(numbers[first_digit_index + 1:])
            n = first_digit * 10 + second_digit
            sum += n
            # print(numbers, first_digit, second_digit)

    print(sum)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
import re 
import sys

SIZE = 12

def main(filename: str):
    sum = 0
    with open(filename, 'r') as fin:
        for line in fin:
            line = line.strip()
            numbers = [ int(n) for n in line ]

            result = []
            start = 0
            for i in range(1, SIZE + 1):
                remaining = SIZE - i
                head = numbers[start:len(numbers) - remaining]

                biggest = max(head)
                result.append(biggest)

                biggest_index = numbers.index(biggest, start)
                start = biggest_index + 1

            subsum = 0
            for d in result:
                subsum = subsum * 10 + d
            sum += subsum

            print("result", result, len(result))


    print(sum)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <input_file>")
        sys.exit(1)

    main(sys.argv[1])
 
import re 

instruction_re = r"^([LR])(\d+)"
def main(filename: str):
    position = 50
    zeros = 0
    with open(filename, 'r') as fin:
        for line in fin:
            match = re.match(instruction_re, line.strip())
            if not match:
                continue

            direction = match.group(1)
            distance = int(match.group(2))

            if direction == "L":
                for _ in range(distance):
                    position -= 1

                    if position == 0:
                        zeros += 1

                    if position < 0:
                        position += 100
            elif direction == "R":
                for _ in range(distance):
                    position += 1
                    if position == 100:
                        zeros += 1

                    if position >= 100:
                        position -= 100

            # print(position)

    print(f"Zeros: {zeros}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python part_1.py <input_file>")
        sys.exit(1)
    main(sys.argv[1])
 
import os
import pprint

EXPECT1 = [
    [ 1, 2, -3, 3, -2, 0, 4 ], 
    [ 2, 1, -3, 3, -2, 0, 4 ], 
    [ 1, -3, 2, 3, -2, 0, 4 ], 
    [ 1, 2, 3, -2, -3, 0, 4 ], 
    [ 1, 2, -2, -3, 0, 3, 4 ], 
    [ 1, 2, -3, 0, 3, 4, -2 ], 
    [ 1, 2, -3, 0, 3, 4, -2 ], 
    [ 1, 2, -3, 4, 0, 3, -2 ], 
    ]

def main(filename, part):
    input = []
    output = []
    with open(filename) as fin:
        for line in fin.read().splitlines():
            input.append(int(line))
            output.append(int(line))
            
    if part == 1:  
        print(input)
        iteration = 0
        for value in input:
            iteration += 1
            old_position = output.index(value)
            new_position = old_position
            new_position += value
            if value < 0:
                new_position -= 1
            new_position %= len(output)
            if value == 0:
                continue

            if old_position < new_position:
                output = output[:old_position] + output[old_position + 1:new_position + 1] + [value] + output[new_position + 1:]
                ## print(f"R {value}: {old_position} -> {new_position}: {output}")
            else:
                output = output[:new_position + 1] + [value] + output[new_position + 1:old_position] + output[old_position + 1:]
                ## print(f"L {value}: {old_position} -> {new_position}: {output}")

            """
            if output != EXPECT1[iteration]:
                print("ERROR - EXPECTED", EXPECT1[iteration])
                break
            """
            if len(input) != len(output):
                print("ERROR - SIZE")
                break

        x_zero = output.index(0)
        x_1000 = (x_zero + 1000) % len(output)
        x_2000 = (x_zero + 2000) % len(output)
        x_3000 = (x_zero + 3000) % len(output)
        print(output[x_1000], output[x_2000], output[x_3000])
        sum = output[x_1000] + output[x_2000] + output[x_3000]
        print(sum)
    elif part == 2:
        pass

if __name__ == "__main__":
    main("day_20.dat", 1)


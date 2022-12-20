import os
import pprint

def main(filename, part):
    fsd = {}
    sized = {}

    with open(filename) as fin:
        in_ls = False
        cwd = "/"
        
        for line in fin.read().splitlines():
            match line.split(" "):
                case [ "$", "cd", *parts ]:
                    in_ls = False
                    path = " ".join(parts)
                    cwd = os.path.abspath(os.path.join(cwd, path))
                case [ "$", "ls" ]:
                    in_ls = True
                case [ "$", _ ]:
                    in_ls = False
                case [ "dir", *parts ]:
                    if not in_ls:
                        continue
                        
                    fsd.setdefault(cwd, [])
                case [ number, *parts ]:
                    if not in_ls:
                        continue

                    fsd.setdefault(cwd, []).append(" ".join(parts))

                    path = os.path.join(cwd, " ".join(parts))
                    number = int(number)

                    while True:
                        sized.setdefault(path, 0)
                        sized[path] += number

                        if path == "/":
                            break

                        path = os.path.dirname(path)

    if part == 1:
        sum = 0
        for folder in fsd.keys():
            if sized[folder] <= 100000:
                sum += sized[folder]
                    
        print(sum)
    elif part == 2:
        fs_max = 70000000
        fs_free = 30000000
        fs_need = fs_max - fs_free
        fs_root = sized["/"]
        fs_delta = fs_root - fs_need

        best = None

        for folder in fsd.keys():
            if sized[folder] < fs_delta:
                continue

            if best is None:
                best = folder
            elif sized[folder] < sized[best]:
                best = folder

        print(best, sized[best])


if __name__ == "__main__":
    main("day_7.dat", 2)


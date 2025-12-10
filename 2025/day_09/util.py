QUADRANTS = {
    0:  " ",
    1:  "▘",
    2:  "▝",
    3:  "▀",
    4:  "▖",
    5:  "▌",
    6:  "▞",
    7:  "▛",
    8:  "▗",
    9:  "▚",
    10: "▐",
    11: "▜",
    12: "▟",
    13: "▙",
    14: "▜",
    15: "█",
}

def print_quad_grid(width, height, fn):
    """
    width, height = pixel dimensions
    fn(x, y) returns True/False for each pixel
    """
    # approximate height halved (2 rows → 1 character)
    for y in range(0, height, 2):
        row = []
        for x in range(0, width, 2):
            bits = 0
            # top-left
            if fn(x, y):
                bits |= 1
            # top-right
            if x + 1 < width and fn(x+1, y):
                bits |= 2
            # bottom-left
            if y + 1 < height and fn(x, y+1):
                bits |= 4
            # bottom-right
            if x + 1 < width and y + 1 < height and fn(x+1, y+1):
                bits |= 8

            row.append(QUADRANTS[bits])
        print("".join(row))

def print_grid(width, height, fn):
    for y in range(height):
        row = []
        for x in range(width):
            row.append("X" if fn(x, y) else ".")
        print("".join(row))

if __name__ == "__main__":
    def circle(x, y, cx=20, cy=12, r=10):
        return (x-cx)**2 + (y-cy)**2 <= r*r

    print_quad_grid(40, 24, circle)

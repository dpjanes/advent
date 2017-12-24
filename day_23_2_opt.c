#include <stdio.h>
#include <stdlib.h>
int main()
{
    int e = 0;
    int f = 0;
    int g = 0;
    int h = 0;

    int start = 65 * 100 + 100000;
    int end = start + 17000;

    for (int outer = start; outer <= end; outer += 17) {
        printf("%d/%d\n", outer, end);

        f = 1;

        for (int middle = 2; middle <= outer; middle++) {
            for (int inner = 2; inner <= outer; inner++) {
                g = middle * inner - outer;
                printf("middle=%d inner=%d outer=%d\n", middle, inner, outer);
                if (!g) {
                    exit(0);
                    f = 0;
                }
            }
        };

        if (!f) {
            h ++;
        }
    };
step32:
   printf("h: %d\n", h);
   return 0;
}

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int count = 0;
    int start = 65 * 100 + 100000;
    int end = start + 17000;

    for (int outer = start; outer <= end; outer += 17) {
        printf("%d/%d\n", outer, end);

        int is_prime = 1;

        for (int middle = 2; middle <= outer && is_prime; middle++) {
            for (int inner = 2; inner <= outer && is_prime; inner++) {
                if ((middle * inner - outer) == 0) {
                    is_prime = 0;
                }
            }
        }

        if (!is_prime) {
            count ++;
        }
    }

    printf("count: %d\n", count);
    return 0;
}

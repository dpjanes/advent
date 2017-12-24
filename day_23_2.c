
#include <stdio.h>
int main()
{
    int a = 0;
    int b = 0;
    int c = 0;
    int d = 0;
    int e = 0;
    int f = 0;
    int g = 0;
    int h = 0;
    int mul = 0;

    b = 65;
    c = b;
    if (a) goto step4;
    if (1) goto step8;
step4:
    b *= 100;
    mul++;
    b += 100000; 
    c = b;
    c += 17000; 
step8:
    f = 1;
    d = 2;
step10:
    e = 2;
step11:
    g = d;
    g *= e;
    mul++;
    g -= b; 
    if (g) goto step16;
    f = 0;
step16:
    e ++;
    g = e;
    g -= b; 
    if (g) goto step11;
    d ++;
    g = d;
    g -= b; 
    if (g) goto step10;
    if (f) goto step26;
    h ++;
step26:
    g = b;
    g -= c; 
    if (g) goto step30;
    if (1) goto step32;
step30:
    b += 17; 
    if (1) goto step8;
step32:
   printf("mul: %d\n", mul);
   printf("h: %d\n", h);
   return 0;
}

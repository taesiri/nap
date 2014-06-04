import math
import numpy as np
import matplotlib.pyplot as plt

a = 0
b = math.pi/2
h = 0.01
y0 = (1, 0, 0, 1)

def floatRange(start, stop, step):
    r = start
    while r < stop:
        yield r
        r+= step

def F(y):
    ko = -y[1] * pow(y[0]**2 + y[1]**2, -3/2.0)
    return (y[2], y[3], -y[0]*ko, -y[1]*ko)

def K1(y):
    return F(y)

def K2(y):
    k1 = K1(y)
    return F((y[0] + h/2*k1[0], y[1] + h/2*k1[1], y[2] + h/2*k1[2], y[3] + h/2*k1[3]))

def K3(y):
    k1 = K2(y)
    return F((y[0] + h/2*k1[0], y[1] + h/2*k1[1], y[2] + h/2*k1[2], y[3] + h/2*k1[3]))

def K4(y):
    k1 = K3(y)
    return F((y[0] + h*k1[0], y[1] + h*k1[1], y[2] + h*k1[2], y[3] + h*k1[3]))

def Ynp1(Yn, k1, k2, k3, k4):
    res = [0, 0, 0, 0]
    for i in range(4):
        res[i] = Yn[i] + 1/6.0*h*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i])
    return tuple(res)


finalResult = []
y = y0
x = []

for i in floatRange(a,b, h):
    x.append(i)
    print 'step ', int(i/h) + 1, ': ', y
    y = Ynp1(y, K1(y), K2(y), K3(y), K4(y))
    finalResult.append(Ynp1(y, K1(y), K2(y), K3(y), K4(y)))

def get_ith(iterable, index):
    if iterable :
        result = []
        for item in iterable:
            result.append(item[index])
        return result
    return None

plt.plot(x, get_ith(finalResult, 0), label = "$y_{1}(x)$")
plt.plot(x, get_ith(finalResult, 1), label = "$y_{2}(x)$")
plt.plot(x, get_ith(finalResult, 2), label = "$y_{3}(x)$")
plt.plot(x, get_ith(finalResult, 3), label = "$y_{4}(x)$")
plt.legend(loc='upper left')

plt.show()



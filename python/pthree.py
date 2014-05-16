# Third Project Using Python 
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties

N = 20
p = np.array([1.0, -1.0], dtype = float)
for n in range(2,N+1):
    p = np.append(p, [0.0]) - np.append([0.0], p*n)

print p
x = np.arange(1,21,dtype=float)
print x
z = np.polyval(p, x)
print z

xx = np.arange(0.5, 20.5, 0.05, dtype=float)
yy = np.zeros_like(xx)
for i in range(xx.size):
    y = np.polyval(p,xx[i])
    yy[i] = np.sign(y)*np.log(1.0 + abs(y))

zz = np.zeros_like(xx)

r = np.roots(p)
print '\nOriginal Wlkinson''s Roots:\n'
print r

# Let's do modification !

p[1] = p[1] - 10**-8

rm = np.roots(p)
print '\nModified Wilkinson''s Roots:\n'
print rm

xxm = np.arange(0.5, 20.5, 0.05, dtype=float)
yym = np.zeros_like(xxm)

for i in range(xxm.size):
    y = np.polyval(p,xxm[i])
    yym[i] = np.sign(y)*np.log(1.0 + abs(y))

zzm = np.zeros_like(xxm)

fig, ax = plt.subplots()
ax.plot(xx,yy , label='Wilkinson''s Polynomial')
ax.plot(xxm,yym , label='Modified - $C_{19} \\rightarrow C_{19} - 10^{-8}$')
ax.legend(loc='upper left')


plt.show()



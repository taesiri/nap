# Third Project Using Python 
import numpy as np
import matplotlib.pyplot as plt

N = 20
p = np.array([1.0, -1.0], dtype = float)
for n in range(2,N+1):
    p = np.append(p, [0.0]) - np.append([0.0], p*n)

x = np.arange(1,21)
print x
z = np.polyval(p, x)
print z


xx = np.arange(0.5, 20.5, 0.05, dtype=float)
yy = np.zeros_like(xx)
for i in range(xx.size):
    y = np.polyval(p,xx[i])
    yy[i] = np.sign(y)*np.log(1.0 + abs(y))

zz = np.zeros_like(xx)
plt.plot(xx,yy, xx,zz)
#title('Log of Wilkinson''s polynomial')
#xlabel('$x$')

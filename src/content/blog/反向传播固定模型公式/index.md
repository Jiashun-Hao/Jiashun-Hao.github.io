---
title: "反向传播固定模型公式"
description: "1： 初始化前向传播结果 首先，执行前向传播，计算每一层的激活值 A[L] 和线性输出 Z[L]，将这些中间结果存储起来，以便在反向传播时使用。 2：计算输出层"
publishDate: 2024-10-11
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/142859860
---
**1： 初始化前向传播结果**

首先，执行前向传播，计算每一层的激活值 A[L] 和线性输出 Z[L]，将这些中间结果存储起来，以便在反向传播时使用。

**2：计算输出层的损失函数的导数**  
如果是Sigmoid 激活函数  
dZ[l]=A[l]−YdZ^{\left[l\right]}=A^{\left[l\right]}-YdZ[l]=A[l]−Y

**3: 对每一层逐层向后计算梯度**

dW[l]=1mdZ[l]A[l−1]TdW^{\left[l\right]}=\frac{1}{m}dZ^{\left[l\right]}A^{\left[l-1\right]T}dW[l]=m1​dZ[l]A[l−1]T

db[l]=1mnp.sum(dz[l],axis=1,keepdims=True)db^{\left[l\right]}=\frac{1}{m}np.sum(dz^{\left[l\right]}, axis=1, keepdims=True)db[l]=m1​np.sum(dz[l],axis=1,keepdims=True)

dZ[1]=W[2]TdZ[2]∗g[1]′(Z[1])dZ^{\left[1\right]}=W^{\left[2\right]T}dZ^{\left[2\right]}\* g {[1]'} (Z ^ {[1]})dZ[1]=W[2]TdZ[2]∗g[1]′(Z[1])

**4: 若使用的tanh， 则g[1]′(Z[1])==(1−np.power(A1,2))g {[1]'} (Z ^ {[1]}) == (1 - np.power(A1, 2))g[1]′(Z[1])==(1−np.power(A1,2))**
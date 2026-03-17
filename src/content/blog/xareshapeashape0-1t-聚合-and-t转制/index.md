---
title: "x=a.reshape(a.shape[0],-1).T （聚合 and T转制）"
description: "x=a.reshape(a.shape[0],-1).T 一般矩阵里面的.shape[0]是第一个元素，代表有多少样本。后面的则是每一个样本的详细参数。 res"
publishDate: 2024-10-09
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/142793625
---

**x=a.reshape(a.shape[0],-1).T**

一般矩阵里面的.shape[0]是第一个元素，代表有多少样本。后面的则是每一个样本的详细参数。

reshape(a.shape[0],-1) 命令中的reshape(？，？)，已经规定了这个矩阵将被重新组合为一个二维数组（两个参数）

第一个参数：a.shape[0]，即保持原来的第一个参数不变  
第二个参数：-1，这个特殊的参数告诉 numpy 自动计算 -1 代表的维度的大小，以确保总元素数保持不变。也就是说，除了第一个维度外，其他的元素会被**展平（flatten）**，形成一个二维数组。

```
import numpy as np
# 创建一个形状为 (10, 28, 28) 的数组
a = np.random.rand(10, 28, 28)

# 将数据展平成二维，并转置
x = a.reshape(a.shape[0], -1)
print(x.shape)  # 输出形状
#(10,784)

x=x.T
print(x.shape)  # 输出形状
#(784,10)
```
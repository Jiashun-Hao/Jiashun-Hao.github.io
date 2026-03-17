---
title: "反向传播固定模型公式"
date: "最新推荐文章于 2026-03-16 21:50:31 发布"
source: "https://blog.csdn.net/HJS1453100406/article/details/142859860"
tags:
  - #python
  - #机器学习
  - #开发语言
---

**1： 初始化前向传播结果**

首先，执行前向传播，计算每一层的激活值 A[L] 和线性输出 Z[L]，将这些中间结果存储起来，以便在反向传播时使用。

**2：计算输出层的损失函数的导数**  
如果是Sigmoid 激活函数  
FORMULA\_PLACEHOLDER\_0\_END

**3: 对每一层逐层向后计算梯度**

FORMULA\_PLACEHOLDER\_11\_END

FORMULA\_PLACEHOLDER\_26\_END

FORMULA\_PLACEHOLDER\_57\_END

**4: 若使用的tanh， 则FORMULA\_PLACEHOLDER\_70\_END**

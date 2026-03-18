---
title: "Deep Learning反向传播固定模型公式"
publishDate: 2024-10-11
tags:
  - 'python'
  - '机器学习'
  - '开发语言'
description: '反向传播固定公式'
language: 'Chinese'
---

**1： 初始化前向传播结果**

首先，执行前向传播，计算每一层的激活值 A[L] 和线性输出 Z[L]，将这些中间结果存储起来，以便在反向传播时使用。


**2：计算输出层的损失函数的导数**
如果是Sigmoid 激活函数
$$dZ^{\left[l\right]}=A^{\left[l\right]}-Y$$

**3: 对每一层逐层向后计算梯度**

$$dW^{\left[l\right]}=\frac{1}{m}dZ^{\left[l\right]}A^{\left[l-1\right]T}$$

$$db^{\left[l\right]}=\frac{1}{m}np.sum(dz^{\left[l\right]}, axis=1, keepdims=True)$$

$$dZ^{\left[1\right]}=W^{\left[2\right]T}dZ^{\left[2\right]}* g {[1]'} (Z ^ {[1]})$$

**4: 若使用的tanh， 则$g {[1]'} (Z ^ {[1]}) == (1 - np.power(A1, 2))$**

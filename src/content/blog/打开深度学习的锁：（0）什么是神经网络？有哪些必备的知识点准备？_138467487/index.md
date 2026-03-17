---
title: "打开深度学习的锁：（0）什么是神经网络？有哪些必备的知识点准备？"
date: "已于 2024-12-06 14:06:35 修改"
source: "https://blog.csdn.net/HJS1453100406/article/details/138467487"
tags:
  - #深度学习
  - #神经网络
  - #人工智能
---

PS：每每温故必而知新

#### 什么是神经网络？

- [一、一个单神经元的神经网络](#_3)
- [二、多个单神经元的神经网络](#_32)
- [三、到底什么是机器学习？（重点）](#_58)
- - [1：什么是机器学习的训练？](#1_59)
  - [2：什么是模型？权重FORMULA\_PLACEHOLDER\_0\_END和偏差FORMULA\_PLACEHOLDER\_5\_END又是什么？](#2Wb_68)
  - - [FORMULA\_PLACEHOLDER\_10\_END：输入特征的权重](#W_69)
    - [FORMULA\_PLACEHOLDER\_15\_END：每一个神经元的专属偏差](#b_81)
  - [3：神经元的里面是什么？](#3_100)
  - - [神经元里的基础函数：线性变换函数](#_101)
    - [神经元里为了多样化任务的函数：激活函数](#_107)
- [四、损失函数和代价函数](#_149)
- - [1.标签和预测](#1_152)
  - [2.损失函数](#2_170)
  - [3.代价函数（Cost Function）](#3Cost_Function_201)
- [五、梯度下降](#_234)
- - [1：什么是导数？能做什么？](#1_243)
  - [2: 梯度下降:FORMULA\_PLACEHOLDER\_20\_END和FORMULA\_PLACEHOLDER\_25\_END的更新](#2_wb_288)
- [六、反向传播](#_320)
- - [什么是反向传播？为什么要有反向传播？](#_321)
  - [链式法则](#_341)
- [七、常用函数 of Python](#_of_Python_370)
- - [0：关于矩阵乘法](#0_375)
  - - [1：两个一维数组（向量）：](#1_380)
    - [2：一维数组和二维数组的乘积:](#2_387)
    - [3：两个二维数组的乘积](#3_410)
  - [1：向量化：np.dot ()](#1npdot__424)
  - [2：指数计算：FORMULA\_PLACEHOLDER\_30\_END](#2exnpexpa_447)
  - [3：矩阵内部求和：FORMULA\_PLACEHOLDER\_42\_END](#3Psumaxis0_473)
  - [4：重新构建/确保数组形状：FORMULA\_PLACEHOLDER\_54\_END // 最好经常使用！！](#4Preshape___490)
- [八、编写代码时的笔记](#_569)
- - [1：原始数组维度和计算公式](#1_574)
  - - [FORMULA\_PLACEHOLDER\_63\_END：样本数组维度/输入数据维度](#X_575)
    - [FORMULA\_PLACEHOLDER\_68\_END/ FORMULA\_PLACEHOLDER\_73\_END：标签/预测数组维度 ==（二分类）==](#Y_hat_Y__579)
    - [FORMULA\_PLACEHOLDER\_78\_END：权重维度，作用于每一个输入（输入层接受的是“特征” FORMULA\_PLACEHOLDER\_83\_END，之后的层是前一个层的输出“预测”FORMULA\_PLACEHOLDER\_89\_END）](#W_x_ia_i_583)
    - [FORMULA\_PLACEHOLDER\_95\_END：偏差维度，作用于每一个神经元，一个神经元一个偏差 FORMULA\_PLACEHOLDER\_100\_END](#b_b_587)
    - [FORMULA\_PLACEHOLDER\_105\_END：线性函数的输出值，作用于每一个神经元，一个神经元一个 FORMULA\_PLACEHOLDER\_110\_END 结果](#Z_Z__590)
    - [FORMULA\_PLACEHOLDER\_115\_END：激活函数的输出值，作用于每一个神经元，一个神经元一个 FORMULA\_PLACEHOLDER\_120\_END 结果，就是“预测”](#A_A__598)
  - [2：偏导数数组维度和计算公式](#2_607)
  - - [FORMULA\_PLACEHOLDER\_125\_END：损失函数 FORMULA\_PLACEHOLDER\_131\_END 对于线性函数FORMULA\_PLACEHOLDER\_136\_END的偏导](#dZ_L_Z_608)
    - [FORMULA\_PLACEHOLDER\_141\_END：损失函数 FORMULA\_PLACEHOLDER\_147\_END 对于权重FORMULA\_PLACEHOLDER\_152\_END的偏导](#dW_L_W_612)
    - [FORMULA\_PLACEHOLDER\_157\_END：损失函数 FORMULA\_PLACEHOLDER\_163\_END 对于权重FORMULA\_PLACEHOLDER\_168\_END的偏导](#db_L_b_616)
- [？、什么是深度学习？](#_624)

## 一、一个单神经元的神经网络

深度学习中的神经网络是一种受人脑结构启发的算法模型，主要用于模拟人脑处理和学习信息的方式。这种网络包括多层的 **“神经元”** 节点。

**每个节点都是一个计算单元，它们通过层与层之间的连接互相传递信息。**

**每个连接都有一个权重，这些权重在学习过程中会不断更新，以帮助网络更好地完成特定任务，如图像识别、语音理解或文本翻译。**

神经网络的基本组成包括：

1. **输入层**：接收原始数据输入，如图像的像素值、音频信号或文本数据。
2. **隐藏层**：一个或多个，负责从输入中提取特征。每个隐藏层都会将前一层的输出作为输入，通过激活函数进一步处理这些数据。
3. **输出层**：生成最终的输出，如分类任务中的类别标签。

举个简单的例子：我们希望预测**房间大小**和**房价**之间的关系。

假设我们有6个房价变化和房间大小变化的数据，我们把它们放在一个直角坐标系上。

![在这里插入图片描述](images/blog_migrate_fcba475c343b5e76dd866e411b4ffe55_png.png)  
 我们希望通过六个数据的信息，找到一个 **“房间大小和房价的关系函数”**。  
 当我们获得这个 “函数” ，我们只需要输入 **房间大小** 就可以计算出对应的 **房价** 。

对于这个简单的任务，函数即是初始为0的一个线性回归函数（X轴为房间大小，Y为价格）。

![在这里插入图片描述](images/blog_migrate_49a5a73392dd6c3eea696a9281665585_png.png)  
 进一步，我们把这个 **“房间大小和房价的关系函数”** 抽象成一个小圆点，当输出**房间大小X**的时候，我们会得到一个对应的**房价Y**  
 ![在这里插入图片描述](images/blog_migrate_12fa2243cbfb82ede7e2e627db9ce6d9_png.png)

所以这个小圆点，就是神经网络中的一个 “神经元（Neurons）”  
 ![在这里插入图片描述](images/blog_migrate_b2ce8f0f720b816c0102beacadfb1227_png.png)

## 二、多个单神经元的神经网络

之前的输入数据，只有一个简单的"房子大小X". 即我们只需要考虑房子大小对于房价的影响。  
 那么，如果存在多个因素，比如*房子的房间数*、*房子处于的地段位置*、*房子的使用寿命*等…

这些考虑因素，输入数据中的 **属性** 或组成部分，在机器学习中叫 特征（Feature）。

假设，对于 **每一个房子**，现在我们要输入的特征有四个，分别是房子的大小（Size）、房间数量（Bedrooms）、房子的位置（Position）、周边富裕情况（Wealth）

![在这里插入图片描述](images/blog_migrate_552359b48406d174352a1cbc7d74e953_png.png)  
 接下来，我们可以根据 **每一个房子** 的Size和Bedrooms，学习到一个函数（“小圆点/ 神经元”），来预测房子可以容纳人口的数量（Familys）

![在这里插入图片描述](images/blog_migrate_06abb19cb556c51d138f6b98cb1c9ce0_png.png)  
 然后，我们可以根据 **每一个房子** 的Position，来预测房子的交通是否便利（Convenience）

![在这里插入图片描述](images/blog_migrate_6bc14a0b3ff5777c1cf69e8c10eebe06_png.png)  
 然后，我们也可以根据 **每一个房子** 的Position和Wealth来预测附近的教学质量（School）

![在这里插入图片描述](images/blog_migrate_0eedaece2dcedaae62204c2902d12fdb_png.png)  
 最后，我们可以通过 **每一个房子** 的人口的数量（Familys）、便利程度（Convenience）、教学质量（School）来学习到一个函数（“小圆点/ 神经元”），来预测 **每一个房子** 的价格。  
 ![在这里插入图片描述](images/blog_migrate_dbfe71c9d6c8d154d93b9f82bb8de1cd_png.png)  
 对于输入的，**每一个房子** 的四个原始特征，记作X。  
 对于最后得到的 **每一个房子** 的预测价格，记作Y

![在这里插入图片描述](images/blog_migrate_5b6664957b21c8d7b42d9f7795f938ca_png.png)

## 三、到底什么是机器学习？（重点）

### 1：什么是机器学习的训练？

1：我们需要搭建好神经网络的框架，设定好有多少层，每一层有多少神经元。  
 2：我们需要给每一个神经元设置一个固定的公式，和两个可变的参数（权重FORMULA\_PLACEHOLDER\_173\_END和偏差FORMULA\_PLACEHOLDER\_178\_END）  
 3：向这个框架给定 **训练数据集中的每一个数据的多个特征X**，然后也给定 **每一个数据的希望预测结果Y**  
 4：然后计算机就会根据“输入数据”和“理想结果”，自动学习 “怎么调节权重FORMULA\_PLACEHOLDER\_183\_END和偏差FORMULA\_PLACEHOLDER\_188\_END，可以使X变成Y？"

找权重FORMULA\_PLACEHOLDER\_193\_END和偏差FORMULA\_PLACEHOLDER\_198\_END的过程，就称为训练！

### 2：什么是模型？权重FORMULA\_PLACEHOLDER\_203\_END和偏差FORMULA\_PLACEHOLDER\_208\_END又是什么？

#### FORMULA\_PLACEHOLDER\_213\_END：输入特征的权重

微观到每一个神经元来看，它们接受的输入的 **训练数据集中的每一个数据的多个特征** FORMULA\_PLACEHOLDER\_218\_END，对于这**多个特征**，我们需要知道每一个输入特征在预测输出中的贡献大小。

哪些对于渴望的预测是是重要的，哪些是不重要的？  
 ![在这里插入图片描述](images/blog_migrate_57ef63c201b5ced8fa7d4909fcd44c3c_png.png)

在每一个神经元中，我们给接收到的每一个特征一个自己的可变的权重，也就是FORMULA\_PLACEHOLDER\_223\_END

通过“学习”，模型可以自动增大对于渴望的预测有利的特征的权重，  
 通过“学习”，模型可以自动减小对于渴望的预测有利的特征的权重，

所以可以说，权重FORMULA\_PLACEHOLDER\_228\_END是作用于**每一个神经元**接收的**多个输入的特征上**。

#### FORMULA\_PLACEHOLDER\_233\_END：每一个神经元的专属偏差

如果，无论怎么调整输入特征的权重，得到的计算公式还是不能把数据拟合成我们理想的输出该怎么办呢？  
 这个时候，我们可以引入偏差FORMULA\_PLACEHOLDER\_238\_END，来**辅助权重**FORMULA\_PLACEHOLDER\_243\_END调整神经元中的公式。

在每一个神经元中，权重FORMULA\_PLACEHOLDER\_248\_END的个数等于输入的特征的个数，即每一个特征都有一个自己的权重来微调。  
 而对于每一个神经元，有且只有一个单独的FORMULA\_PLACEHOLDER\_253\_END，用来直接调控当前神经元（当前的计算公式）。

此外，偏差的引入还有以下好处：

1. 增加偏移能力  
    假设一个线性模型没有偏差项，即模型的表达式为 ( y = Wx )，其中 ( W ) 是权重，( x ) 是输入。这种模型限制了输出 ( y ) 必须通过原点，即当 ( x = 0 ) 时 ( y ) 也必须为 0。这种限制减少了模型的灵活性，因为现实世界的数据往往不是完全通过原点的。引入偏差 ( b )（即 ( y = Wx + b )）可以允许输出有一个基线偏移，无论输入 ( x ) 的值如何。
2. 适应数据偏差  
    实际数据往往包含不同的偏差，如数据集整体可能偏向某个数值。没有偏差项的模型可能很难适应这种类型的数据结构，因为模型无法通过简单的权重调整来补偿这种偏向。偏差项可以帮助模型更好地适应数据的中心位置或其他统计特征。
3. 提高非线性  
    在包含非线性激活函数的神经网络中，每个神经元的输出不仅取决于加权输入和偏差，还取决于激活函数如何处理这个加权和。偏差可以调整在激活函数中加权和的位置，从而影响激活函数的激活状态。这种调整是非常重要的，因为它可以帮助网络捕捉更复杂的模式和关系。
4. 增加决策边界的灵活性  
    在分类问题中，决策边界是模型用来区分不同类别的界限。==如果没有偏差项，模型的决策边界可能只能是通过原点的直线或超平面，这大大限制了模型的有效性。==通过引入偏差，模型的决策边界可以是任意位置的直线或超平面，这大大提高了模型解决实际问题的能力。

### 3：神经元的里面是什么？

#### 神经元里的基础函数：线性变换函数

在深度学习中，每一个神经单元（通常称为神经元或单元）的基础，都是执行一个**线性变换函数**。  
 即：  
 FORMULA\_PLACEHOLDER\_258\_END  
 其中, FORMULA\_PLACEHOLDER\_267\_END 是权重, FORMULA\_PLACEHOLDER\_272\_END 是偏置, FORMULA\_PLACEHOLDER\_277\_END**是输入数据或前一层的输出**, FORMULA\_PLACEHOLDER\_282\_END是得到的预测结果。  
 ![在这里插入图片描述](images/blog_migrate_0029d859788c571d11c7089b2cae96e1_png.png)

#### 神经元里为了多样化任务的函数：激活函数

可以看到，线性变化的范围，FORMULA\_PLACEHOLDER\_287\_END和FORMULA\_PLACEHOLDER\_292\_END成正比，无限增长或无限缩小。  
 单单依靠这简单的线性变化，无法满足多样的需求。

因此，我们需要在这个线性变化函数的外面嵌套一个函数，这样的函数也成为激活函数（Activation Function）。

那什么又是嵌套呢？即,将**线性变化函数的输出**结果，作为激活函数的输入值。

举例：

对于**逻辑回归任务**，即预测一个事件发生的概率，有**发生**和**不发生**两种情况（二分类任务）  
 如果我们只是使用简单的线性变化函数，得到的得到的结果、输入FORMULA\_PLACEHOLDER\_297\_END和输出FORMULA\_PLACEHOLDER\_302\_END的关系可能是这样（假设不考虑 FORMULA\_PLACEHOLDER\_307\_END和FORMULA\_PLACEHOLDER\_312\_END）

![在这里插入图片描述](images/blog_migrate_80a7a26b4a7ddf63e77c918d77f49076_png.png)  
 X有5种类型的输人，Y也有5种类型的输出，这样怎么判断事件发生的概率是**发生了**还是**不发生**呢？

聪明的小朋友也许想到了，我们可以以数字4为分界线，大于4的视为**发生了**，小于4的视为**不发生**。

在机器学习种，有一个思路和这样一模一样的函数专门应用于逻辑回归任务，即**sigmoid函数**。

对于它，只需要明白两点。

1. 无论输入大小，它的输出范围：[0,1]，它的图像是这样

![在这里插入图片描述](images/blog_migrate_a7795b3e148e1c24ad9eb78ae74d2a8c_png.png)  
 2. 公式如下：  
 FORMULA\_PLACEHOLDER\_317\_END  
 这个时候，我们就可以把得到的线性变化函数结果FORMULA\_PLACEHOLDER\_325\_END放到sigmoid函数里面— 或者直接将线性变化函数与sigmoid函数合并计算：

FORMULA\_PLACEHOLDER\_330\_END

那么得到的输出结果可能就是这样：  
 ![在这里插入图片描述](images/blog_migrate_3883a0a023f3083811c39a3563cd8745_png.png)

这里的**sigmoid函数**，即嵌套在线性函数外面用于多样化功能的函数，就叫激活函数.

## 四、损失函数和代价函数

在深度学习中，尤其是涉及到损失函数和激活函数时，**使用的对数通常是自然对数，即以 FORMULA\_PLACEHOLDER\_340\_END 为底的对数**

### 1.标签和预测

在监督学习中，每一个输入的训练数据都有一个自己对应的标签（label），也就是我们希望数据对应的预测结果。

比如，我们想区分猫和狗

用 1 来标记“猫”，用 0 来标记“狗”，此时 1 就是数据“猫”的标签， 0 就是“狗”的标签。

FORMULA\_PLACEHOLDER\_345\_END在深度学习中有一个专门的符号，即 FORMULA\_PLACEHOLDER\_349\_END。

当我们在模型使用/测试阶段的时候，我们会把“猫”和“狗”这俩个数据输入到模型中，让模型来捕获它们的信息给出预测， 那什么是预测呢？

FORMULA\_PLACEHOLDER\_354\_END，即是模型对于当前数据接近正类的概率，即是否为1的概率，在深度学习中也有一个专门的符号，即 FORMULA\_PLACEHOLDER\_358\_END。

比如模型的识别度很高的话，

也许模型识别“猫”的概率为0.9，即FORMULA\_PLACEHOLDER\_363\_END=0.9, 与“正类” 1 相近，归类为1。  
 也许模型识别“狗”的概率为0.1，即FORMULA\_PLACEHOLDER\_368\_END=0.1, 与“正类” 1 相远，归类为0。

### 2.损失函数

所谓损失呢，就是判断预测值 FORMULA\_PLACEHOLDER\_373\_END 和标签 FORMULA\_PLACEHOLDER\_378\_END 相差多少。

我们已经知道机器学习就是学习权重FORMULA\_PLACEHOLDER\_383\_END和偏差FORMULA\_PLACEHOLDER\_388\_END，而损失函数就是为调整权重FORMULA\_PLACEHOLDER\_393\_END和偏差FORMULA\_PLACEHOLDER\_398\_END提供指导。

损失函数的公式如下：

FORMULA\_PLACEHOLDER\_403\_END

这个公式非常巧妙，如果测值 FORMULA\_PLACEHOLDER\_419\_END 和标签 FORMULA\_PLACEHOLDER\_424\_END相差大，那么损失值 FORMULA\_PLACEHOLDER\_429\_END 会特别大，反之会特别小。我们来验证一下。

前提补充：  
 FORMULA\_PLACEHOLDER\_435\_END  
 FORMULA\_PLACEHOLDER\_444\_END  
 FORMULA\_PLACEHOLDER\_453\_END

验证：假设 FORMULA\_PLACEHOLDER\_459\_END  
 FORMULA\_PLACEHOLDER\_464\_END  
 FORMULA\_PLACEHOLDER\_480\_END

如果这个时候 FORMULA\_PLACEHOLDER\_489\_END 的值为0.9，FORMULA\_PLACEHOLDER\_494\_END ，损失小。

如果这个时候 FORMULA\_PLACEHOLDER\_499\_END 的值为0.1，FORMULA\_PLACEHOLDER\_504\_END ，损失大。

### 3.代价函数（Cost Function）

上面的计算，我们都将输入的训练样本的个数视为1，所以只有一个标签 FORMULA\_PLACEHOLDER\_509\_END 和一个预测 FORMULA\_PLACEHOLDER\_514\_END。

在训练中，我们时常有多个样本，数量计做为 FORMULA\_PLACEHOLDER\_519\_END

所以每一个输入的样本的标签和预测为 FORMULA\_PLACEHOLDER\_524\_END 和 FORMULA\_PLACEHOLDER\_530\_END

因为，损失的计算是作用于整个网络的，不是单个的神经元

因此，我们需要计算整体网络的损失，也就是代价计算。

总数据为 FORMULA\_PLACEHOLDER\_536\_END 个 用 FORMULA\_PLACEHOLDER\_541\_END 遍历每一个。

代价函数：

FORMULA\_PLACEHOLDER\_546\_END

又因为，我们计算损失，是为了找到合适的 FORMULA\_PLACEHOLDER\_559\_END 和 FORMULA\_PLACEHOLDER\_564\_END, 使得损失变为最小。  
 所以公式的写法一般会将FORMULA\_PLACEHOLDER\_569\_END 和 FORMULA\_PLACEHOLDER\_574\_END写入。

代价函数：

FORMULA\_PLACEHOLDER\_579\_END

代价的函数的图片如图：

即由 FORMULA\_PLACEHOLDER\_594\_END 和 FORMULA\_PLACEHOLDER\_599\_END 和代价 FORMULA\_PLACEHOLDER\_604\_END 构成的三纬曲面

即存在一个 FORMULA\_PLACEHOLDER\_609\_END 和 FORMULA\_PLACEHOLDER\_614\_END 可以有一个最低的点 FORMULA\_PLACEHOLDER\_619\_END  
 ![在这里插入图片描述](images/blog_migrate_f0416abc7c039abd4a847b922bd46e38_png.png)  
 这个面通常是不规则的，上面为了说明找的特例。真实的情况可能是这样：

![在这里插入图片描述](images/blog_migrate_4f99563762c7700ba6693fb0e8c337c1_png.png)

## 五、梯度下降

前面提到我们的预测结果FORMULA\_PLACEHOLDER\_624\_END 和 标签FORMULA\_PLACEHOLDER\_629\_END之间差异，构成的函数就是代价函数。

我们的目标，是找到在代价函数最低点，也就是损失最低， 也就综合考虑FORMULA\_PLACEHOLDER\_634\_END 和 FORMULA\_PLACEHOLDER\_639\_END之间最差异小的时候的 FORMULA\_PLACEHOLDER\_644\_END 和 FORMULA\_PLACEHOLDER\_649\_END.

![在这里插入图片描述](images/blog_migrate_8996d8ff08e078213b345c528796c91d_png.png)

怎么找呢？使用梯度下降（Gradient Descent）。不过在此之前，需要先说明一个概念 – **导数的作用**。

### 1：什么是导数？能做什么？

假定：存在一个函数 F(x), 是一个凸函数，有最低点。

在函数 F(x)上取一点，过这一点，相较于X轴正方向做切线，获得切线与x轴的夹角 K。

![在这里插入图片描述](images/direct_96142bef574c4f60bc6eb69fe4d88300_png.png)  
 下面的图都画错了，但是CSDN太垃圾了，更新要卡半天。懒的改了  
 ![在这里插入图片描述](images/blog_migrate_a04c9b762ed9e125d0b526f03ae9ad6d_png.png)  
 ![在这里插入图片描述](images/blog_migrate_d1745bf53fd59c27bb250c90300ee44a_png.png)  
 ![在这里插入图片描述](images/blog_migrate_3d24b218bc46ae5666195b0bef2f68ee_png.png)

然后，计算 FORMULA\_PLACEHOLDER\_654\_END 的值

若 FORMULA\_PLACEHOLDER\_661\_END，则说明该点在此函数上，沿着x轴的正方向，随着x的增大而增大

若 FORMULA\_PLACEHOLDER\_668\_END，则说明该点在此函数上，沿着x轴的正方向，随着x的增大而减小

若 FORMULA\_PLACEHOLDER\_675\_END，则说明当x等于当前值的时候，该点即为函数最低点。

正方向通常指的是 坐标轴的增加方向（对于 x 轴，就是向右）。  
 如果当前梯度是正的，参数需要减小（往反方向走）。  
 如果当前梯度是负的，参数需要增大（继续往当前方向走）。

FORMULA\_PLACEHOLDER\_682\_END的值，有三个你一定见过的称呼  
 1：函数F(x) 相较于**当前x值**的 斜率  
 2：函数F(x) 相较于**当前x值**的 导数，也就是函数F(x) 对于**当前x值 求导！**  
 3：函数F(x) 相较于**当前x值**的 **梯度**

我们再回到三维函数代价函数，

在代价函数中，我们要找的，不就是在**某一个位置上的FORMULA\_PLACEHOLDER\_689\_END和在某一个位置上的FORMULA\_PLACEHOLDER\_694\_END**，使得产生的预测FORMULA\_PLACEHOLDER\_699\_END 和 标签FORMULA\_PLACEHOLDER\_704\_END之间差异构成的函数代价的函数处于最低点吗？

不就是我们希望代价函数对参数FORMULA\_PLACEHOLDER\_709\_END和FORMULA\_PLACEHOLDER\_714\_END求导的值是最小的吗（接近于零）？

不就是希望FORMULA\_PLACEHOLDER\_719\_END 和 FORMULA\_PLACEHOLDER\_728\_END 吗？

由于FORMULA\_PLACEHOLDER\_737\_END 函数有多个自变量,针对其中一个自变量求导，而将其他自变量视为常数, 所以我们需要使用偏导数符号，

FORMULA\_PLACEHOLDER\_744\_END

### 2: 梯度下降:FORMULA\_PLACEHOLDER\_753\_END和FORMULA\_PLACEHOLDER\_758\_END的更新

求完偏导数，如果当前FORMULA\_PLACEHOLDER\_763\_END和FORMULA\_PLACEHOLDER\_768\_END不是最小值，就需要更新FORMULA\_PLACEHOLDER\_773\_END和FORMULA\_PLACEHOLDER\_778\_END。

在梯度下降中，对于每一次更新:FORMULA\_PLACEHOLDER\_783\_END和FORMULA\_PLACEHOLDER\_788\_END，我们需要设置一个学习率 FORMULA\_PLACEHOLDER\_793\_END，一般以0.01开始。

设置学习率的一个重要目的是控制每次参数更新的大小，以防止在梯度下降过程中一次更新太大而导致跳过了最优解附近的区域。

**对于FORMULA\_PLACEHOLDER\_798\_END的更新：**  
 FORMULA\_PLACEHOLDER\_803\_END  
 或者  
 FORMULA\_PLACEHOLDER\_813\_END  
 PS1：FORMULA\_PLACEHOLDER\_826\_END是一个FORMULA\_PLACEHOLDER\_831\_END的矩阵，其中 FORMULA\_PLACEHOLDER\_837\_END 是样本数量，FORMULA\_PLACEHOLDER\_842\_END是特征数量，所以FORMULA\_PLACEHOLDER\_847\_END矩阵就包括了所有FORMULA\_PLACEHOLDER\_852\_END 个样本的，FORMULA\_PLACEHOLDER\_857\_END个特征。

PS2：（注意，这里是大 FORMULA\_PLACEHOLDER\_863\_END）：FORMULA\_PLACEHOLDER\_868\_END和FORMULA\_PLACEHOLDER\_873\_END是也是矩阵，维度 FORMULA\_PLACEHOLDER\_878\_END，存放着每一个样本自己的预测结果 FORMULA\_PLACEHOLDER\_883\_END和标签FORMULA\_PLACEHOLDER\_888\_END。

FORMULA\_PLACEHOLDER\_893\_END和FORMULA\_PLACEHOLDER\_898\_END的更新都是综合考虑同步进行，但是每一个样本的FORMULA\_PLACEHOLDER\_903\_END更新的不同正是由于每个样本的预测值FORMULA\_PLACEHOLDER\_908\_END不同，导致了梯度的不同。

**对于FORMULA\_PLACEHOLDER\_913\_END的更新：**  
 FORMULA\_PLACEHOLDER\_918\_END  
 或者  
 FORMULA\_PLACEHOLDER\_928\_END  
 PS：（注意，这里是小 FORMULA\_PLACEHOLDER\_943\_END）每一个标签 FORMULA\_PLACEHOLDER\_948\_END 和每一个预测 FORMULA\_PLACEHOLDER\_953\_END 都是常数的，所以直接累积就可。

## 六、反向传播

### 什么是反向传播？为什么要有反向传播？

我们现在知道，如果想更新FORMULA\_PLACEHOLDER\_958\_END和FORMULA\_PLACEHOLDER\_963\_END，我们需要损失函数的结果 FORMULA\_PLACEHOLDER\_968\_END，计算 FORMULA\_PLACEHOLDER\_975\_END和计算 FORMULA\_PLACEHOLDER\_981\_END

反向传播：即通过**最后一层输出层**的结果与标签计算得到的损失FORMULA\_PLACEHOLDER\_987\_END，反向的计算出每一个神经元中的FORMULA\_PLACEHOLDER\_994\_END和FORMULA\_PLACEHOLDER\_999\_END应该改变的值。

假设我们有一个简单的神经网络，一个输入层、一个隐藏层、一个输出层

输入的样本只有一个，特征也只有一个，所以每一层只有一个FORMULA\_PLACEHOLDER\_1004\_END和一个FORMULA\_PLACEHOLDER\_1009\_END，结构可能是下面这样  
 ![在这里插入图片描述](images/blog_migrate_f67f447c332d9fab4605111e947c2835_png.png)如果我们想知道FORMULA\_PLACEHOLDER\_1014\_END需要改变多少，就需要计算FORMULA\_PLACEHOLDER\_1019\_END，也就是…

FORMULA\_PLACEHOLDER\_1025\_END

这样的计算很难，即使交给计算机也会消耗大量资源和时间。

有没有什么办法呢？

在求导的过程中，有这样一个法则-- **链式法则**

### 链式法则

链式法则是一个对于**复合函数求导**的重要法则，公式如下：

**存在函数 FORMULA\_PLACEHOLDER\_1040\_END**  
 FORMULA\_PLACEHOLDER\_1048\_END

回到刚刚的问题，我们希望计算的FORMULA\_PLACEHOLDER\_1064\_END，可以化解为：  
 FORMULA\_PLACEHOLDER\_1070\_END

虽然，我们看起来还是一推求导的过程，但在实际的神经网络训练过程中，每一步求导的结果都是**具体的数值**，这些数值在反向传播过程中通过链式法则**只进行依次相乘**，便可以计算出最终的**梯度值**。

或者，我们可以直接使用这俩个公式：  
 FORMULA\_PLACEHOLDER\_1085\_END  
 FORMULA\_PLACEHOLDER\_1097\_END

对于核心的FORMULA\_PLACEHOLDER\_1109\_END 在以 **FORMULA\_PLACEHOLDER\_1115\_END** 为激活函数的时候  
 FORMULA\_PLACEHOLDER\_1126\_END

## 七、常用函数 of Python

在深度学习中，处理的数据、无论是样本还是样本的特征以及权重，通常都是多维的矩阵。在代码中，对于它们的表示一般都是使用多维的数组进行处理，**那么也就必然会涉及到多维数组直接的乘法运算等操作**。

先补充一点前导的矩阵知识吧。。

### 0：关于矩阵乘法

**矩阵的表示 FORMULA\_PLACEHOLDER\_1135\_END，即 FORMULA\_PLACEHOLDER\_1141\_END 为行数，FORMULA\_PLACEHOLDER\_1146\_END 为列数**

如果俩个矩阵可以被相乘，则必然满足下面的规则：

#### 1：两个一维数组（向量）：

如果 A 和 B 是**两个一维数组**，它们的长度必须相同。np.dot(a, b) 在这种情况下会计算它们的内积，结果是一个标量。  
 FORMULA\_PLACEHOLDER\_1151\_END

#### 2：一维数组和二维数组的乘积:

如果一个数组是一维的，另一个数组是二维的，**一维数组必须为左矩阵**，且**一维数组的长度**（元素数量）必须与**二维数组的行数**相同。  
 FORMULA\_PLACEHOLDER\_1164\_END

FORMULA\_PLACEHOLDER\_1173\_END  
 结果：  
 FORMULA\_PLACEHOLDER\_1185\_END

**也可以这么理解：  
 形状：FORMULA\_PLACEHOLDER\_1205\_END 为 1 X `3`，FORMULA\_PLACEHOLDER\_1210\_END 为 `3` X 2，FORMULA\_PLACEHOLDER\_1215\_END 结构一定是 1 X 2  
 内容：FORMULA\_PLACEHOLDER\_1220\_END 的一行元素对应相称 FORMULA\_PLACEHOLDER\_1225\_END的每一列的元素，并且求合。 FORMULA\_PLACEHOLDER\_1230\_END有几列FORMULA\_PLACEHOLDER\_1235\_END就有几个元素。**

#### 3：两个二维数组的乘积

两个二维数组的np.dot(a, b)，**执行的是矩阵乘法（点乘）**

两个二维数组相称，则必须满足**左数组的列数（第二参）** == **右数组的行数（第一参）**，即FORMULA\_PLACEHOLDER\_1240\_END 为 J X K ，FORMULA\_PLACEHOLDER\_1245\_END 必须 K X F。

形状：FORMULA\_PLACEHOLDER\_1250\_END 为 J X `K`，FORMULA\_PLACEHOLDER\_1255\_END 为 `K` X F，FORMULA\_PLACEHOLDER\_1260\_END 结构一定是 J X F

内容：FORMULA\_PLACEHOLDER\_1265\_END里面的每一个内容FORMULA\_PLACEHOLDER\_1270\_END == FORMULA\_PLACEHOLDER\_1277\_END的第 FORMULA\_PLACEHOLDER\_1282\_END 行所有元素  对应相乘 FORMULA\_PLACEHOLDER\_1287\_END的第 FORMULA\_PLACEHOLDER\_1292\_END 列所有元素  再求和

**FORMULA\_PLACEHOLDER\_1297\_END 决定行数，FORMULA\_PLACEHOLDER\_1302\_END 决定列数**

![在这里插入图片描述](images/blog_migrate_ade4f9f216202fd9fbc786af549ac5c8_png.png)

### 1：向量化：np.dot ()

在python的 `numpy` 包中提供了很多函数，一般通过`np.函数`进行调用，主要有以下的操作。

代替过去使用`for`循环提取每一个单个数字进行乘法运算, **`np.dot ()`可以直接用于进行数组(矩阵)的乘法运算**  
 （早知道这，当年打ACM的时候…哎…）

```
import numpy as np
#生成随机可计算矩阵
a=np.random.rand(5,2)
b=np.random.rand(2,3)

#矩阵乘法
c=np.dot(a,b)

print(c)
# 5 X 3的矩阵
# [[0.40588364 0.72359991 1.06770193]
#  [0.25421081 0.76920878 0.55936812]
#  [0.2377581  0.48192689 0.6053476 ]
#  [0.23772493 0.43346957 0.62200772]
#  [0.26465829 0.80355781 0.58141002]]
```

### 2：指数计算：FORMULA\_PLACEHOLDER\_1307\_END

```
import numpy as np
#单个数
a=3

c=np.exp(a)

print(c)
#20.085536923187668

#矩阵里面的所有数
b=np.random.rand(3,2)

c=np.exp(b)

print(c)
#[[1.46583214 2.18770474]
#[2.65302428 1.17295333]
#[2.07931534 1.53653021]]
```

还有很多，比如对数log、最大值最小值什么的，用到再查吧。

### 3：矩阵内部求和：FORMULA\_PLACEHOLDER\_1319\_END

假设有这样一组表格数据：  
 ![在这里插入图片描述](images/blog_migrate_78eb6dd986aae139046b48779c23326d_png.png)  
 当我们遇到类似“将某一行的数据合并/将某一列的数据合并”的需求时，可以直接使用`sum(axis=)`的方法

```
import numpy as np
A=np.array([[56.0,0.0,4.4,68.1],
           [1.2,104.0,52.0,8.8],
           [1.8,135.0,99.0,0.9]])

cal=A.sum(axis=0)#按列求和
#cal=[ 59.  239.  155.4  77.8]

cal=A.sum(axis=1)#按行求和
#cal=[128.5 166.  236.7]
```

### 4：重新构建/确保数组形状：FORMULA\_PLACEHOLDER\_1331\_END // 最好经常使用！！

`reshape`是一种常见的数组重塑操作，通常用于数组或矩阵的形状转换，规则可以概括如下：

**0: reshape不改变数组本身，需要再赋值**

```
import numpy as np
a = np.array([1, 2, 3, 4, 5, 6])

a.reshape(2, 3)
print(a)
# 输出:[1 2 3 4 5 6] #形状未改变

b = a.reshape(2, 3) #重新赋值
print(b)
# 输出:
# [[1 2 3]
#  [4 5 6]]
```

**1. 元素总数一致**：  
 目标形状的元素总数必须与原始数组的元素总数相等。即：原始数组的**元素个数**必须等于目标形状**各维度的乘积**。

```
import numpy as np
a = np.array([1, 2, 3, 4, 5, 6])#总数6

b = a.reshape(2, 3)#重塑为2*3
print(b)
# 输出:
# [[1 2 3]
#  [4 5 6]]
```

**2：进行重塑操作时，原数组的内容会被视为一个线性序列，按行优先的从左到右的顺序:**

```
a = np.array([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]]) #12个数
print(a.shape)
# 输出: (2, 2, 3)

s = a.reshape(1,12)
print(s)
# 输出: [[ 1  2  3  4  5  6  7  8  9 10 11 12]]

f = a.reshape(3, 2, 2)
print(f)
# 输出:
# [[[ 1  2]
#   [ 3  4]]
#
#  [[ 5  6]
#   [ 7  8]]
#
#  [[ 9 10]
#   [11 12]]]
```

**3: 维度为 -1 的使用:**  
 在我们只确一个维度的时候，可以使用 -1 可以自动计算某一维的大小，前提是其他维度已知且合法。但是-1 只能使用一次

```
import numpy as np
a = np.array([1, 2, 3, 4, 5, 6])

d = a.reshape(2, -1)#确定了行数但是不确定列数
print(d)
# 输出:
# [[1 2 3]
#  [4 5 6]]

e = a.reshape(-1, 2)#确定了列数但是不确定行数
print(e)
# 输出:
# [[1 2]
#  [3 4]
#  [5 6]]

c = a.reshape(2, -1, -1)#-1的使用超过一次
print(c)# ValueError: can only specify one unknown dimension
```

## 八、编写代码时的笔记

1：当我们谈论一个神经网络有多少层时，数量为除了输入层以外的所有层。  
 2：神经元接收的是输入数据的特征，而不是整个样本本身， 所以输入层的样本的个数，也可以看作是输入层的神经元个数 。

### 1：原始数组维度和计算公式

#### FORMULA\_PLACEHOLDER\_1340\_END：样本数组维度/输入数据维度

FORMULA\_PLACEHOLDER\_1345\_END  
 FORMULA\_PLACEHOLDER\_1351\_END

#### FORMULA\_PLACEHOLDER\_1361\_END/ FORMULA\_PLACEHOLDER\_1366\_END：标签/预测数组维度 （二分类）

FORMULA\_PLACEHOLDER\_1371\_END  
 FORMULA\_PLACEHOLDER\_1377\_END

#### FORMULA\_PLACEHOLDER\_1385\_END：权重维度，作用于每一个输入（输入层接受的是“特征” FORMULA\_PLACEHOLDER\_1390\_END，之后的层是前一个层的输出“预测”FORMULA\_PLACEHOLDER\_1396\_END）

FORMULA\_PLACEHOLDER\_1402\_END  
 FORMULA\_PLACEHOLDER\_1408\_END

#### FORMULA\_PLACEHOLDER\_1421\_END：偏差维度，作用于每一个神经元，一个神经元一个偏差 FORMULA\_PLACEHOLDER\_1426\_END

FORMULA\_PLACEHOLDER\_1431\_END  
 FORMULA\_PLACEHOLDER\_1437\_END

#### FORMULA\_PLACEHOLDER\_1448\_END：线性函数的输出值，作用于每一个神经元，一个神经元一个 FORMULA\_PLACEHOLDER\_1453\_END 结果

记录当前层中对于所有样本（输入）的线性函数的输出值，为激活函数做预测提供准备.  
 FORMULA\_PLACEHOLDER\_1458\_END  
 FORMULA\_PLACEHOLDER\_1464\_END  
 FORMULA\_PLACEHOLDER\_1477\_END  
 或者  
 FORMULA\_PLACEHOLDER\_1487\_END

#### FORMULA\_PLACEHOLDER\_1500\_END：激活函数的输出值，作用于每一个神经元，一个神经元一个 FORMULA\_PLACEHOLDER\_1505\_END 结果，就是“预测”

记录当前层中对于所有样本（输入）的激活函数的预测值.  
 FORMULA\_PLACEHOLDER\_1510\_END  
 FORMULA\_PLACEHOLDER\_1516\_END  
 FORMULA\_PLACEHOLDER\_1529\_END  
 或者  
 FORMULA\_PLACEHOLDER\_1536\_END

![在这里插入图片描述](images/blog_migrate_9479176afaad4bb1b1a96b49a2d392f6_png.png)

### 2：偏导数数组维度和计算公式

#### FORMULA\_PLACEHOLDER\_1546\_END：损失函数 FORMULA\_PLACEHOLDER\_1552\_END 对于线性函数FORMULA\_PLACEHOLDER\_1557\_END的偏导

FORMULA\_PLACEHOLDER\_1562\_END  
 FORMULA\_PLACEHOLDER\_1571\_END

#### FORMULA\_PLACEHOLDER\_1581\_END：损失函数 FORMULA\_PLACEHOLDER\_1587\_END 对于权重FORMULA\_PLACEHOLDER\_1592\_END的偏导

FORMULA\_PLACEHOLDER\_1597\_END  
 FORMULA\_PLACEHOLDER\_1610\_END

#### FORMULA\_PLACEHOLDER\_1619\_END：损失函数 FORMULA\_PLACEHOLDER\_1625\_END 对于权重FORMULA\_PLACEHOLDER\_1630\_END的偏导

FORMULA\_PLACEHOLDER\_1635\_END  
 FORMULA\_PLACEHOLDER\_1647\_END

## ？、什么是深度学习？

深度学习的 **“深度”** 指的是神经网络中隐藏层的数量。  
 ![在这里插入图片描述](images/blog_migrate_1a400ad8e10a2ff4d3b7cf25d2d308e3_png.png)  
 随着层数的增加，网络能够学习更复杂的特征，但同时也可能导致计算成本增加和模型训练难度加大。

神经网络通过一种叫做反向传播的学习算法来训练，它涉及到对网络输出的误差进行评估，并将误差反向传递回网络，以调整连接的权重，从而减少未来输出的误差。这个过程通常需要大量的数据和计算资源，这些我们下一篇再说。

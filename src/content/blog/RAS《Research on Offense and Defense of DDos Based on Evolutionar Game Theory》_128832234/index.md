---
title: "RAS《Research on Offense and Defense of DDos Based on Evolutionar Game Theory》"
publishDate: 2023-02-04 
description: '阅读笔记'
tags:
  - Chinese/English
language: 'Chinese/English'
---

# Read abstract and personal Summary of《Research on Offense and Defense of DDos Based on Evolutionar Game Theory》

# Ⅰ：Read abstract(阅读摘要)
## 0：Proper noun interpretation（专有名词解释）
**①：Tradition Game Theory（传统博弈）：**
	&emsp;Under certain conditions ad following certain rules, one or several people or teams whit **absolute rational thinking**, from their allowed choice of behavior or strategy to choose and implement， and from the corresponding results or benefits.

&emsp;在一定条件下，遵循一定的规则，一个或几个拥有**绝对理性**思维的人或者团队，从各自允许的选择的行为或策略进行选择并加以实施，并从中各自取得相应结果或收益的过程。


**②：Evolutionary Game Theory（演化博弈）：**
&emsp; In evolutionary game theory, instead of modeling human beings as particularly rational players, humans generally reach game equilibrium through multiple trials and errors (dynamic). Evolutionary game theory does not require players to be completely rational (bounded rationality), nor does it require complete information conditions

&emsp;演化博弈论不在将人类模型化为特别理性的博弈者，而是认为人类通常是通过多次试错的方法达到博弈均衡的（动态），演化博弈理论并不要求参与人是完全理性的（有限理性），也不要求完全信息条件。

## 1：The question raised by this paper（本文提出的问题）
&emsp;Network life brings people a lot of conveniences, but at the same time, there are many potential fatal loopholes.  DDoS attacks that exploit vulnerabilities in the TCP/IP protocol are one of the most common.A DDos attack is one in which multiple computers in a network that are "controlled" send a large number of "denial of service" requests to a specific "victim" in order to consume the server resources of the "victim" and thus fail to provide service to the real user.Although many defense tools and strategies against DDoS attacks have appeared on the market, there is no defense software or defense method that perfectly balances these two points in terms of efficiency and memory space usage.  More defenders conduct "dynamic defense" artificially to deal with "dynamic attacks" launched by attackers.

&emsp;网络生活带给人们很多便利，但同时也潜在着很多致命的漏洞。利用TCP/IP协议漏洞的DDos攻击便是其中最常见的一种。DDos攻击主要是利在网络中“被控制”的多个计算机向特定的“被攻击者”发送大量的“拒绝服务”请求，以此来消耗“被攻击者”的资源，从而无法为真正的用户提供服务。
表尽管市面上已经出现了很多针对DDos攻击的防御工具以及防御策略，但是结合效率和使用内存空间来看，并没有一款完美平衡这两点的防御软件或者防御方法，更多的是被攻击者人为的进行”动态防御“，从而应对攻击者发起的”动态攻击“。

## 2：The Novel solution in the paper（论文中创新的解决方法）
 &emsp;The confrontation process of "attackers" and "defenders" determines the ecology of the network. The author of the paper proposes to use the theoretical basis of Evolutionary Game Theory to model the attack and defense of DDos and analyze the changing law of the "attack and defense relationship" between "attackers" and "defenders" from a microscopic perspective. Therefore, it can be used as reference suggestions for research scholars against DDoS attacks.
 
&emsp;“进攻者”和“防御者”的对抗过程决定了网络的生态，论文作者提出使用 Evolutionary Game Theory的理论根据，对DDos的攻防进行建模，从微观的角度来分析“进攻者”和“防御者”之间的”攻防关系”有着什么样的变化规律，从而得出可以作为针对DDos攻击的研究学者的参考建议。

## 3：Experimental process（实验过程）
&emsp;为了真实的还原现实中的网络攻防过程，作者使用的模型理论为Evolutionary Game Theory，即不需要攻防双方“绝对理性”。在DDos攻击防御博弈中，防御者需要考虑是否采取主动防御策略，而不是基于防火墙的被动防御，攻击者需要考虑是否攻击某个服务。攻击者和防御者需要根据不同策略在攻防过程中所获得的利益来进行博弈，以达到利益最大化
**&emsp;1：进化博弈模型的假设**
&emsp;假设1:攻击者和防御者都是有限理性的。

&emsp;假设2:攻击者和防御者可以互相学习，通过纠正错误来不断改进自己的策略，因为他们是有限理性的，他们很难在一开始就选择理想的策略来最大化自己的利益。

&emsp;假设3:防御者有“主动防御”和“被动防御”两种策略。“主动防御”和“被动防御”的概率分别为x(0≤x≤1)和1−x。

&emsp;假设4:攻击者有两种策略:“攻击”和“不攻击”。“攻击”和“不攻击”的概率分别为y(0≤y≤1)和1−y。
根据这些假设，作者生成了决策描述图。

![](https://i-blog.csdnimg.cn/blog_migrate/fefad4e0bcefe57d6a36b815755b23bf.png)

将防御者和攻击者的所有可能情况做如下分析：

**1：防御者视角：**

结果1：当防御者采取Active Defense的策略并且攻击者采取Attack的策略时，防御者可以获得基本收入R，但需要支付开发和运行维护的代价Cd。此外，如果防御系统在服务之外，则还需要承担额外的运行防御系统的代价Ci。而且，由于防御系统不能100%的抵御攻击，则防御者也需要支付Aa的损失。（R-Cd-Ci-Aa）

结果2：当防御者采取Active Defense的策略但是攻击者采取no Attack的策略时，防御者需要支付Cd和Ci的代价，获得基本收益R。（R-Cd-Ci）

结果3：当防御者采用Passive Defense的策略但是攻击者采取Attack的策略时，防御者获得基本收益R，需要支付被攻击以后的损失Ap。并且支付用户量的减少带来的损失Cr。（R-Ap-Cr）

结果3：当防御者采用Passive Defense并且攻击者采取no Attack的策略时，防御者获得基本收益R。（R）

2.攻击者视角：

结果1：当攻击者采用on attack的策略时，收益为0

结果2：当进攻者采取Attack的策略，并且防御者采取主动防御的策略时，攻击者所获得的收益为功能成功的部分Aa。但当攻击被成功防御后，服务器中存在的漏洞往往会被修复。论文作者将这种现象也划分为攻击者的成本C。（Aa-C）

结果3：当攻击者采用“Attack”而防御者采用“Passive Defense”策略时，攻击者所获得的利益即为攻击Ap成功所带来的利益。

攻击者和防御者的参数和利益矩阵分别如表1和表2所示

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/beee76a36f39d9033618b4fb646faf92.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/955afa3f8cae501e99183a2732a34142.png)




## 4：The final result（最终得出的结果）
 &emsp;attackers are more inclined to launch attacks, and the defenders’ strategy choices are related to the cost of the active defense system

 &emsp;攻击方更倾向于发起攻击，防御方的策略选择与主动防御系统的成本有关（这不是废话吗？？？？？）
 ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5f3acba9feb05f61d56286032e75afa0.png)

 



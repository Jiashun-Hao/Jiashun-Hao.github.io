---
title: "Python小技巧"
description: "虽然没有这样的东西，但是习惯要一个： def main():     pass      if name=='main':     main() ！！！！这是一"
publishDate: 2022-12-03
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/128161006
---
## 1:入口函数

虽然没有这样的东西，但是习惯要一个：

```
def main():
    pass
    
if __name__=="__main__":
    main()
```

## 2:闭包

！！！！这是一篇水博客，非教学！！！！！  
最近在学习python，只有一种感觉…  
竟然还存在这样的语言！！！  
![在这里插入图片描述](./images/487a33cbf0c59eefb2e4a38a3b6e7db3.png)  
这个<class ‘function’>看的我久久不能释然。。  
一个函数！一个带有参数的函数！！可以作为一个变量！！？？？封装使用？？？（结合5和7行）
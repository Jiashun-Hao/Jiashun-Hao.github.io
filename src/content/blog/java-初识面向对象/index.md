---
title: "Java--初识面向对象"
description: "面向对象的编程思路，目前理解为与c的结构体为同一性质； public class Main {     public static void main(Stri"
publishDate: 2022-04-24
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/104189365
---

## 初识面向对象

面向对象的编程思路，目前理解为与c的结构体为同一性质；

```
public class Main {
    public static void main(String[] args) {
         student a=new student();//定义student型的变量a，则a就具备类（student）所有的属性和方法。
         //这里的定义用到了new，和数组的用法一样，所以将数组理解为系统自带的‘类’
         a.age=60;
         a.name="郝佳顺";
         a.id="1453100406";//以上均为给‘对象’的‘属性’赋值
         a.eat();
         System.out.println(a.cheng());//以上均为调用

    }
}
class student{ //给对象student 封装他的‘属性’和‘方法’
    int age;
    String id;
    String name;//以上为‘属性’

      public void eat()//无返回‘方法’
      {
          System.out.println("Hello Word");
          System.out.println(age);
          System.out.println(id);
          System.out.println(name);
      }
      public String  cheng(){//有返回‘方法’
          return "ok";
      }
}
```

总结：将一件事物抽象成一个**对象**（万物皆对象），每个**对象**有他的**属性**，用一个个的**类**来表示对象的**属性**，这些**类**可以被**对象**调用，通过 `对象.属性`的方式。

2020年2月5日初写；
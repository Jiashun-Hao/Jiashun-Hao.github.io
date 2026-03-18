---
title: "Java 简单笔记 -- 设计模式：单例(饿汉式和懒汉式)"
publishDate: 2020-02-29
description: '笔记'
tags:
  - Java
language: 'Chinese'
---

## 什么是设计模式？
设计模式（Design pattern）是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。 也可以使得编程变得更高效；
用我自己的话说，就像是初中时候做的数学题，什么时候该套用公式，什么时候该画图、什么时候又该做辅助线。。。。这些做题的“技巧”就是前人大量的练习和论证得出的最优解法，我们后人便可以直接用来“乘凉”。
==相同的，对于编程来说，遵循设计模式编程就是在使用这样的“技巧”==
目前常用的设计模式一共有23种，今天先写里面比较常用的一种：**单例**；

# 单例
## 1.模式的设计：
单例模式所要求的是一个类中只能有一个对象，所以，只能进行如下的设计：

	1.私有的构造器；
	2.在类的内部创建一个实例（不能在外部创建）；
	3.私有化此对象，通过公共的方法来调用；
	4.此公共的方法只能通过类来调用；
	5.由4可以得知，将公共得方法设置为static即可实现，同时类的实例也必须为static所声明的，不然方法没法调用；

## 2.代码的实现（饿汉式）
```java
public class Main{
    public static void main(String[] args) {

        sing a=sing.getInstance();
        sing b=sing.getInstance();
       System.out.println(a==b);//判断两个对象是否为同一个；
    }
}
//只能创建sing的单个实例
class sing{
    //1.私有化构造器,防止使用直接new创建对象；
    private sing(){
    }
    //2.在类的内部创建一个类的实例，因为无法在外部创建；
    //3.私有化此对象，通过公共的方法来调用，设置为static，可以确保唯一性；
    private static sing instance=new sing();//imprint！！！
    //4.设置公共的方法，只能通过类来调用，因为对象static的，所以方法也必须为static所声明的才可以使用，还有一个原因，也为了确保方法的唯一性；
    public static sing getInstance(){
        return instance;
    }
}
```
输出结果：可以看出，两个对象指向同一片内存区域，也就是同一个对象；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/4bb09b066f15ebfdf913e11b3abc39d9.png)

## 3.代码的实现（懒汉式）
```java
public class Main{
    public static void main(String[] args) {
      sing a=sing.getInstance();//sing.getInstance();表示返回一个对象；
      sing b=sing.getInstance();
      System.out.println(a==b);
    }
}

class sing{
   //1.私有化构造器
    private sing(){

    }
   //2.在类中声明一个对象，被static修饰并将它的值赋值为null;
    private static sing instance =null;
    //3.设置一个公开的方法，同样的被static修饰;
    public static sing getInstance(){//imprint！！！
        if (instance==null){//如果是第一次使用，便给他新创建一个实例；
            instance=new sing();
        }
        return instance;//返回当前对象的实例；
    }
}
```
输出结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5cb47d2492aa9f8a92a3ff1c5b40626b.png)

## 4.（饿汉式）与（懒汉式）的区别：
其实这个很有意思，因为这两种方法的实现过程真的“人如其名”，其特点就在于我注释中写的//import的代码；

饿汉式：“见一个吃一个，最好的永远是下一个”。无论主方法创建多少对象调用多次这个方法，所有的对象都和**最后**一个被创建的对象指向的是同一片区域；

懒汉式：“能不动就不动，如果非要动，那就动一次”。无论主方法创建多少对象调用多次这个方法，所有的对象都和**第一**个被创建的对象指向的是同一片区域；

## 5.补充：
这里还有一点需要说明，懒汉式存在线程安全问题。如果电脑同时执行多个线程，有可能对象被创建到一半就中止。
比如，第一个程序刚刚进入if语句创建了一个新的对象，这时候这个任务突然被挂起，这使得第一个任务的值没有改变，第二个任务又重新if并创建新的对象。等到第一个任务被重新唤醒的在将它返回，这时候，注意，这时候第一个和第二个对象返回的是两片完全不同的区域，这样就违背了 **“单例”** 的模式特性；
当然，这些都是现在无法深入讨论的，所以，先简单说一下，在这里挖个坑，以后再详细的将他填满；

2020年2月29日初写

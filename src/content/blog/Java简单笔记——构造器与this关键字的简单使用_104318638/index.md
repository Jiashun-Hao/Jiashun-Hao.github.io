---
title: "Java简单笔记 -- 构造器与this关键字的简单使用"
publishDate: 2020-02-14
description: '笔记'
toc: true
tags:
  - Java
language: 'Chinese'
---

# 1.构造器
Java面向对象的三要素：封装，继承，多态；
类的三要素：属性，方法，**构造器**；

格式为：权限修饰符 类名（形参）{}，其中类名一定要与本类同名；

## 作用
1.创建对象；
2.给对象的属性赋值；

## 特点
1.设置类的时候若不显示设置构造器，系统会自动提供一个空参的构造器；
2.一旦显示的设置了一个构造器，系统默认的构造器将会失效；
3.类的多个构造器构成重载；

代码：

```java
public class Main {
    public static void main(String[] args)
    {
         Person age=new Person(1,2,3,4,5,6,8,9,10,11);
         System.out.println(age.getAge());
    }
}
class Person{
    private int a;
     public Person(int...arg) //自定的构造器，这里直接用可变个数的形参来表示重载；
     {   int sum=0;
         for (int i = 0; i <arg.length ; i++) {
             sum+=arg[i];//使用方法还是和数组一样；
         }
         a=sum;
     }
     public int getAge()
     {
         return a;
     }
}
```
输出结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/4090126af7cd13e8e851999469cc0e21.png)


# 2.this关键字
应我为数不多的关注者的响应，在这里补上this关键字的用法以及一些事项；


## this
	1.用途：可以用来修饰方法、属性、构造器；
	2.用法：this.对象 以及 this(形参)；
	3.作用：（1）用于在类中处理构造器以及方法中形参和对象的属性（成员变量）重名；
	        （2）用于在构造器中调用与该构造器构成重载的其它构造器（仅限于构造器中使用）；
	4.注意：this（形参）的用法在构造器中必须写在第一行，并且一个构造器最多写一个this（形参）
	  
用简单的代码来说明具体的用法：
**代码一（this.对象的用法）：**
 首先，写这样一段代码；
```java

public class Main {
    public static void main(String[] args) {
      Zoom dog =new Zoom("小白",5);
      dog.getZoom();
    }

}
class  Zoom
{   private String name;
    private int age;

    public Zoom(String name,int age){
        name=name;//需要注意的是这里方法的属性和实参重名了，但是没有报错，输出的结果是默认值，原因也很明朗，系统分不清那个name是属性那个name是实参；
        age=age;//同理
    }
    public void getZoom(){
        System.out.println("名字："+name+" 年龄："+age);
    }

}
```
输出结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/7ef17c7c53e43ea35ef683ac4964e9e3.png)

然后，再在重名的地方添加this方法查看效果；
```java
public Zoom(String name,int age){
        this.name=name;
        this.age=age;
    }
```
结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5d623ddfb8ea5d5efe4c79fb22406926.png)

很明显，赋值成功了，这样就说明了this的第一个用法——==用来指明该变量名为该类下的属性==。当然，在名字不重复的情况下，this是默认省略的。

**代码二（this（形参）的用法）：**

```java
public class Main {
    public static void main(String[] args) {
      Zoom dog =new Zoom("小白",5,1002);
      dog.getZoom();
    }

}
class  Zoom
{   private String name;
    private int age;
    private int id;
    public Zoom(int id)
    {  System.out.println("使用了我");
        this.id=id;
    }
    public Zoom(String name,int age,int id){
        this(id);//此处调用了第一个构造器
        this.name=name;
        this.age=age;
    }

    public void getZoom(){
        System.out.println("名字："+name+" 年龄："+age+" 编号："+id);
    }
}
```

输出结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c32ef8494572f8d271ebf469640e728e.png)

这里将输出的结果作一下分析，并体会this（具体注意用法）

1.很明显，this起到了调用的效果，
优点：如果出现多个构造器对一个特定的属性赋相同的值，那么完全可以使用this优化代码，起到共用的机制；
2.刚刚试了一下，如果想在N个构造器之间使用this，那么最多只能用N-1次，否则会出现死循环；
3.对于主构造器没有的属性，不能用this调用别的构造器内的该属性；
```java
public Zoom(int id)
    { 
        this.id=id;
    }
    public Zoom(String name,int age){
        this(id);//here！！
        this.name=name;
        this.age=age;
    }
```
输出会报错

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/99aa9e721aec5a705ab279259d36e950.png)

这个原因也不难理解，构造器的参数不符合调用的参数，所以说，这个方法仅仅可以做调用和改值，并不能完全取代赋值；

当然，赋值的操作也不仅仅只限于用构造器吧~~~~

2020年2月15日，第一次修改

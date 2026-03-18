---
title: "Java 简单笔记 -- 接口(总归纳)"
publishDate: 2020-05-13
description: '笔记'
tags:
  - Java
language: 'Chinese'
---

之前写过几篇关于接口的伪“博客”，今天又学习到了一点新的内容，索性，将他们集合到一篇并做补充，方便日后复习使用；

# 1.interface关键字（接口）
**格式**：声明的方法是这样的(关键字为 interface)；
 ```java
 interface USB{
   void start();//从结构可以看出，接口是一种特殊的抽象方法；
   void stap();
 }
 ```
“实现”是这样的(关键字为：implements)
```java
interface USB{
}
class Cmputer implements USB{//Computer实现USB
}
```
**性质**：
* 接口的作用在我看来像是对类与类间[“继承特性”](https://blog.csdn.net/HJS1453100406/article/details/104390755)的补充；
* 接口可以看作是一个特殊的抽象类，为“实现”他的“子类”提供特有的方法，很像继承，子类=继承=父类<——>类=实现=接口;
* 与继承不同的是，接口只能由抽象方法和常量组成，并且一个类可以实现多个接口
* 接口与抽象类的相同点
  ```java
   interface USB{
    public abstract void start();
     }
    class Cmputer implements USB{//Computer实现USB
     public void start(){//抽象方法必须重写(public)
         System.out.println("hhh");
     }
  }
  ```
* 常量的定义
  ```java
    interface USB{
     public static final int a=1;//原有格式
     int b=2;//在接口里可以缩写
    }
  ```
* 方法的定义
   ```java
    interface USB{
      public abstract void start();//原有格式
      void stap();//缩写
   }
    ```

**特点**：
* 实现必须==重写接口中所有的抽象方法==，如果没有则会成为一个抽象类，不可被实例化
*  如果继承与实现同时出现，**则先继承后实现**，并且父类里面的抽象方法也要重写。
* 一个类可以实现多个接口，接口之间用`,`隔开；
* 接口和接口可以继承，并且是多继承；
  ```java
  interface USB{
  }
  interface USB2{
  }
  interface USB3 extends USB,USB2{
  }
  ```

**作用**：
接口主要用来定义规范，解除耦合关系（互相作用又互相影响）；
接口是一种不需要考虑层次关系的特殊的抽象方法；

# 2.接口的多态
  同继承的父、子类一样，接口与实现类之间也有多态的性质，也存在着虚拟方法调用（虚拟方法调用：通过父类的引用指向子类的实体，从而调用在子类中被子类所重写的父类的方法）

简单来说，就是可以通过接口本身来调用“实现”该接口的类；

但是接口算是一种抽象的类呀，并不能实例化对象，那该怎么调用呢？

这样调用

代码：
```java
public class Main {
   public static void main(String [] args){
      Duck d=new Duck();//实例化一个Duck 型的d；
      Main.Text1(d);//由于该类中的方法都是被static修饰过的，所以可以直接通过“类.方法”来调用;
       Main.Text2(d);
       Main.Text3(d);
   }
   
   public static void Text1(Runner r){// 这样调用：Runner r=new Duck();
        r.run();//虚拟方法调用，可以通过接口Runner来调用实现它的Duck；
   }
   public static void Text2(Swimmer s){// Swimmer s=new Duck();
       s.swi();
   }
   public static void Text3(Filer f){// Flier f=new Duck();
       f.fly();
   }
}
interface Runner{
    public abstract void run();//虚拟方法
}
interface Swimmer{
    void swi();//虚拟方法（简写），这里可以这样写，因为是在接口中，所以java默认省略了public abstract
}
interface Filer{
    void fly();//虚拟方法（简写）
}

class Duck implements Runner,Swimmer,Filer{//Duck 实现了以上三个接口
    public void run(){//每一个虚拟方法都必须重写；
        
    System.out.println("我会跑");
    }
    public void swi(){
        System.out.println("我会游泳");
    }
    public void fly(){
        System.out.println("我会飞");
    }
}

```

# 3.接口实现的三种方法
```java
public class ceshi {
    public static void main(String[] args){
        ceshi a=new ceshi();//4.实例化一个对象
        NoteBook n=new NoteBook();//5.实例化一个实现接口的类的对象
        a.show(n);//方法一；

        a.show(new Product(){ // 方法二；创建一个实现Product接口的匿名类对象
            public void getName(){
                System.out.println("外星人笔记本");
            }
            public void getPrice(){
                System.out.println("$8999");
            }
        });

        Product p=new Product() {//方法三
            public void getName() {
                System.out.println("笔记本");
            }

            public void getPrice() {
              System.out.println("$1");
            }
        };
        a.show(p);



    }
    public void show(Product p){//3.造一个接口的实现方法
        p.getName();
        p.getPrice();
    }
}
interface Product{ //1.创建一个接口
    void getName();//两个抽象方法
    void getPrice();
}

class NoteBook implements Product{//2.接口的实现类
    public void getName(){//重写方法
      System.out.println("苹果笔记本");
    }
    public void getPrice(){
      System.out.println("$9999");
    }

```

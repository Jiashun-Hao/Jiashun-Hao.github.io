---
title: "Java简单笔记——接口的多态"
description: "同继承的父、子类一样，接口与实现类之间也有多态的性质，也存在着虚拟方法调用（虚拟方法调用：通过父类的引用指向子类的实体，从而调用在子类中被子类所重写的父类的方法"
publishDate: 2020-04-02
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/105267288
---

## 多态

同继承的父、子类一样，接口与实现类之间也有多态的性质，也存在着虚拟方法调用（虚拟方法调用：通过父类的引用指向子类的实体，从而调用在子类中被子类所重写的父类的方法）

简单来说，就是可以通过接口本身来调用“实现”该接口的类；

但是接口算是一种抽象的类呀，并不能实例化对象，那该怎么调用呢？

这样调用

代码：

```
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
---
title: "Java 简单笔记 --final、抽象类和接口"
publishDate: 2020-04-20  
description: '笔记'
tags:
  - Java
language: 'Chinese'
---

有段时间没有学习Java，导致今天看自己写的代码甚至有些地方模棱两可。比如接口这一部分。写博客很大一部分原因是想着以后复习之便，也因为如此，所以将接口补上，但是因为接口需要用到抽象的一些概念，然而抽象我也没写，所以写抽象，又因为关键字`final`和抽象类所用到的`abstract`有一种很奇怪的相似感，所以先写`final`......
有点多啊。。。。罢了，直接写重点；

# 1.final修饰符（最终的）
## 作用：
### 1、final修饰类：该类不能再被继承，不得再有子类；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/72ef8a4a826c7ee84f92f1e384668b2c.png)

#### 2、final修饰方法：该方法不能被重写；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/598fa7d588a4e54f60cc2e8276393185.png)

#### 3、final修饰属性：此属性变为常量（一般大写）； 
* 此常量没有默认值，可以显示的赋值；
* 可以用于代码块和构造器；
* 用static与final同时修饰一个常量时，该常量为“全局常量”；
  
      ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/cb31ffd9c3a0a8726abd68332b1798a1.png)
  
      ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/3c9f677fa1971e45b823bbb057c8e1ae.png)
      
# 2.abstract修饰符（抽象）
## 作用
### 1.修饰类 ：成为**抽象类**：
 * 没有具体的实例，只是为了提供一些方法和属性给子类使用
 * 不可以被实例化

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f856e35dc6fddb38040e1d8d8c0d1fe4.png)

 * 有构造器并且可以被定义（类都有构造器）
  ```java
 public class Main {
	 public static void main(String[] args) {
	    Preson r1=new Student();//无法直接实例化就使用虚拟方法调用
        r1.eat();
  	  }
	}
	abstract class Preson {
	  public void eat(){
 	 }
	  public Preson(){
      System.out.println("XXXX");
 	 }
	}
	class Student extends Preson{
    public void eat(){
        System.out.println("HHH");
 	   }
		}
```

输出结果：![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0932bafc7adf8934d0ff63439cb6cad5.png)

#### 2.修饰方法 ：成为**抽象方法**：
* 给子类预留方法，子类根据自己的情况继承后重写；
* 不被使用但是功能保留；
* 无方法体，末尾用`;`结束
  ```java
  abstract class Preson {
    abstract void eat();
    abstract void sleep();
  }
  ```
* 抽象方法所在的一定是抽象类
* 抽象类中的不一定是抽象方法
* 如果子类继承了抽象类
  1.重写所有方法：可以实例化对象；
  2.没有重写所有方法：不可以被实例化；

#### 3.不能~
* 不能用来修饰属性、构造器；
* 不能与Private（子类不能覆盖和重写声明为Private的方法）、final、static共用；

 
# 3.interface关键字（接口）
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
**作用**：
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
* 实现必须重写接口中所有的抽象方法，如果没有则会成为一个抽象类，不可被实例化
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

**总结**：
接口主要用来定义规范，解除耦合关系（互相作用又互相影响）；
接口是一种不需要考虑层次关系的特殊的抽象方法；

---
title: "Java简单笔记——泛型"
publishDate: 2025-04-01
source: "https://blog.csdn.net/HJS1453100406/article/details/107122836"
tags:
  - '未分类'
description: '- 2.为什么要有泛型？'
language: 'Chinese'
---

#### 泛型

- [1.什么是泛型？](#1_2)
- [2.为什么要有泛型？](#2_12)
- [3.泛型的使用](#3_96)
- [4.自定义泛型类](#4_127)
- [5.泛型类的继承](#5_213)
- [6.泛型和继承的关系](#6_223)
- [7.通配符](#7_257)
- [8.泛型方法](#8_278)
- [9.补充](#9_313)

## 1.什么是泛型？

泛型将接口的概念进一步延伸，“泛型”的字面意思就是广泛的类型。类、接口和方法代码可以应用于非常广泛的类型，代码与它们能够操作的数据类型不再绑定在一起，同一套代码可以用于多种数据类型，这样不仅可以复用代码，降低耦合性，而且还提高了代码的可读性以及安全性。

```
public class Main {
    public static void main (String [] args){
        List<Integer> a=new ArrayList();
        //其中<Integer>就是泛型
    }
}
```

## 2.为什么要有泛型？

在Java中，所有操作的类的都可以视为Object类的子类。对于集合来说，添加、删除、修改等操作时不考虑类型。但是很多的时候，我们需要程序只能处理我们规定的类型。  
 ![在这里插入图片描述](images/blog_migrate_ec9887125590522ed8315453cc4cc240_png.png)  
 我们定义一个集合，按照要求规定我们想让他**只能**处理`Integer`类型的数据；

```
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;
class MainTest {
    @Test
    void test1() {
        List list=new ArrayList();
        list.add(123);
        list.add(456);
        list.add(789);

        for (int i = 0; i <list.size() ; i++) {
             int n=(Integer)list.get(i);
            System.out.println(n);
        }
    }
}
```

![在这里插入图片描述](images/blog_migrate_fec11e2a2c4e15b0bceffa831e915fa5_png.png)  
 看似没有什么问题，但是，如果在添加的时候添加的不是`Integer`类型的呢？

```
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;
class MainTest {
    @Test
    void test1() {
        List list=new ArrayList();
        list.add(123);
        list.add(456);
        list.add(789);
        list.add(new String("AA"));//在这里添加一个String类型的数据
        //没有进行数据转换
        for (int i=0;i<list.size();i++){
            System.out.println(list.get(i));
        }
        
        /*for (int i = 0; i <list.size() ; i++) {
             int n=(Integer)list.get(i);
            System.out.println(n);
        }*/
    }
}
```

![在这里插入图片描述](images/blog_migrate_775b0658b53eeac9e4e155d688b26035_png.png)  
 我们可以看到，当没有进行数据转换的时候，无论什么类型都可以添加进该集合，要解释这一点也并不难，因为集合中操作的就是Object类。  
 ![在这里插入图片描述](images/blog_migrate_f605c0622a961e8e7404773a65bc1190_png.png)  
 可是我们要求是只能处理`Integer`类型，继而我们可能就会遇到**拆箱**的操作（拆箱：引用数据类型包装类转换为基本的数据类型），也就是类型转换。

```
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;
class MainTest {
    @Test
    void test1() {
        List list=new ArrayList();
        list.add(123);
        list.add(456);
        list.add(789);
        list.add(new String("AA"));//在这里添加一个String类型的数据
        //没有进行数据转换
        /*for (int i=0;i<list.size();i++){
            System.out.println(list.get(i));
        }*/
        //进行拆箱
        for (int i = 0; i <list.size() ; i++) {
             int n=(Integer)list.get(i);
            System.out.println(n);
        }
    }
}
```

![在这里插入图片描述](images/blog_migrate_da23e954204396d992c56fe2b87deb49_png.png)  
 amazing！  
 no~ No surprise at all  
 因为`Integer`不兼容`String`

那怎么办？看看标题—— ——用泛型啊~

## 3.泛型的使用

泛型的使用格式有两种：

- `List <E>` : 其中E的类型的变量
- `List <String>` :其中String是类型的常量

先说第二种，根据上面的要求，我们可以在程序中这样写：

```
List <Integer> list=new  ArrayList<Integer>();
//或者（JDK7.0以后）
//List <Integer> list=new  ArrayList();
```

当我们这样写了以后，其实就规定了该集合中只能存放`Integer`型数据；  
 ![在这里插入图片描述](images/blog_migrate_5896e0c4f70de31453e12deabe105be1_png.png)  
 ![在这里插入图片描述](images/blog_migrate_b999ea3fed14684e5e87b8b2402c687d_png.png)  
 好了，问题解决了。但是，为什么我们可以在集合中使用泛型呢？

好办，查看一下源码：  
 ![在这里插入图片描述](images/blog_migrate_210e47674cf353054afa782e61d05d5b_png.png)  
 同样的，我们看一下**Map**集合：  
 ![在这里插入图片描述](images/blog_migrate_7220f9f0c6b2362ce8a47f03a4bef322_png.png)  
 但是Map集合比较特殊，他的定义是这样的；  
 ![在这里插入图片描述](images/blog_migrate_f6d4db26fc2b3d5ca07719e06ebb879b_png.png)  
 ![在这里插入图片描述](images/blog_migrate_9b3b7a090e02860b76ed588faabc98e6_png.png)

*可以看到，集合中早已经使用到了泛型，但是却没有声明是什么类型，只是用一些大写字母来表示，我们把这些字母称之为**类型的变量**。用于声明该**类**（或是**接口**）使用到了泛型，而具体的类型则是在使用的时候去指定，如果不指定，则默认的类型为`Object`*

或者说，如果想用到泛型，则需要把该实现类声明为**泛型类**；

为了更好的说明，我们可以自定义一个泛型类；

## 4.自定义泛型类

首先，照猫画虎

```
//自定义泛型类
import java.util.ArrayList;
import java.util.List;

public class Main<T> {//不确定泛型T的类型
  private int orderID;
  private String orderName;
  private T t;

  List<T> list=new ArrayList();//当T被确定以后自动创建一个该类型的链表；

  public void add(T t){
      list.add(t);
  }

  public T getT(){
      return t;
  }
  public void setT(){
      this.t=t;
  }
  public int getorderID(){
      return orderID;
  }
  public String getOrderName(){
      return orderName;
  }

  public void setOrderID(int ID){
      this.orderID=ID;
  }

  public void setOrderName(String Name){
      this.orderName=Name;
  }

    @Override
    public String toString() {
        return "Main{" +
                "orderID=" + orderID +
                ", orderName='" + orderName + '\'' +
                ", t=" + t +
                '}';
    }
}
```

然后，开始使用

```
//自定义泛型类的使用
import org.junit.jupiter.api.Test;

public class Test1 {
    @Test
    public void test1(){
        Main main =new Main();//这里没有指定类型
    }
}
```

这里没有指定泛型，所以默认的类型为`Object`  
 ![在这里插入图片描述](images/blog_migrate_c2dd83a203bab72260a5bee7757d62a9_png.png)

```
//自定义泛型类的使用
import org.junit.jupiter.api.Test;

import java.util.List;

public class Test1 {
    @Test
    public void test1(){
        Main<Integer> main =new Main<Integer>();

        main.setT(123);
        System.out.println(main.getT());

        main.add();
        List<Integer> list=main.list;
        System.out.println(list);
    }
}
```

一切正常：  
 ![在这里插入图片描述](images/blog_migrate_8d2ecd1d2f938d44c706c2ce51d9f4ac_png.png)

## 5.泛型类的继承

关于继承，有个很重要的特点就是子类的实例可以赋值给父类的引用：  
 ![在这里插入图片描述](images/blog_migrate_1436e6f8b0af85a3c92fa608630331d8_png.png)  
 泛型类的继承可以分成两种，一种是先指明泛型的类型：  
 ![在这里插入图片描述](images/blog_migrate_049986fb1516ba8529de12bcf4f2b2b1_png.png)  
 一种是不指明类型：  
 ![在这里插入图片描述](images/blog_migrate_0b4f5e66c4ac6b402ba71adcc416ca70_png.png)  
 效果和刚才一样，对于指定类型的子类，只能处理所指定的类型；而对于没有指定类型的子类，类型还是`Object`  
 ![在这里插入图片描述](images/blog_migrate_1279210ddae2c2fdb3f087af7288270a_png.png)  
 ![在这里插入图片描述](images/blog_migrate_4cf542da1ad0cb14e492a374f5ae982f_png.png)

## 6.泛型和继承的关系

我们都知道，根据Java中多态的特性，子类的对象可以赋值给父类的引用，  
 例如：  
 ![在这里插入图片描述](images/blog_migrate_bfeb1b20967482fc718da95db7c1f0f1_png.png)  
 但是在泛型中，子类和父类的关系却不是这样；  
 为了方便测试，我们实例化两个`list`的对象；  
 将其中一个的泛型定义为object，另一个定义为String  
 ![在这里插入图片描述](images/blog_migrate_32eabb75a8a8ff31f37a3dc0dbe29bd4_png.png)  
 然后，将`list2`赋值给`list1`；  
 ![在这里插入图片描述](images/blog_migrate_dc1d03766fe2ccd74966aa2adfd54ccd_png.png)  
 可以看到，直接报错，错误原因是类型转换异常；

所以，有了第一条结论：

```
如果A是B的子类，那么List<A>则不是List<B>的子类(子接口)
```

要解释这个并不难，

例如，如果泛型直接存在着这种可以赋值的关系，那么如下的操作便可以实现；![在这里插入图片描述](images/blog_migrate_bae600287991c75b214d90f523873db5_png.png)  
 因为可以实现，那么此时的`list1`与`list2`便操作的是同一片内存空间；  
 但是又因为两个对象都具有`list`的方法，所以便可这样：  
 ![在这里插入图片描述](images/blog_migrate_eeced2fb4fb40b3666f1c8afb9931860_png.png)  
 这里便出现了问题；  
 此时的`list1`和`list2`是同一片内存区域，如果我可以`list1`中添加`Integer`类型的数据，那么`list2`所指向的空间就会多出一个`Integer`类型的数据；但是之前已经给`list2`做了泛型限定啊（只能处理`String`类型数据）。

所以，便有了这样的矛盾：**如果可以赋值，则泛型没有存在的意义；**

所以不能用；

继而我们可以推导出：**泛型中所声明的类型都是并列的关系**

我就想用继承，能不能用？

可以，使用**通配符**；

## 7.通配符

这个非常简单，先说结论：**List <?>是所有List泛型的父类**  
 这其中的<?>，就是通配符  
 测试：  
 ![在这里插入图片描述](images/blog_migrate_651d2f372e01f93a04e9eddb3b959f0c_png.png)  
 通配符的作用一般用于写一些公共的方法：  
 ![在这里插入图片描述](images/blog_migrate_8a9e3d544e3a007511ca17db4f6acea7_png.png)  
 \*关于通配符还有两个重要的关键字：`extends` 和`super`;

```
	//public void show(List<? extends A > list){}
	List<? extends A >
	//可以处理的数据类型有A和A的子类；
	/*如果B是A的子类，可以将List<A>的对象或List<B>的对象赋值给List<? extends A > */

    //public void show(List<? super A > list){}
    List<? super A >
    //可以处理的数据类型有A和A的父类；
    /*如果B是A的父类，可以将List<A>的对象或List<B>的对象赋值给List<? extends A > */
```

## 8.泛型方法

泛型方法的定义：

```
	//泛型方法
    //<E>:指定方法类型
    // E：方法返回值的类型
    public <E> E getE(E e){
        return e;
    }
```

泛型方法的使用：

```
Integer i=main.getE(123);
String s=main.getE("A");
Double d=main.getE(4.3);
```

可以看到，泛型方法的原始类型不是`Object`  
 ![在这里插入图片描述](images/blog_migrate_e418a11ad8deac6f290250aea8345d25_png.png)当通过对象调用泛型方法，可以直接使用数据指明类型，并且是一次性的。  
 输出结果：  
 ![在这里插入图片描述](images/blog_migrate_98ea951f709f79b6537a4247fdf60903_png.png)  
 有什么用？  
 举个小实例：**实现集合到数组的复制**：

```
//实现数组到集合的复制
    public <G> List<G> fromArrayTolist(G [] g,List<G> list){
        for (G g1:g){
            list.add(g1);
        }
        return list;
    }
```

结果：  
 ![在这里插入图片描述](images/blog_migrate_26e934f97e0aa4b265c354c512c1ab50_png.png)  
 其实，这个方法的灵魂在于—>**它可以操作任何类型**

## 9.补充

泛型还有几个特点在这里做补充：

1.**不能在静态的方法中使用泛型；**

```
public static void show(){
        System.out.println(t);//t是泛型实例化的对象
    }
    
    //或者
    
public static <T> t show(){
        System.out.println(t);
    }
```

不能使用的原因是因为静态方法是随着类的加载而加载，优先级要高于泛型。

2.**不能在`try-catch`中使用类的泛型的声明；**  
 这个不举例了，不确定的类型怎么处理？

3.**声明为通配符的集合可以被读取，但不能被写入**

```
@Test
    public void Test3(){
     List<String> list1=new ArrayList<>();
     list1.add("AA");list1.add("BB");
     List<?> list2=null;
     list2=list1;

     Iterator<?> i=list2.iterator();//使用迭代器；

        while(i.hasNext()){
            System.out.println(i.next());
        }
    }
```

读取操作可以运行：  
 ![在这里插入图片描述](images/blog_migrate_4228820f1b15523dec1392fd23bd94f5_png.png)  
 但是在写入的时候；  
 ![](images/blog_migrate_0b51dda4a232dc52b399824dec48dbbd_png.png)  
 写什么？写不了？也不是，可以存一个值；  
 ![在这里插入图片描述](images/blog_migrate_549b0b3ad1aa77c1602a1e8e47520bfc_png.png)  
 还有没？没了~

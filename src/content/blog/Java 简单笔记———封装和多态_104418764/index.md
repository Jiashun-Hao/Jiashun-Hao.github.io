---
title: "Java 简单笔记 -- 封装和多态"
publishDate: 2020-02-20  
description: '笔记'
tags:
  - Java
language: 'Chinese'
---

序言：首先说明一点，其实本篇主要是叙述面向对象三要素之一的“多态”，但是我发现我好像没有专门写和“封装”有关的博客，在加上我目前理解的层次水平不是很高，才疏学浅的我觉得“封装”相对于“继承”和“多态”是一个最好理解的要素，在这里简单说一下即可，所以，即使“封装”和“多态”关系不是很大，但还是将两篇合为一篇（真的不是我懒）。
# 一.封装：
Java 面向对象的三要素：**封装**，继承，多态；
## 1.概念：
==JAVA类的封装就是指隐藏对象的属性和实现细节,仅对外提供公共访问方式。 主要好处是: 将变化隔离。 便于使用 提高重要性。 提高安全性。==
封装的概念比较抽象，但是如果理解了，会发现它确实是这么一回事，如果用我自己的话说就是：
<font color = red>利用关键字，将一个类中的属性和方法设置为只能被当前所在该类中的**方法**使用和修改，若其它的类想调用和使用该类中的属性和方法，只能通过该类中开放的方法所调用</font>
还是有点蒙？Don't worry!
接下来使用代码进行说明，在说明之前，先回忆一下四个关键字的使用：

[(！*1.)访问修饰符关键字：public、private、protected、和default（缺省）的区别](https://blog.csdn.net/HJS1453100406/article/details/104204139)

ok，进入代码~

### 2.代码叙述：
```java
public class TestAccount {
    public static void main(String[] args){
       Person xiaoming=new Person();
    }
}

class Person{
    private int age;
    private String name;
}
```

嗯，按理说这时候`xiaoming`	这个对象被实例化了，可以使用`对象.属性/方法`使用，但是，真的是这样吗？

![](https://i-blog.csdnimg.cn/blog_migrate/6257e6a4a710bd3acb33321d5b6f0ff5.png)

可以看到，此时的`xiaoming`并不能直接调用该类中的属性，为什么？
原因在于age和name前面的修饰符，public：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/702ed457b2403cb90ebc040112c859b9.png)

被public所修饰了以后，别的类中的对象自然是调用不了。可以说，此时的这个类就以经被**封装**；

那么，如果我还想调用，怎么办？
方法也很既简单：
1.直接修改前面的修饰符，将他们改为可以被获取的状态（public）；
2.在“封装的类”中留一个（或多个）公共的 **方法** 作为 **“缺口”** ，他们即在该类当中，又是公共的，这样就可以通过这些方法作为“跳板”来调用方法啦！
```java
public class TestAccount {
    public static void main(String[] args){
       Person xiaoming=new Person();
        xiaoming.setAgeName("小明",12);//这里的方法可以写出，所以用方法调用；
       System.out.println("姓名 ："+xiaoming.getName()+" 年龄： "+xiaoming.getAge());//同理
    }
}

class Person{
    private int age;
    private String name;

    public void setAgeName(String name,int age) {
        this.age = age;
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }
}
```
这里还涉及到两个方法，get() ---“获取”和set() ---“设置”;
其实，这里的方法名不写get和set也可以，但是这样写是作为一种规范，所以，就这样写把，总是好的~

输出结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/3e0a11930b49e6a28629fbdd764b10f3.png)

over~~

# 二.多态：
Java 面向对象的三要素：封装，继承，**多态**；
## 1.一些必要的概念：
1.<font color = red>多态是指一个事物的多种形态，它的构建基于继承和重写；</font>
2.<font color = red>虚拟方法调用：通过父类的引用指向子类的实体，从而调用在子类中被子类所重写的父类的方法</font>
3.<font color = red>程序运行时候分为两部分：编译状态和运行状态；对于多态来说，编译时候看等号前面，运行时候看等号后面</font>

### 2.代码演示：
看完概念是不是有点绕？不急，我们用代码来一步一步的说明；
```java
public class TestAccount {
    public static void main(String[] args){
        Class xiao=new Student();//这就是虚拟方法调用；父类引用子类实体；
        //其中： Class xiao为父类引用：编译的时候看这个；
        // 其中： new Student()为实体；运行的时候看这个；
        
    }
}

class Class{//父类
    int age;
    String name;

    public void setAgeName(String name,int age) {
        this.age = age;
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }
}
class Student extends Class{//子类
 	int id;//多设置一个属性，方便测试
    public int getAge() {//重写方法；
        return super.age+1;
    }

    public String getName() {//重写方法；
        return super.name+"1";
    }
}
```
我们试着调出`xiao`的属性和方法，看看它到底具有那些属性和方法；
如图：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/56a8857dbb167a9b5b331c2313b1bd5c.png)

可以看出，`xiao`不具备子类Student特有的“id属性”

难道是`xiao`只是调用了父类？

我们利用` public void setAgeName(String name,int age)` 给name和super赋值，再利用` public int getAge()` 和` public String getName()`将其调出，因为在子类中用的是super，所以子、父类操作的是同一块区域，只是他们的方法不同；

```java
public static void main(String[] args){

        Class xiao=new Student();
        xiao.setAgeName("xiaoming",10);
        System.out.println("姓名 ："+xiao.getName()+" 年龄： "+xiao.getAge());

    }
```
输出结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ffc79fb850aac33bcc95c6372b0ae74e.png)

很明显，所使用的方法是子类student中的方法，因为输出结果相较于父类都加了1；到这里，我们就可以理解这句话：“通过父类的引用指向子类的实体，从而调用在子类中被子类所重写的父类的方法” ；也大概了解了“多态”；

#### 3.类型转换：
**1.作用**：
在对象被实例化了以后，还可以进行类型的转换，**作用是为了在主类和各个子类中切换类型，从而使用不同类型中的不同方法；** 
==这也是多态的最重要的思想==

类型转换的方式有两种：
第一.向上类型转换 ：父类 a = new 子类（）; 
第二.向下转换，使用强制符：子类 b=（子类名）a（原父类对象）；
```java
  1.Class xiao=new Student();//向上类型转换，类型为父类；
  2.Student hua=(Student) xiao;//向下转换，类型为子类；
```
使用第二行代码以后。我们可以看到，对象`hua`具有了子类的全部属性，包括'id';

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/51f46b18350db3595a3c698086a07fa7.png)

**2.必要的几点说明：**
1.同为一个父类多个子类，不能相互转换；
2.只有当a对象为b类的实例，a对象才可以转换为b类的对象；
如何判断a对象是否为b类的实例？
这里有一个关键字 `instanceof`
```java
if (对象（a） instanceof 类（b）) {}
//如果对象a是b对象的实例，结果为ture；如果不是，结果为false；
```
测试：
```java
 if (hua instanceof Student) {
            System.out.println("YES");
        }
```

结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/93f61edb85a7fab223a7428bec9f94d9.png)

判断实例还有一种情况：如果对象a是类b的实例，那么a也一定是**b的父类**的实例；
测试：
```java
 if (hua instanceof Class) {
            System.out.println("YES");
        }
```
结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/70a338a71be59dd0bb4567e1e481b471.png)
over~~

2020年2月20日初写

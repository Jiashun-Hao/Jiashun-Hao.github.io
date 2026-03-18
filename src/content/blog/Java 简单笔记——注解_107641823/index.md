---
title: "Java 简单笔记 -- 注解"
publishDate: 2020-07-29
description: '笔记'
tags:
  - Java
language: 'Chinese'
---

# 一、概述
* 从JDK5.0开始，Java新增加了对元数据（MetaData）的支持，也就是注解（Annotation）
* 注解其实就是代码中的**特殊标记**,这些特殊标记可以在类加载、编译、运行时被读取，并执行相应的处理。使用注解最大的作用就是在不改变原程序逻辑的情况下添加补充信息。
* Annotation可以像修饰符一样被使用，可用于修饰包、类、构造器、方法、成员变量、参数、局部变量的声明，这些信息被保存在Annotation的 **"name=value"** 对中。
* Annotation 能被用来为程序元素（类、方法、成员变量等）设置元数据。
* 上面的概念都是我抄的，如果看不懂没关系，只要知道注解是一种标记，继续往下看就行~~
<br>

# 二、三个基本的Annotation
Java中有三个基本的注解：

### 1.@Override
`@Override`的作用是基于继承，并且该注释只能	用于方法，其总用是**限定重写父类的方法**

举个例子：

1.先创建一个类，提供方法；
```java
class Person{  
    public String walk() {
        return "Max";
    }
}
```
2.声明一个子类，并使其继承该类，并重写方法；
为了区分两个方法不同，我将子类的返回值设置为“Hello”；
```java
class Student extends Person{

    public String walk() {
        return "Hello";
    }    
}
```
3.然后，在入口中进行虚拟方法调用
```java
public class Main {
    public static void main(String[] args){
      Person stu=new Student();
      System.out.println(stu.walk());
    }
}
```
测试：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e7c6d40b789df490f8480dbb0264352f.png)

很明显，父类的引用指向子类的实体，也就是虚拟方法调用，输出的结果是子类重写的方法；

但是，如果我不小心把子类中重写的方法写成`wa1k`呢？（本该是`walk`,这里将字母`l`写成了数字`1`）

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f01e19b3c966e317670a19217e411434.png)

实际执行的方法就变成了父类的原方法；

由于IDEA的强大，我们在这里可以很清楚的看到提示——子类重写的方法并没有被调用；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/81a67632f63ea1c009d7d0a97240073f.png)

可是如果我们用的不是IDEA呢？如果我们的程序很庞大呢？
这个可能会出现的错误又因为没有违反逻辑或编译错误所以不会终止程序也不会报错。

是不是很头疼？

好了，这时候终于轮到`@Override`登场了

前面说到`@Override`的作用是**限定重写父类的方法**，其实就是这个意思~

我们在子类的重写方法的前面添加了`@Override`

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a6522a114b6cd52a2eac709e2d82b7fd.png)

**可以看到，当子类的方法确实为父类方法的重写时（两个方法名字一样），没有任何问题。**

**当子类的方法不为父类方法的重写但是又添加了`@Override`时，编译器报错了。**

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9e2e78d7a596fc58a564416503d0e369.png)

==并且是一个致命的错误；==

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/70827cebeb64a2c8572cd855b4d7ed78.png)

<br>
### 2.@Deprecated
`@Deprecated`作用是表示某个程序元素（类、方法等）已经过时或者即将被淘汰。

再举个很形象的例子~

如图：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d35a85945a47a5b7c91eeef555ad0735.png)

没错，`@Deprecated`的出现就意味着它标志的程序元素像房子一样被写了一个“拆”字；该程序元素（类、方法等）已经或者将要被淘汰，会有新的程序元素来实现该程序元素的功能。

**但是，被标记的程序并非不能使用，`@Deprecated`并没有强制性，它只是一种标记**![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5007de19287bc2b3c1fbbf8c8c3df8c1.png)
在程序开发过程中，我们要尽可能的避免使用被`@Deprecated`所标记的程序元素；
1.被标记就代表会被淘汰，使用被淘汰程序元素的程序在新的JDK中会报错；
2.只要是被标记程序元素就一定可以找到替代的程序元素；

==**总之：被`@Deprecated`标记就像自己的房子被写了“拆”，虽然目前还是可以居住但是尽量不要，万一某一天就塌了......
不过，只要是被写了“拆”的房子，政府或者企业一定会给一套新的更好的住所。**==
<br>

### 3.@SuppressWarnings
`@SuppressWarnings`的出现在我看来主要是对程序开发者的一种“慰藉”，其作用是**抑制编译器警告**；

要知道，编译器警告这玩意说他有没用吧，有些时候确实能帮助我们避免很多错误；要说他有用吧，有些时候明明程序没有问题可以正常跑，但是他还是在哪里显示一个黄色叹号，看起来很烦！！！

于是乎，对于一些我们确信的没必要的提示信息，我们便可以使用`@SuppressWarnings`；

例如：我在这里定义了一个变量 i，但是我没有使用它，编译器便会发出警告

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/99129ba76cdf9e672e160aa5bcebb1ed.png)

这时候，我们就可以使用`@SuppressWarnings`

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e627071d5abdfbe759321687f973b9ed.png)

关于`@SuppressWarnings`括号里面的内容应该写什么，这里有一张表格附上：
（表格并非原创，来源如下）

[表格来源](https://blog.csdn.net/u012994320/article/details/83083392)

关键字 | 用途
----- |------
`all` |to suppress all warnings（抑制所有警告）
`boxing`|to suppress warnings relative to boxing/unboxing operations（要抑制与箱/非装箱操作相关的警告）
`cast` |to suppress warnings relative to cast operations（为了抑制与强制转换操作相关的警告）
`dep-ann` |to suppress warnings relative to deprecated annotation（要抑制相对于弃用注释的警告）
`deprecation`| to suppress warnings relative to deprecation（要抑制相对于弃用的警告）
`fallthrough` |to suppress warnings relative to missing breaks in switch statements（在switch语句中，抑制与缺失中断相关的警告）
`finally ` |to suppress warnings relative to finally block that don’t return（为了抑制警告，相对于最终阻止不返回的警告）
`hiding` |to suppress warnings relative to locals that hide variable（为了抑制本地隐藏变量的警告）
`incomplete-switch` |to suppress warnings relative to missing entries in a switch statement (enum case)（为了在switch语句（enum案例）中抑制相对于缺失条目的警告）
`nls` |to suppress warnings relative to non-nls string literals（要抑制相对于非nls字符串字面量的警告）
`null` |to suppress warnings relative to null analysis（为了抑制与null分析相关的警告）
`rawtypes` |to suppress warnings relative to un-specific types when using generics on class params（在类params上使用泛型时，要抑制相对于非特异性类型的警告）
`restriction` |to suppress warnings relative to usage of discouraged or forbidden references（禁止使用警告或禁止引用的警告）
`serial` |to suppress warnings relative to missing serialVersionUID field for a serializable class（为了一个可串行化的类，为了抑制相对于缺失的serialVersionUID字段的警告）
`static-access` |o suppress warnings relative to incorrect static access（o抑制与不正确的静态访问相关的警告）
`synthetic-access ` |to suppress warnings relative to unoptimized access from inner classes（相对于内部类的未优化访问，来抑制警告）
`unchecked ` |to suppress warnings relative to unchecked operations（相对于不受约束的操作，抑制警告）
`unqualified-field-access ` |to suppress warnings relative to field access unqualified（为了抑制与现场访问相关的警告）
`unused ` |to suppress warnings relative to unused code（抑制没有使用过代码的警告）
<br>

另外，`@SuppressWarnings`内部可以有多个属性同时存在，其格式如下：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/78ca435fe1cce725f6c6cc02fb5276fc.png)
<br>

# 三、如何自定义注解
自定义一个注解很简单，其用到的关键字为`@interface`；
```java
public @interface Main {
      String value() default "hello";
       String[] value1() default {"word","hello"};
}
```
其中，`String`表示注解的类型，如果注解有多个内容，即为数组； 
`value()`可以看作是属性，`default`后面的内容为默认值；

定义好了以后便可以使用：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9596083652825b80a26a74c6621ee79b.png)

可以看到，没什么效果；

那怎么样才能有效果？

不急，我们先看一下Java中注解的源码（`@SuppressWarnings`的源码）；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1c410e35e52078540739ac10a7c4b9f7.png)

可以看到，除去不影响程序注释（注意不是注解），`@SuppressWarnings`的源码格式和我们自定义的几乎一样，唯一的区别就是在于上面的两行代码；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ee2f35a6715b7e90fe0b684c4a92f9e4.png)

没错，也就是这两行代码发挥了作用，使得注解有了效果。

这两行代码又有一个新名字——**元注解**；
<br>

# 四、元注解
作用：JDK的`元Annotation`用于修饰其它的`Annotation`
分类：Java中提供了4种元注解：`@Target`、`@Retention`、`@Documented`、`@Inherited`

### 1.@Target
作用：`@Target`表示**注解可以被使用的地方（作用域）**，其用法是使用枚举类**ElemenetType**中的参数；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c80969396ec79649c257e94ad577a2c3.png)

也可以这样（注意看包）：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1da43f536c75980e16f0ff1676820a16.png)

**ElemenetType**中的参数及其作用如下：
参数  | 目标（作用域）
--- | ---
ElementType.TYPE|类、枚举类、接口
ElementType.FIELD|字段、枚举的常量
ElementType.METHOD|方法
ElementType.PARAMETER|方法参数
ElementType.PACKAGE|包
ElementType.ANNOTATION_TYPE|注解
ElementType.LOCAL_VARIABLE|局部变量
ElementType.CONSTRUCTOR|构造函数

（表格非原创，数据来源于：[Java注解](https://blog.csdn.net/sw5131899/article/details/54947192)）

<br>
### 2.@Retention
作用：**限定注解写在什么级别的位置上（注解的保留位置），也可以理解为被修饰注解的生命周期（保存时间）的长度**；其用法是使用枚举类型 **RetentionPolicy**中的参数； 

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/76bc1448b322fa89fb8fe0d5649f2ee4.png)

**RetentionPolicy**的参数及作用如下：
参数  | 目标（作用域）
----|----
RetentionPolicy.SOURCE|注解仅存在于源码中，在class字节码文件中不包含；即在编译的时候不考虑；
RetentionPolicy.CLASS|默认的保留策略，注解会在class字节码文件中存在，但运行时无法获得；
RetentionPolicy.RUNTIME| 注解会在class字节码文件中存在，在运行期间也保留并可以通过反射获取到

（表格非原创，数据来源于：[Java注解](https://blog.csdn.net/sw5131899/article/details/54947192)）

<br>

### 3.@Documented
作用：将此注解包含在 javadoc 中 ，它代表着此注解 **会被javadoc工具提取成文档。** 在doc文档中的内容会因为此注解的信息内容不同而不同。相当与@see,@param 等。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/4623bb425bae8e6bc85ffed5aa0b8cdb.png)

<br>
###  4.@Inherited
作用：此注解基于继承，**被`@Inherited`所修饰的父类其子类可以继承父类中的注解；**

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0a48a30c4c9d75d0f691d697d80ef0c0.png)

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/91c5ea918313c45301408a33e14e7c68.png)

over~


---
title: "Java 简单笔记 -- File类"
publishDate: 2020-07-30
description: '笔记'
tags:
  - Java
language: 'Chinese'
---

@[TOC](File类)
随便说点：之前的Java数据操作都是在内存中完成，开发环境关闭以后便会消失；从这一章开始进入**操作文件**的阶段，其核心的内容是**IO流**；而**File类**是IO流的前导内容；
<br>
# 一、File类
**凡是与输入、输出相关的类、接口等都定义在Java.io包下**，相同的，File类便是存在于Java.io包下；
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8e184525056908fdfa7b9a1468c76241.png)
<br>
File类是一个特殊的类，但它具有一般类所具有的一切，其特点有如下几条：

* ==**File是一个类，并且构造器可以创建其对象，此对象对应着一个文件或者文件夹（文件目录）；**==![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8a66c99b9d8950f87a7c4420cbca67d3.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/17591d792261e40006b34fd185ec5924.png)

* File类对象与平台无关；（Java是跨平台语言）；
* File类中的方法，仅仅涉及到操作层面，如创建、删除、重命名等；无法操作或者修改文件内容信息（IO的工作）；
* File类的对象常作为IO流的具体构造器的形参，也就是位置；
<br>

# 二、构造器
前面说到File类的构造器是可以创建对象的，而对象表示的则是文件或者文件夹（文件路径），书写的格式则有四种：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5b9c56a620cf35bd51b8e415afb80f30.png)
## 1.File(String pathname) 
**作用：** 该构造方法是通过将给定路径名字字符串转化为抽象路径名来创建一个File的实例；（[相对路径、绝对路径和抽象路径对比](https://blog.csdn.net/lovejavaloveworld/article/details/41477783)）

其中，**pathname** 表示路径名称，可以是文件或者文件夹；
```java
//两种写法都对，不同的地方在于Test1是文件，Test2是文件夹。
File file1=new File("E:/Test1.text");
File file2=new File("E:\\Test2");
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/17591d792261e40006b34fd185ec5924.png)<br>

## 2.File(String parent, String child)
**作用：** 该构造方法是根据定义的父路径和子路径字符串（包含文件名）创建一个新的File对象；（[父路径和子路径的概念](https://zhidao.baidu.com/question/574903494.html)）
```java
File file1=new File("E:/","Tes1.text");
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/7ab36d64a8c5006ce9554c0adff546d0.png)<br>

## 3.File(File parent, String child)
**作用：** 该方法时根据parent抽象路径和child路径名字来创建一个新的File对象。
```java
File file1=new File("E:/Tes1");
File file2=new File(file1,"Tes2.text");
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/3c37c57008d82c91aca8a963de6c1a13.png)
## 4.File(URI uri) 
**作用：** 通过将给定的 file: URI 转换成一个抽象路径名来创建一个新的 File 实例。（[URL和URI的区别](https://www.jianshu.com/p/ba15d066f777)）
抱歉，关于具体用法和实例暂时还没有找到，仅仅是通过查询API得知有此用法，但是我也没用过。此处查缺待补；
<br>

# 三、方法
关于类的核心内容无外乎就是该类的作用以及所具有的方法，File类也不例外；前面也有说到，File的方法仅仅是操作文件，并不会改变文件里面的内容；
## File中常用的方法
方法|返回值类型|作用
---|---|---
getName()|String|获取文件名称
getParent()|String|获取文件的父路径（字符串），如果此路径名没有指定父目录，则返回 null
getParentFile()|File|获取文件的父路径（抽象路径名），如果此路径名没有指定父目录，则返回 null
canRead()|boolean|判断文件是否可读
canWrite()|boolean|判断文件是否可写
canExecute()|boolean|判断文件是否执行
exists()|boolean|判断文件是否存在
length()|long|判断文件的长度（字节）
getAbsolutePath()|String|获取文件的绝对路径（字符串）
getAbsoluteFile()|File|获取文件的绝对路径（抽象路径名）
 isFile()|boolean|判断文件是否为标准文件或是否存在
 isDirectory()|boolean|判断文件是否是目录
isHidden()|boolean|判断文件是否是隐藏文件
lastModified()|long|返回文件最后修改的时间
renameTo|boolean|文件重命名
<br>

这里只列举出几个比较常用的方法，更多的方法点击这里：[更多方法](https://www.runoob.com/java/java-file.html)

我们在本地建立两个文件来测试一下，其中，Test为文件（里面输入了5个1），Test2为文件架（文件路径）；
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b06699ed5ec6fe9a99c426c082aa934d.png)

```java
import java.io.File;

public class Test {
    public static void main(String[] args){
        File file1=new File("E:\\Test.txt");
        File file2=new File("E:\\Test2");

        System.out.println(file1.isFile());
        System.out.println(file1.exists());
        System.out.println(file1.getName());
        System.out.println(file1.getParent());
        System.out.println(file1.getParentFile());
        System.out.println(file1.length());
        System.out.println(file1.isDirectory());


        System.out.println();

        System.out.println(file2.isFile());
        System.out.println(file2.exists());
        System.out.println(file2.getName());
        System.out.println(file2.getParent());
        System.out.println(file2.getParentFile());
        System.out.println(file2.length());
        System.out.println(file2.isDirectory());

        //单独说一下renameTo()
        //用法很简单，需要新建一个File对象用来标明新的文件名，不能与同一目录下的文件或文件夹重名
        //并且，需要在新的名字里面标明路径和后缀

       File file3 =new File("E:/ceshi.txt");
        System.out.println(file1.renameTo(file3));

    }
}

```
运行结果：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0bd8d51fe8e1977e8137af26725cb1b7.png)
**补充：**
==单独说一下renameTo()，用法很简单，需要新建一个File对象用来标明新的文件名，不能与同一目录下的文件或文件夹重名；并且，需要在新的名字里面标明路径和后缀。==

over~



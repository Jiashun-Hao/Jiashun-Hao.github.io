---
title: "Java 简单笔记 -- 队列"
publishDate: 2020-05-31
description: '笔记'
tags:
  - Java
language: 'Chinese'
---

# 一.队列
数据结构中程序基本可以分为两大类：**线性结构**和**非线性结构**；
* **线性结构代表**：数组、队列、链表和栈；
* **非线性结构代表**：多维数组（包括二维，但是归到这里有些牵强）、树、图、广义表；

（说把数组归到非线性结构有些不妥，但也仅仅只是“有些”；==从本质上来说计算机中没有“多维数组”概念== “多维数组”可以理解为数组的数组，但在内存中他们的存储连续的一条“线”；但是从理解的层面来看，“多维数组”与之对应着“二维表、三维表......”，将他们理解成非线性结构也不是不可）

好了，继续聊队列~

队列的特点是先进先出，这个很重要；举一个很恰当的例子，在实际生活中，银行的  “**叫号系统**”便是队列很好的诠释者 —— —— 按照到银行的顺序依次排号，先来人的优先服务 **（出队）**

有了思路以后事情便开始简单，在进入实际代码前，不妨先将思路整理为一个简单的图（==先默认利用数组实现==）：
* ①MaxSize为数组的长度，MaxSize-1为最大可存储的单元；
* ②front为队列的头元素所在的**前一个位置**，rear表示尾元素所在的**当前位置**；
* ③当front = = rear表示队空；当MaxSize-1 = = rear为队满；
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8e548b370ed49b2c2b2a21521ff96abd.png)
好了，接下来可以写代码了；
```java
import java.util.Scanner;

public class Queue {
    public static void main(String[] args){
      ArrayQueue arrayQueue=new ArrayQueue(5);//4.方便测试所以没有定义太大

      char key=' ';//5.键盘交互，接收用户输入
        Scanner scanner=new Scanner(System.in);

        boolean loop=true;
        while(loop){
            System.out.println("s(show):显示队列");
            System.out.println("e(exit):退出程序");
            System.out.println("a(add):向队列添加元素");
            System.out.println("g(get):向队列取出元素");
            System.out.println("h(head):查看队列的头数据");

            key=scanner.next().charAt(0);
            if (key<97) key+=32; //实现大小写都可判断

            switch (key){
                case 's' :
                    arrayQueue.showQueue();
                    break;

                case 'a':
                   System.out.println("请输入一个数字");
                   arrayQueue.addQueue(scanner.nextInt());
                    break;

                case 'g' :
                    try {
                        System.out.println("您取到的数据为："+ arrayQueue.getQueue());

                    } catch (Exception e){
                        System.out.println(e.getMessage());
                    }break;


                case 'h' :
                     try {
                         System.out.println("当前的头数据为："+ arrayQueue.headQueue());

                     } catch (Exception e){
                      System.out.println(e.getMessage());
                    }break;

                case 'e' :
                    scanner.close();//关闭输入
                    loop=false;
                    break;
            }
        }
        System.out.println("**********程序已退出*********");
    }
}

class ArrayQueue{//1.创建一个实现队列的类

    private int MaxSize;    //队列的最大存储容量
    private int [] array;   //要存储队列的数组

    private int front;   //取出时移动的指针,指向队列前的一个位置;
    private int rear;    //存储时移动的指针,指向队列当前存储到的位置（最后一个数据）;

    //创建队列
    public ArrayQueue(int arrMaxSize){//2.设置构造器
        MaxSize=arrMaxSize;
        rear=-1;front=-1;
        array=new int[MaxSize];
    }

    //判断队列是否空
    public boolean isEmpty(){//3.一些必要的方法
        return rear==front;
    }

    //判断队列是否满
    public boolean isFull(){
        return rear==MaxSize-1;
    }

    //添加数据
    public void addQueue(int q){
        if(isFull()) System.out.println("队列已满，不可添加数据！");
        else {
            array[++rear]=q;//java可以这么写
            System.out.println("添加数据成功");
        }
    }

    //取出数据
    public int getQueue(){
        if (!isEmpty()){
            return array[++front];
        }
        throw new RuntimeException("队列为空");//没有合适的返回值，用异常

    }

    //显示当前队列所有数据
    public void showQueue(){
        if (isEmpty()) {
            System.out.println("队列为空，无可打印数据");
            return;
        }
        for (int i=0;i<array.length;i++){
            System.out.printf("%d ",array[i]);
        }
        System.out.println();
    }

    //返回当前队列的头数据
    public int headQueue(){
        if (isEmpty()) throw new NumberFormatException("队列为空，无头数据");
        return array[front+1];

    }
}
```
运行过程来起来也很正常

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6a5d1e3ea99263f6734ccaa398a6ad48.png)

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0bcc3e856e2590b9e5d3f2e958ec303c.png)


**但！**

“this.笔者是一个粗笨男生，不明白这“但”字的可怕：许多坏事固然幸亏有了他才变好，许多好事却也因为有了他都弄糟。”
<p>

出现了一个问题，继添加和取出后如果继续操作添加，则会出现这样的效果

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/11bda2f661b8968121629ff540abcb75.png)

很明显，上面的代码并没有将存入的值真正的取走，即使指向它的指针rear移动了，但数据还是在那里；

或许有人会说：“那在取出的时候加一个删除或置零的操作不就行了吗？”

可以这么做，但是没用；即使这样做了，已经被使用的空间依旧不能再次被利用

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/96ddd445c181aba00f75451131b30aae.png)

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0c5c8a5545fc5d9628405d0913380300.png)

所以，为了解决这样的“空间浪费问题”，科学家在原有的基础上想到了改进的方法，这也有了下面的结果—— ——**循环队列**
<br>

# 二、循环队列
环形队列产生的原因很简单——**实现队列的可重复利用性** ；
而实现它的关键的则更简单——**取模计算（%）**；

在此之前，先修改一下之前的设定（当然不修改也可以，算法有很多）
* **front:** 指向队列的第一个元素；
* **rear：** 指向队列最后一个**元素的后一个位置**；
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/384b7665d20cb4cc32113596f6c8e425.png)
* **队满的条件：（rear+1）%maxsize == front**；
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/11b8b7d3de0ff551bd0fea8579a7f7dd.png)

* 新建方法：
**当前队列中已经使用的空间个数：(rear+maxsize-front)%maxsize;**
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/bd8108864e77bf1beccc4c61e7d87c8c.png)

当然，随着front和rear的设定更改，有些细节的地方也要随着对应更改；

 * ①可以看出，随着设定的更改，数组里面保留了一个空间作为约定，这样一来之前设置的5个数的存储额只能存4个，所以，我们再给它加一个：
	 ```java
	 //创建队列
   		 public ArrayQueue(int arrMaxSize){//设置构造器
      	  //front与rear默认都是零，不做修改;
       	 MaxSize=arrMaxSize+1;//修改：因为留了一个空间做约定，所以多加一个空间;
       	 array=new int[MaxSize];
    	}
	 ```
* ②队满的判断条件
	```java
	//判断队列是否满
    	public boolean isFull(){
        return (rear+1)%MaxSize==front;//环形队列核心（一）;
    }
	```
* ③添加数据
	```java
		public void addQueue(int q){
        if(isFull()) System.out.println("队列已满，不可添加数据！");
        else {
            array[rear]=q;//修改这里
            System.out.println("添加数据成功");

            rear=(rear+1)%MaxSize;//环形队列核心（二）;
        }
    }
	```
* ④取出数据
	```java
	public int getQueue(){
        if (!isEmpty()){
            int value=array[front];//如果直接返回会被终止,找一个临时变量存放;
            front=(front+1)%MaxSize;//环形队列核心（三）;
            return value;//返回存放;
        }
        throw new RuntimeException("队列为空");//没有合适的返回值，用异常

    }
	```
* ⑤显示队列	
	```java
	public void showQueue(){
        if (isEmpty()) {
            System.out.println("队列为空，无可打印数据");
            return;
        }
        for (int i=front;i<front+SumQueue();i++){//环形队列核心（四）;
            System.out.printf("%d ",array[i%MaxSize]);//环形队列核心（五）;
        }
        System.out.println();
    }
	```

完整代码：
```java
import java.util.Scanner;

public class Queue {
    public static void main(String[] args){
      ArrayQueue arrayQueue=new ArrayQueue(5);//4.方便测试所以没有定义太大

      char key=' ';//5.键盘交互，接收用户输入
        Scanner scanner=new Scanner(System.in);

        boolean loop=true;
        while(loop){
            System.out.println("s(show):显示队列");
            System.out.println("e(exit):退出程序");
            System.out.println("a(add):向队列添加元素");
            System.out.println("g(get):向队列取出元素");
            System.out.println("h(head):查看队列的头数据");

            key=scanner.next().charAt(0);
            if (key<97) key+=32; //实现大小写都可判断

            switch (key){
                case 's' :
                    arrayQueue.showQueue();
                    break;

                case 'a':
                   System.out.println("请输入一个数字");
                   arrayQueue.addQueue(scanner.nextInt());
                    break;

                case 'g' :
                    try {
                        System.out.println("您取到的数据为："+ arrayQueue.getQueue());

                    } catch (Exception e){
                        System.out.println(e.getMessage());
                    }break;


                case 'h' :
                     try {
                         System.out.println("当前的头数据为："+ arrayQueue.headQueue());

                     } catch (Exception e){
                      System.out.println(e.getMessage());
                    }break;

                case 'e' :
                    scanner.close();//关闭输入
                    loop=false;
                    break;
            }
        }
        System.out.println("**********程序已退出*********");
    }
}

class ArrayQueue{//1.创建一个实现队列的类

    private int MaxSize;    //队列的最大存储容量
    private int [] array;   //要存储队列的数组

    private int front;   //取出时移动的指针,指向队列当前首元素的位置;
    private int rear;    //存储时移动的指针,指向队列最后一个数据的后一个位置;

    //创建队列
    public ArrayQueue(int arrMaxSize){//2.设置构造器
        //front与rear默认都是零，不做修改;
        MaxSize=arrMaxSize+1;//修改：因为留了一个空间做约定，所以多加一个空间;
        array=new int[MaxSize];
    }

    //判断队列是否空
    public boolean isEmpty(){//3.一些必要的方法
        return rear==front;
    }
    //判断队列是否满
    public boolean isFull(){
        return (rear+1)%MaxSize==front;//环形队列核心（一）;
    }

    //添加数据
    public void addQueue(int q){
        if(isFull()) System.out.println("队列已满，不可添加数据！");
        else {
            array[rear]=q;//修改这里
            System.out.println("添加数据成功");

            rear=(rear+1)%MaxSize;//环形队列核心（二）;
        }
    }

    //取出数据
    public int getQueue(){
        if (!isEmpty()){
            int value=array[front];//如果直接返回会被终止,找一个临时变量存放;
            front=(front+1)%MaxSize;//环形队列核心（三）;
            return value;//返回存放;
        }
        throw new RuntimeException("队列为空");//没有合适的返回值，用异常

    }

    //显示当前队列所有数据
    public void showQueue(){
        if (isEmpty()) {
            System.out.println("队列为空，无可打印数据");
            return;
        }
        for (int i=front;i<front+SumQueue();i++){//环形队列核心（四）;
            System.out.printf("%d ",array[i%MaxSize]);//环形队列核心（五）;
        }
        System.out.println();
    }

    //返回当前队列的头数据
    public int headQueue(){
        if (isEmpty()) throw new NumberFormatException("队列为空，无头数据");
        return array[front];

    }

    //新加方法：求出当前队列有效数据个数;
    public int SumQueue(){
        return (rear+MaxSize-front)%MaxSize;
    }

}

```
好了，这样一来一个队列就写好了，测试一下，可以随便玩啦！
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c4d2e88a4a1719e3aae654d40f952e4d.png)
over~

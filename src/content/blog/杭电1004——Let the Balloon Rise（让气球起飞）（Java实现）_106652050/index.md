---
title: "杭电1004——Let the Balloon Rise（让气球起飞）（Java实现）"
publishDate: 2020-06-09
tags:
  - 'OJ题解'
description: 'JAVA'
language: 'English\Chinese'
---

<center>  Let the Balloon Rise</center>
<br>
Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 178885    Accepted Submission(s): 71512

***

Problem Description
Contest time again! How excited it is to see balloons floating around. But to tell you a secret, the judges' favorite time is guessing the most popular problem. When the contest is over, they will count the balloons of each color and find the result.

This year, they decide to leave this lovely job to you.
 
***
Input
Input contains multiple test cases. Each test case starts with a number N (0 < N <= 1000) -- the total number of balloons distributed. The next N lines contain one color each. The color of a balloon is a string of up to 15 lower-case letters.

A test case with N = 0 terminates the input and this test case is not to be processed.
 
***
Output
For each case, print the color of balloon for the most popular problem on a single line. It is guaranteed that there is a unique solution for each test case.
 
***
Sample Input
5
green
red
blue
red
red
3
pink
orange
pink
0
 

Sample Output
red
pink
 
***
![](https://i-blog.csdnimg.cn/blog_migrate/4f633bae530e80d0567594b0995f5617.png)

解析：
这道题的要求其实很简单，给定一个数据集的个数，寻找在这个数据集中出现最多的元素（气球的颜色）

一开始的思路是使用数组，但是卡在了类型的问题上（毕竟不是PHP），最后想到了使用**自定义类**来声明一个**自定义类型的数组**（C/C++使用的是结构体）

**第一步：定义一个自定义类**

注意的几个点：

	1.因为后续会使用到快排的函数 Arrays.sort(),所以需要做一些必要的操作
		①在自定义类中，重写toString方法：该方法决定输出；
		②该类实现Comparable接口
		③实现接口后，重写compareTo方法：该方法决定排序的根基（Arrays.sort()）
		④写明set方法，后续会用到
```java
class Node1 implements Comparable{
    int no=0;
    String name=null;
    public Node1(){
        return;
    }
    public Node1(String name,int no){
        this.name=name;
        this.no=no;
    }

    public void setName(String a){
        name=a;
    }
    public void setNo(int a){
        no=a;
    }

   /*public int compareTo(Object o) {//指定内容升序排序
        if (this.no<((Node1)o).no)
            return -1;
        else if (this.no>((Node1)o).no)
            return 1;
        else return 0;
    }*/
    
    public int compareTo(Object o) {//简化
        return this.no-((Node1)o).no;
    }
    
    public String toString(){
        return this.name;
    }
}
```
**第二步：定义一个自定义类型的数组**
注意的几个点：
	
	1.由于是自定义类型所声明的数组，所以不单单数组整体要实例化，数组中每个单位也要实例化；
	2.如果没有实例化数组个别单元，会空指针异常的错误（NullPointerException）
	3.如果进行自定义类定义的数组元素要进行某个属性的比较，一定要使用equals（）方法，不能用比较运算符；
	
```java
public static void main(String [] args){
        Scanner sc=new Scanner(System.in);//键盘交互输入

        while(true){
            int b=sc.nextInt();//输入元素的个数
            if (b==0) return;
            Node1 [] arry =new Node1[b];//实例化数组

            for (int i=0;i<b;i++){
                arry[i]=new Node1();//实例化数组单元；
                arry[i].setName(sc.next());
                arry[i].no=1;
            }
            for (int i=0;i<b;i++){
                for (int j=i+1;j<b;j++){//不用和本身比较，也不用和自己前面的元素比较
                    //1.不用和本身比较，这个不多说了
                    //2.不用和自己前面的元素，前面的如果有重复于自己的，在之前就会被累计
                    if (arry[i].name.equals(arry[j].name)){
                        arry[i].no++;
                    }
                }

            }

            Arrays.sort(arry,0,b);
            System.out.println(arry[b-1]);

        }
```

完整代码：
```java
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String [] args){
        Scanner sc=new Scanner(System.in);//键盘交互输入

        while(true){
            int b=sc.nextInt();//输入元素的个数
            if (b==0) return;
            Node1 [] arry =new Node1[b];//实例化数组

            for (int i=0;i<b;i++){
                arry[i]=new Node1();//实例化数组单元；
                arry[i].setName(sc.next());
                arry[i].no=1;
            }
            for (int i=0;i<b;i++){
                for (int j=i+1;j<b;j++){//不用和本身比较，也不用和自己前面的元素比较
                    //1.不用和本身比较，这个不多说了
                    //2.不用和自己前面的元素，前面的如果有重复于自己的，在之前就会被累计
                    if (arry[i].name.equals(arry[j].name)){
                        arry[i].no++;
                    }
                }

            }

            Arrays.sort(arry,0,b);
            System.out.println(arry[b-1]);

        }

    }

    /*public static void show(Node1[] arry){//测试数组排序状态用到的方法
        for (Node1 x: arry) {
            System.out.print(x.no);
            System.out.println(x.name);
        }
    }*/
}
class Node1 implements Comparable{
    int no=0;
    String name=null;
    public Node1(){
        return;
    }
    public Node1(String name,int no){
        this.name=name;
        this.no=no;
    }

    public void setName(String a){
        name=a;
    }
    public void setNo(int a){
        no=a;
    }

    public int compareTo(Object o) {
        return this.no-((Node1)o).no;
    }

    public String toString(){
        return this.name;
    }

}
```
输出结果：
![](https://i-blog.csdnimg.cn/blog_migrate/1ab39631f5154aadd4d3420f375e9af7.png)

最后说一句：还是杭电厉害。

特别鸣谢：[橙子小姐姐](https://me.csdn.net/weixin_42988781)

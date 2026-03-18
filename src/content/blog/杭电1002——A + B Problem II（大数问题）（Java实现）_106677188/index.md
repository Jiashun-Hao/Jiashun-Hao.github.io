---
title: "杭电1002——A + B Problem II（大数问题）"
publishDate: 2020-06-10
tags:
  - 'OJ题解'
description: 'JAVA'
language: 'English\Chinese'
---

<center>A + B Problem II</center>
<br>
Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 525800    Accepted Submission(s): 100530

---
Problem Description
I have a very simple problem for you. Given two integers A and B, your job is to calculate the Sum of A + B.
 
 ---

Input
The first line of the input contains an integer T(1<=T<=20) which means the number of test cases. Then T lines follow, each line consists of two positive integers, A and B. Notice that the integers are very large, that means you should not process them by using 32-bit integer. You may assume the length of each integer will not exceed 1000.
 
 ---
Output
For each test case, you should output two lines. The first line is "Case #:", # means the number of the test case. The second line is the an equation "A + B = Sum", Sum means the result of A + B. Note there are some spaces int the equation. Output a blank line between two test cases.
 
 ---

Sample Input
2
1 2
112233445566778899 998877665544332211
 

Sample Output
Case 1:
1 + 2 = 3

Case 2:
112233445566778899 + 998877665544332211 = 1111111111111111110

---
![](https://i-blog.csdnimg.cn/blog_migrate/d4ff20b38068ad023c8ce926d7636370.png)

 **解析：**
 这道题主要考察的是对大数基本的处理，如果使用Java来实现，思路有两种；
 
#### 第一种：**使用数组处理**；
思路：

	1.用两个String类的对象接收数据；
	2.定义两个远大于最大字符串长度的数组，用来存储字符串中的元素；
	3.初始化字符串，将所有空间赋值为0（因为相加的两个大数长度不一定相同）
	4.将两个字符串中的元素取出一一放入两个数组中（倒叙存放，从低位开始）；
	5.相加两个序号对应的数组元素，>=10进位

```java
import java.util.Scanner;
public class Main {
    public static void main(String [] args){
        Scanner sc=new Scanner(System.in);
        while(sc.hasNext()){
            int M=sc.nextInt();
            for (int i = 0; i <M ; i++) {
                String s1=sc.next();
                String s2=sc.next();
                //注意！！！！！
//                System.out.printf("Case %d:\n",i+1);
//                System.out.println(s1+" + "+s2+" = "+sum(s1,s2));
                System.out.println("Case "+(i+1)+":");
                System.out.println(s1+" + "+s2+" = "+sum(s1,s2));
                if (i<M-1)System.out.println();
            }
        }
    }
    public static String sum(String a,String b){
        int a_len=a.length();
        int b_len=b.length();
        int Max=a_len>b_len ? a_len:b_len;
        int [] S1=new int[Max+10];
        int [] S2=new int[Max+10];
        for (int i = 0; i <Max ; i++) {
            S1[i]=0;
            S2[i]=0;
        }
        int j=0;//定义一个计数器
        for (int i = a_len-1; i >=0; i--) {//因为要从低位开始计算，所以从后往前
            //S1[j]=a.charAt(i)-48;
            //j++;
            S1[j++]=a.charAt(i)-48;//简化
        }
        j=0;
        for (int i = b_len-1; i >=0; i--) {
            S2[j++]=b.charAt(i)-48;
        }
        for (int i = 0; i <Max; i++) {
            S1[i]+=S2[i];
            if (S1[i]>=10) {S1[i]-=10;S1[i+1]++;}
        }
        String str="";
        boolean F=false;
        for (int i = Max; i >=0 ; i--) {
            if(S1[i]!=0) F=true;//去除多余的0，如果F==true代表遇到了非零元素，可以开始计算了
                if (F) str+=S1[i];
                if(i==0 && !F) str+=0;//0比较特殊，需要单独写出；
        }
        return str;

    }
}
```
**==特别注意的点！！==**
注意我在这个代码中注释“注意！！！！”下方的输出格式，如果是以这样的格式输出，在杭电的oj上会报格式异常的错误；

![](https://i-blog.csdnimg.cn/blog_migrate/8715cd086323f4d7c04575a4896e634f.png)

其实不是我们做错了，而是因为。。。。。。。

 ![](https://i-blog.csdnimg.cn/blog_migrate/97d991f75976bdb72bb56c21a1c6f1fb.png)
 
 [原文出自这里](https://www.cnblogs.com/yuyixingkong/p/3919899.html)
<br>

#### 第二种：使用Java中自带的BigInteger；
思路：Java中自带的类**BigInteger**就是用来处理大数的，所以直接用就行，好玩不烫手~~
```java
import java.util.Scanner;
import java.math.*;
 
public class Main {
 
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		int count = 1;
		while(n>0)
		{
			if(count!=1)
			System.out.println();
			BigInteger a = sc.nextBigInteger();
			BigInteger b = sc.nextBigInteger();
			System.out.println("Case "+count+":");
			System.out.println(a+" + "+b+" = "+a.add(b));
			count++;
			n--;
		}
	}
}
```
最后总结一下：在学习中遇到过很多的坑，有自己的错也有平台的问题;但是我觉得不管是哪一类都不必顾虑太多，踩的坑多了才会成长吧，起码我是这么认为的；
再者说，无论是自己还是平台，都是人性的，不可能十全十美，也正是因为这样，编程才好玩，世界才有趣~

Over~


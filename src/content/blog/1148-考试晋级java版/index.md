---
title: "1148: 考试晋级（java版）"
description: "题目描述   有n个人参加了期末考试,为了检测大家真正的学习成绩老师决定对于成绩好的同学进行第二轮测试,当然不是每个人都有进入第二轮的机会，这里有个根据期末考试"
publishDate: 2020-02-14
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/104310882
---
题目描述  
有n个人参加了期末考试,为了检测大家真正的学习成绩老师决定对于成绩好的同学进行第二轮测试,当然不是每个人都有进入第二轮的机会，这里有个根据期末考试分数制定的晋级规则：

1)分数高的优先晋级

2)至多只能允许k个人晋级下一轮

3)为了保证公平分数相同的人要么一起晋级要么一起出局

老师最近很忙不知道最终到底有多少人可以晋级下一轮而且晋级的最低分数是多少.作为优秀的程序员这个任务当然就交给你来完成了！

输入  
第一行是一个数T(T<=100),表示有T组测试数据。

每组测试样例的第一行是两个数n 和k(1<=k<=n<=10000)代表参加考试的总人数和至多能晋级的总人数.

然后接下来一行有n个数字s代表每个学生的考试分数(1<=s<=100).

输出  
对于每组测试数组,首先输出"Case #X: ",X代表测试用例的编号（具体可参见sample output）， 然后输出两个整数sum, min，表示可以晋级多少人和最低的晋级分数.如果无人能晋级则输出两个-1。

样例输入  
3  
1 1  
5  
10 7  
1 2 3 4 5 6 7 8 9 10  
10 2  
1 1 2 3 3 4 4 5 5 5  
样例输出  
Case #1: 1 5  
Case #2: 7 4  
Case #3: -1 -1  
提示  
来源

---

解析：这道题比较费时间的地方在于考虑的事情比较多，进入代码解析吧~

```
import java.util.*;
public class Main {
    public static void main(String[] args)
    {Scanner sc=new Scanner(System.in);
      while(sc.hasNext()){
          int n=sc.nextInt();
          for (int i = 0; i <n ; i++) {

              int Totalnumber=sc.nextInt();//参加考试的总人数
              int [] a=new int[Totalnumber];//建立数组存放成绩
              int Enrolment=sc.nextInt();//输入最多可以录取的人数
              int Max=0;//存放最高成绩
              for (int j = 0; j <Totalnumber; j++) {
                  a[j]=sc.nextInt();
                  if(a[j]>=Max) Max=a[j];//存放最高成绩
              }
              Arrays.sort(a);//方法，快排；
              int s=0;//存放高分的人数
              int k=0;//存放分数重复的人的个数
              int Max2=0;//Max会在最高分的人数不满足需求的时候改为次高分，这时用来保存最大值（Max），防止次高分人数过多时候舍去次高分的人时返回原先的录取分数；
            for (int j = Totalnumber-1; j >=0; j--) {//排序后最大值在最后，所以用倒序循环；
                  if(a[j]==Max)
                    {
                        s++;k++;
                        if(s>Enrolment)//如果过多，直接返回-1；
                        {fuction(i+1,-1,-1);break;}
                        if(s==Enrolment)//如果人数满足所需要的人数；
                        {
                            if(j!=0){//j!=0代表循环没有到最后一个数；
                                if (a[j-1]!=a[j])
                                {fuction(i+1,Enrolment,Max);break;}
                                 else if (a[j-1]==a[j])
                                {fuction(i+1,Enrolment-k,Max2);break;}
                            }
                            else if(Enrolment==Totalnumber) {fuction(i+1,Enrolment,Max);break;}//代表判断最后一个数是否满足需要，最后一个数需要单独拿出来判断，如果继续用a[j-1]==a[j]会造成数组的溢出，因为a[0]不能和a[-1]比较吧；
                        }
                    }
                  else {
                      Max2=Max;
                      Max=a[j];
                      j++;
                      k=0;//清空原Max的个数，因为执行这条代码时候一定是和Max等价的值不够用了；
                  }
              }

          }
      }
    }
    public static void fuction(int i,int a,int b)
    {  if(a!=0 && b!=0) System.out.println("Case #"+i+": "+a+" "+b);
       else System.out.println("Case #"+i+": "+-1+" "+-1);

    }

}
```

这道题在我的学校的oj上面通过了，如果有写的不对的地方或者有更优的算法，欢迎在评论里指出；  
2020年2月14日第一次修改；
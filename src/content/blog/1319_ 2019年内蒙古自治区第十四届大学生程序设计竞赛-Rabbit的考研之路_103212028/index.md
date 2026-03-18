---
title: "1319: 2019年内蒙古自治区第十四届大学生程序设计竞赛-Rabbit的考研之路"
publishDate: 2019-11-23 
description: 'OJ题解'
tags:
  - C
language: 'Chinese'
---

1319: 2019年内蒙古自治区第十四届大学生程序设计竞赛-Rabbit的考研之路（c版）

大三的 Rabbit 已经开始考研了，她需要参加数学、英语、政治、专业课四门考试，四门课的满分分别是 150,100,100,150。
不过她了解到考研与普通考试不同，要想被录取不仅要总分到达国家线(320分)，而且单科成绩也必须到达单科线。
这里每门课的单科线为这门课满分的 60%。
过了几个月，考研成绩出来了，Rabbit 得到了班上所有 N 位同学的成绩，现在她想知道哪些同学能被录取，并根据她们的总分从大到小排序(若总分相同，则按照名字的字典序从小到大排序)。
注:到达指的是大于等于，数据保证学生名字是只由小写字母和大写字母组成的不同字符串，且至少有一位同学能被录取。

输入
输入数据第一行为 T，表示数据组数。(1<=T<=20)
每组数据第一行为 N，表示学生人数。(1<=N<=100)
接下来 N 行,每行首先是一个字符串 S，表示第 i 个学生的名字，接下来四个整数 M,E,P,Z，分别表示该学生的数学成绩，英语成绩，政治成绩，专业课成绩。(1<=|S|<=10，1<=E,P<=100，1<=M,Z<=150)

输出
对于每组数据输出若干行，每行输出被录取的学生按照成绩排序后的名字和总分，用空格隔开

样例输入
1
3
Bob 105 70 65 110
John 135 55 70 120
Tom 100 75 70 120
样例输出
Tom 365
Bob 350
___

```c
#include <stdio.h>
#include <stdlib.h>
#define N 50
struct nome
{
    char a[10];
    int s;
    int y;
    int z;
    int zy;
    int h;
}nome[N];
struct nome1
{
    int a;
    int h;
}nome1[N];
int main()
{
    int T,i,n,k,j,i1;
    while(scanf("%d",&T)!=EOF)
    {  if(T>=1 && T<=20)
        {while(T--)
        {scanf("%d",&n);
         if(n>=1 && n<=100)
      {for(i=1;i<=n;i++)
      { scanf("%s %d %d %d %d",&nome[i].a,&nome[i].s,&nome[i].y,&nome[i].z,&nome[i].zy);
 
         nome[i].h=nome[i].s+nome[i].y+nome[i].z+nome[i].zy;}
         k=1;
      for(i=1;i<=n;i++)
      {
          if(nome[i].h>=320)
          {if(nome[i].s>=(150*0.6) && nome[i].y>=(100*0.6) && nome[i].z>=(100*0.6) && nome[i].zy>=(150*0.6))
            {nome1[k].h=nome[i].h;
             nome1[k].a=i;
             k++;}
          }
      }
      int jh=0;
      for(i=1;i<k;i++)
      {
          for(j=1;j<k;j++)
          {
              if(nome1[i].h>nome1[j].h)
             {jh=nome1[i].h;nome1[i].h=nome1[j].h;nome1[j].h=jh;
              jh=nome1[i].a;nome1[i].a=nome1[j].a;nome1[j].a=jh;
             }
              else if(nome1[i].h==nome1[j].h && i!=j)
              { if((strcmp(nome[nome1[i].a].a,nome[nome1[j].a].a))<0)
                    {
                       jh=nome1[i].h;nome1[i].h=nome1[j].h;nome1[j].h=jh;
                       jh=nome1[i].a;nome1[i].a=nome1[j].a;nome1[j].a=jh;
                    }
 
                }
          }
      }
      for(i=1;i<k;i++)
      {
          printf("%s %d\n",nome[nome1[i].a].a,nome1[i].h);
      }
   }}}
    return 0;
 
}
}
```
代码不是很优，但是目前CSDN上比较简单的C语言基础版，适合刚刚入门C语言的同学，有不懂的地方或者可以优化的方法欢迎评论。

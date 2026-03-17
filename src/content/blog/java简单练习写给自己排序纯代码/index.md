---
title: "Java简单练习(写给自己)——排序（纯代码）；"
description: "前言：有不止一个人告诉过我，基础很重要，所以今天将一些模糊的东西写在这里；   public class Main {     public static vo"
publishDate: 2020-03-31
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/105130224
---

前言：有不止一个人告诉过我，基础很重要，所以今天将一些模糊的东西写在这里；

### 1.插入排序

```
  public class Main {
    public static void main(String[] args){
        int [] a=new int[]{1,3,4,5,7,6,2,1};
        int time;
        for (int i = 1; i <a.length ; i++) {
            time=a[i];
            for (int j = i-1; j >=0 ; j--) {
                if(a[j]>time){  //升序
                    a[j+1]=a[j];
                    a[j]=time;
                }
                else break;
            }
        }
        for (int x:a) {
            System.out.println(x);
        }
    }
}
```

### 2. 冒泡排序

```
public class Main {
    public static void main(String[] args){
        int [] a=new int[]{1,6,2,5,3,4};
        for (int i = 0; i <a.length-1 ; i++) { //不减1会越界
            for (int j = 0; j <a.length-i-1 ; j++) {
                if(a[i]>a[i+1]){
                    int swap=a[i];//操作的还是a[i];j只起到重复的作用；
                    a[i]=a[i+1];
                    a[i+1]=swap;
                }
            }
        }

        for(int x:a){
            System.out.println(x);
        }
    }
}
```

### 3. 伪·冒泡排序

```
public class Main {
    public static void main(String[] args){
        int [] a=new int[]{1,6,2,5,3,4};
        for (int i = 0; i <a.length ; i++) {
            for (int j = i; j <a.length ; j++) {
            //j = i是升序，j=0是降序；
                if(a[i]>a[j]){
                    int swap=a[i];
                    a[i]=a[j];
                    a[j]=swap;
                }
            }
        }

        for(int x:a){
            System.out.println(x);
        }
    }
}
```

### 4. 快速排序

```
public class Main {
    public static void main(String[] args){
        int [] array=new int[]{1,6,2,5,3,4};
        Quite(array);
        for(int x: array){
            System.out.println(x);
        }
    }

    public static void Quite(int [] array){
        int len=array.length;
        if(array==null || len==1 ) return ;
        sort(array,0,len-1);
    }
    public static void sort(int[] array,int left,int right){
        if(left>right) return ;
        int base=array[left];
        int i=left,j=right;

        while(i!=j){
            while(array[j]>=base && i<j){
                j--;
            }
            while(array[i]<=base && i<j){
                i++;
            }

            if(i<j){
                int team=array[i];
                array[i]=array[j];
                array[j]=team;
            }
        }
        array[left]=array[i];
        array[i]=base;

        sort(array,left,i-1);//核心，递归回溯；特点：不稳地，可能会产生不必要的位置交换，并且占内存（调用的方法多）；
        sort(array,i+1,right);
    }
}
```
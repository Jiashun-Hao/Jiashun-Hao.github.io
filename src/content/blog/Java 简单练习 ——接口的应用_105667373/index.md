---
title: "Java 简单练习 ——接口的应用"
date: "最新推荐文章于 2021-06-11 15:22:03 发布"
source: "https://blog.csdn.net/HJS1453100406/article/details/105667373"
tags:

---

First ，这是一篇很水的博客，我写给自己，不推荐看；

#### 题目

输入圆，比大小；

#### 代码

```
public class Main {
    public static void main(String[] args) {
      ComparableCircle c1=new ComparableCircle(2.1);
      ComparableCircle c2=new ComparableCircle(2.3);
      ComparableCircle c3=new ComparableCircle(2.1);

      int a1=c1.compareTo(c2);
        int a2=c1.compareTo(c3);
         int a3=c2.compareTo(c3);

      System.out.println(a1);
        System.out.println(a2);
         System.out.println(a3);
    }
}
interface CompareObject{
    public int compareTo(Object o);
}
class Circle{
     private double radius;

     public Circle(){
         super();
     }

     public Circle(double radius){
         super();
         this.radius=radius;
     }

     public double getRadius(){
         return radius;
     }

     public void setRadius(double radius){
         this.radius=radius;
     }

}
class ComparableCircle extends Circle implements CompareObject{
    public ComparableCircle(double radius){
        super(radius);
    }
    public int compareTo(Object o){
       if(this==o){
           return 0;
       }else if(o instanceof ComparableCircle){
           ComparableCircle c=(ComparableCircle) o;

            if(this.getRadius()>c.getRadius()) return 1;
            else if(this.getRadius()<c.getRadius()) return -1;
            else return 0;
       }
        throw new RuntimeException("传入的非CompareObject对象，不可进行比较");
    }
}
```

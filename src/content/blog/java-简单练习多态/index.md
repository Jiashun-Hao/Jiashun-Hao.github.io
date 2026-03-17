---
title: "Java 简单练习——多态"
description: "题目要求：   1.写两个类，一个输入长方形的信息，一个输入圆的信息   2.写一个类，作为为测试类，既可以测试长方形，也可以测试圆形；   3.写一个方法，判"
publishDate: 2020-02-22
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/104441396
---
题目要求：  
1.写两个类，一个输入长方形的信息，一个输入圆的信息  
2.写一个类，作为为测试类，既可以测试长方形，也可以测试圆形；  
3.写一个方法，判断两个图形的面积是否相等：相等输出true，不相等输出false；

思路：  
1.写一个公共的父类用于计算，写两个子类分别输入长方形和圆形的信息，根据多态性质——“可以将子类对象赋给父类的应用”来实现题目要求；  
2.最后写一个测试类，用来输出面积和判断相等；

---

代码：

1.父类：Main

```
public class Main {
    protected double Height;//默认为长方形，给出长和宽
    protected double Whith;//
    public Main(){//由于子类构造器第一行代码都会调用父类的空参的构造器，特在这里创建一个空参器，为了节省不必要的输入；
    }
     public Main(double Height,double Whith){//构造器；
         this.Height=Height;
         this.Whith=Whith;
     }
    public double getHeight(){
        return this.Height;
    }
    public double getWhith(){
        return this.Whith;
    }

    public void setHeight(double Height){
        this.Height=Height;
    }
    public void setWhith(double Whith){
        this.Whith=Whith;
    }
    public double jisuan(){//默认的计算方式；
        return 0.0;//需要一个返回的东西，这里随便写；
    }
}
```

2.子类：Main1（长方形）

```
public class Main1 extends Main{
    private double Whith;
    private double Height;

    public Main1(double Whith,double Height){
        super(Height,Whith);//这里也可以是super();
        this.Whith=Whith;
        this.Height=Height;
    }

    public double getWhith() {
        return Whith;
    }

    public void setWhith(double Whith) {
        this.Whith = Whith;
    }

    public double getHeight() {
        return Height;
    }

    public void setHeight(double Height) {
        this.Height = Height;
    }
    public double jisuan(){//重写jisuan方法，长方形特有；
        return Whith*Height;
    }
}
```

3.子类：Main2（圆形）

```
public class Main2 extends Main {
    private double Radius;

    public Main2(double Radius){
        super();
        this.Radius=Radius;
    }

    public double getRadius() {
        return Radius;
    }

    public void setRadius(double Radius) {
        this.Radius = Radius;
    }
    public double jisuan(){//重写jisuan方法，圆形特有；
        return Math.PI*Radius*Radius;
    }
}
```

4.**测试类**

```
public class ceshi {
    public static void main(String[] args){
     ceshi t=new ceshi();

     Main1 a=new Main1(4,5);
     Main2 b=new Main2(4);
     t.xianshi(b);
    System.out.println(t.panduan(a,b));
    }

    //判断两个对象的面积是否相等；

    public boolean panduan(Main a,Main b){//由于两个子类的父类是Main，根据子类对象的实体可以赋值给父类的引用，这里之间写父类即可；
        return a.jisuan()==b.jisuan();
    }
    //显示图形的面积
    public void xianshi(Main a){
        System.out.println(a.jisuan());
    }
}
```

2020年2月22日初写
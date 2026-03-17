---
title: "Java 匿名对象类"
date: "最新推荐文章于 2024-10-15 11:14:32 发布"
source: "https://blog.csdn.net/HJS1453100406/article/details/104262980"
tags:

---

匿名对象类：创建的类的对象没有名字；  
作用：当只需要调用一次的时候可以使用；  
代码：

```
public class Main {
    public static void main(String[] args)
    {
        new min().show();
        new min().height(2);
    }
}
class min{
    public void show()
    {
        System.out.print("wwwwwwww");

    }
    public void height(int a)
    {
        System.out.print(a);
    }
}
```

输出结果：  
![在这里插入图片描述](images/blog_migrate_4503ae30d4da8080d530dd946077517e_png.png)

2020年2月11日 初写

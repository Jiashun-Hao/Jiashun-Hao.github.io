---
title: "Java 常用类的常用方法(个人文档)：日期、算术，字符串"
description: "import java.text.; 		import java.util.; 		//时间         //import java.text.Simple"
publishDate: 2020-10-30
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/109391532
---

## 日期

```
		import java.text.*;
		import java.util.*;
		//时间
        //import java.text.SimpleDateFormat;
        long i=System.currentTimeMillis();//Thu Jan 01 00:00:00 CST 1970
                                          //返回从1970年1月1日0时0点0分00秒开始到当前的毫秒数
                                          //北京时间是1970年1月1日8时0点0分00秒
        //import java.util.*;
        Date d1=new Date();//返回当前时间
        System.out.println(d1);

        Date d2=new Date(0);//返回指定毫秒数的时间（北京时间与格林威治相差8小时）
                            //Thu Jan 01 08:00:00 CST 1970
        System.out.println(d2);

        SimpleDateFormat  sdf=new SimpleDateFormat();
        String date=sdf.format(new Date());
        System.out.println(date);//2020/10/30 下午6:41

        SimpleDateFormat sdf1=new SimpleDateFormat("EEE,d MMM yyyy HH:mm:ss Z");
        date=sdf1.format(new Date());
        System.out.println(date);//周五,30 10月 2020 18:44:00 +0800

        //解析：
        Date date1=sdf.parse("2020/10/30 下午6:46");
        System.out.println(date1);//Fri Oct 30 18:46:00 CST 2020

        //日历
        Calendar c=Calendar.getInstance();
        System.out.println(c.get(Calendar.YEAR));//获取当前年
        System.out.println(c.get(Calendar.MARCH));//获取当前月（从0开始，12代表第二年的1月）
        System.out.println(c.get(Calendar.DATE));//获取当前日
        System.out.println(c.get(Calendar.DAY_OF_WEEK));//获取星期
        System.out.println(c.getTimeInMillis());//返回毫秒数

        //设置特定时间
        c.set(1999,8,30);//设置年月日（月份-1）
        System.out.println(c.get(Calendar.YEAR));//获取当前年
        System.out.println(c.get(Calendar.DAY_OF_WEEK));//获取星期
        System.out.println(c.get(Calendar.DATE));//获取当前日
        System.out.println(c.getTimeInMillis());//返回毫秒数
```

## 算术

```
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.*;
//Math
        BigInteger bi=new BigInteger("1111111");//大数
        BigDecimal bg=new BigDecimal("1111111.111111");//大小数
        System.out.println(bi);
        System.out.println(bg);
```

## 字符串

```
 		StringBuilder sbl=new StringBuilder("123456");
        sbl.insert(3,"abc");//指定位置插入字符串
        System.out.println(sbl.reverse());//反转字符串
```
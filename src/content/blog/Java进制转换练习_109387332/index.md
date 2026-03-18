---
title: Java进制转换练习"
publishDate: 2020-10-30
description: '笔记'
tags:
  - Java
language: 'Chinese'
---

# 二进制转十六进制
```java
import java.math.BigInteger;
import java.util.Scanner;
public class TestString {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()) {
            String str = sc.next();
            BigInteger bit = new BigInteger(str, 2);
            String str1 = bit.toString(16).toUpperCase();
            System.out.println(str1);
        }

    }
}
```

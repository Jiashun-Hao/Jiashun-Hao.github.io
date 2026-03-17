---
title: "Java进制转换练习"
date: "最新推荐文章于 2023-07-05 08:00:00 发布"
source: "https://blog.csdn.net/HJS1453100406/article/details/109387332"
tags:

---

## 二进制转十六进制

```
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

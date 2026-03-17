---
title: "LeetCode——只出现一次的数（136、137、260）"
date: "最新推荐文章于 2026-03-16 19:00:00 发布"
source: "https://blog.csdn.net/HJS1453100406/article/details/121097652"
tags:
  - #leetcode
  - #算法
  - #职场和发展
---

## 136

只出现一次的数字  
给定一个非空整数数组，除了某个元素只出现**一次**以外，其余每个元素均出现**两次**。找出那个只出现了**一次**的元素。

说明：  
你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:  
输入: [2,2,1]  
输出: 1

示例 2:  
输入: [4,1,2,1,2]  
输出: 4

题解：

```
class Solution {
    public int singleNumber(int[] nums) {
        int number=0;
        for(int x:nums){
            number^=x;
        }
        return number;
    }
}
```

## 137

给你一个整数数组 nums ，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次** 。请你找出并返回那个只出现了**一次**的元素。

示例 1：  
输入：nums = [2,2,3,2]  
输出：3

示例 2：  
输入：nums = [0,1,0,1,0,1,99]  
输出：99

题解：

```
class Solution {
    public int singleNumber(int[] nums) {
        int a = 0, b = 0;
         for (int x : nums) {
            b = (b ^ x) & ~a;
             a = (a ^ x) & ~b;
         }
        return b;
    }
}
```

## 260

给定一个整数数组 nums，其中恰好有两个元素只出现**一次**，其余所有元素均出现**两次**。 找出只出现**一次**的那两个元素。你可以按 任意顺序 返回答案。

进阶：你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？

示例 1：  
输入：nums = [1,2,1,3,2,5]  
输出：[3,5]  
解释：[5, 3] 也是有效的答案。

示例 2：  
输入：nums = [-1,0]  
输出：[-1,0]

示例 3：  
输入：nums = [0,1]  
输出：[1,0]

题解：

```
class Solution {
    public int[] singleNumber(int[] nums) {
       int eor=0;
       for(int x:nums){
           eor^=x;
       }
       int rightOne=eor&(~eor+1);

       int onlyOne=0;
       for(int x:nums){
           if((x&rightOne)==0){
               onlyOne^=x;
           }
       }
       int arr[]=new int[]{onlyOne,onlyOne^eor};
       return arr;
    }
}
```

---
title: "JS常用事件"
description: "事件：电脑输入设备与页面的交互，如获得焦点、鼠标点击等     分类：事件的注册分为两种，静态注册事件和动态注册事件   静态注册事件：      通过HTML"
publishDate: 2021-07-21
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/118681708
---

> **事件**：电脑输入设备与页面的交互，如获得焦点、鼠标点击等  
>  **分类**：事件的注册分为两种，静态注册事件和动态注册事件
>
> > **静态注册事件：**  
> >  通过HTML标签的代码直接告诉事件响应后的代码;  
> >  **动态注册事件：**  
> >  先通过JS代码得到标签的dom对象，在通过`dom对象.事件名=function（）{}`的形式富于事件响应后的代码；  
> >  PS:  
> >  onload动态事件注册是固定写法;  
> >  **document:** JS提供的对象，表示整个页面的所有内容

#### JS常用事件

- [一、onload事件](#onload_11)
- - [1.1 静态写法](#11__14)
  - [1.2 动态写法](#12__45)
- [二、onclick事件](#onclick_66)
- - [2.1 静态写法](#21__68)
  - [2.2 动态写法](#22__86)
- [三、onblur事件](#onblur_118)
- - [3.1 静态写法](#31__121)
  - [3.2 动态写法](#32__141)
- [四、onchange事件](#onchange_164)
- - [4.1 静态写法](#41__167)
  - [4.2 动态写法](#42__190)
- [五、onsubmit事件](#onsubmit_216)
- - [5.1 静态写法](#51__220)
  - [5.2 动态写法](#52__243)

## 一、onload事件

> onload事件：浏览器解析完页面以后自动触发的事件；  
>  **常用于做页面加载后JS代码初始化；**

### 1.1 静态写法

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body onload="alert('事件触发')"><!--外面用了”“，里面只能用‘’-->
</body>

</html>
```

或者封装为函数

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    
    <script type="text/javascript">
        function onloadfun(){//封装函数
            alert("事件触发");
        }
    </script>
    
</head>

<body onload=onloadfun()><!--直接调用-->
</body>

</html>
```

### 1.2 动态写法

> onload动态事件注册是固定写法

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <script type="text/javascript">
        window.onload=function (){
            alert("页面事件加载");
        }
    </script>

</head>

<body>
</body>

</html>
```

## 二、onclick事件

> **常用于与按钮交互**

### 2.1 静态写法

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        function onclickfun(){
            alert("hhhhh");
        }
    </script>
</head>

<body>
  <button onclick=onclickfun()>按钮</button>
</body>

</html>
```

### 2.2 动态写法

> 1.**document:** JS提供的对象，表示整个页面的所有内容  
>  2.**getElementById:**
>
> > get 获取  
> >  Element 元素（标签）  
> >  By 通过  
> >  Id id值

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">

        window.onload=function (){
            //1.获取对象ID
            var onclickcd="id1";
            //2.获取标签对象
            var btnobj=document.getElementById("id1");
            //3.编写事件
            btnobj.onclick=function (){
                alert("动态事件");
            }
        }
    </script>
</head>

<body>
  <button id="id1">按钮</button>
</body>

</html>
```

## 三、onblur事件

> 1.**onblur事件:** 失去焦点事件；  
>  2.**常用于检查输入框内容是否合法；**

### 3.1 静态写法

> `console`是JS提供的控制台对象，专门像浏览器的控制器打印输出

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
   <script type="text/javascript">
       
       function onb(){
           //console是JS提供的控制台对象，专门像浏览器的控制器打印输出
           console.log(123);
       }
       
   </script>
</head>

<body>
 yonghu:<input type="text" onblur="onb()">
</body>
```

### 3.2 动态写法

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
   <script type="text/javascript">
	   //onload动态事件注册是固定写法
       window.onload=function (){
           //1.获取标签对象
           var onb=document.getElementById("id1");
           //2.对象名.事件名=function(){}
           onb.onblur=function (){
               console.log("123");
           }
       }

   </script>
</head>

<body>
 yonghu:<input id="id1" type="text" >
</body>
```

## 四、onchange事件

> 1.**onchange**：内容改变事件  
>  2.**常用于检查下拉列表或输入框内容发生改变后操作**

### 4.1 静态写法

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
   <script type="text/javascript">
       
       function ochange(){
           console.log(123);
       }
       
   </script>
</head>

<body>
   country:
    <select onchange="ochange()">
        <option>China</option>
        <option>Japan</option>
        <option>American</option>
    </select>
</body>
```

### 4.2 动态写法

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
   <script type="text/javascript">

       window.onload=function (){
           var oc=document.getElementById("id1");
           oc.onchange=function (){
               alert("hhh");
           }
       }
       
   </script>
</head>

<body>
   country:
    <select id="id1">
        <option>China</option>
        <option>Japan</option>
        <option>American</option>
    </select>
</body>
```

## 五、onsubmit事件

> 1.**onsubmit**:表单提交事件  
>  2.**常用于在表单提交前验证数据是否合法**  
>  3.要验证所有表单项是否合法，不合法就阻止表单提交，函数设置为`return false`可以阻止表单的提交

### 5.1 静态写法

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        function onsum(){
            //要验证所有表单项是否合法，不合法就阻止表单提交
            alert("表单不合法");

            //函数设置为return false可以阻止表单的提交
            return false;
        }
    </script>
</head>

<body>
    <!--οnsubmit="return flase"可以阻止表单提交-->
    <form action="http://localhost:8080" method="get" onsubmit="return onsum()">
        <input type="submit" value="静态注册">
    </form>
</body>
```

### 5.2 动态写法

```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        
        window.onload=function (){
            //1.获取标签对象
            var form=document.getElementById("form1");
            //2.通过标签对象.事件名=function(){}
            form.onsubmit=function (){
                alert("不合法");
                //阻止提交
                return false;
            }
        }
        
    </script>
</head>

<body>
    <!--οnsubmit="return flase"可以阻止表单提交-->
    <form id="form1" action="http://localhost:8080" method="get">
        <input type="submit" value="动态注册">
    </form>
</body>
```
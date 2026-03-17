---
title: "JavaWeb学习-Servlet"
description: "写在前面的话：为什么突然要写一篇这个？因为明天考试要考这个 - [一、创建Servlet](- - [1.编写一个类实现Servlet接口](  - [2.到W"
publishDate: 2021-06-21
tags: []
# 原文链接: https://blog.csdn.net/HJS1453100406/article/details/118091527
---
写在前面的话：为什么突然要写一篇这个？因为明天考试要考这个

#### Servlet

- [一、创建Servlet](#Servlet_10)
- - [1.编写一个类实现Servlet接口](#1Servlet_12)
  - [2.到Web.xml文件中配置访问地址](#2Webxml_48)
  - [3.到运行servlet](#3servlet_73)
- [二、处理请求](#_84)
- - [1.基本请求](#1_85)
  - [2.POST与GET区分请求](#2POSTGET_103)
- [三、常用Servlet开发原则](#Servlet_193)
- - [1.直接继承子类HttpServlet](#1HttpServlet_194)
- [四、后台获取前端请求参数](#_213)
- [五、请求转发](#_280)
- [六、返回给前端数据](#_323)
- - [1.直接回传给页面](#1_324)

---

## 一、创建Servlet

### 1.编写一个类实现Servlet接口

```
public class HelloServlet implements Servlet {

	//处理请求和相应的方法
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("该已执行");
    }
    
	//初始化
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {

    }

	
    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

	
    @Override
    public String getServletInfo() {
        return null;
    }
    
	//销毁
    @Override
    public void destroy() {

    }
}
```

### 2.到Web.xml文件中配置访问地址

```
	<!--<servlet>标签给Tomcat配置Servlet程序-->
    <servlet>
        <!--<servlet-name>给程序起别名，一般是类名        -->
        <servlet-name>HelloServlet</servlet-name>
        
        <!--<servlet-class>servlet程序的全类名-->
        <!--<servlet-class>访问HelloServlet中的service方法-->
        <servlet-class>com.example.Test_service.HelloServlet</servlet-class>
    </servlet>

    <!--servlet-mappingServlet配置访问地址-->
    <servlet-mapping>
        <!--<servlet-name>告诉服务器当前配置的程序给哪一个服务器使用 -->
        <servlet-name>HelloServlet</servlet-name>
        <!-- url-pattern 标签配置访问地址
               / 斜杠在服务器解析的时候表示地址为http://ip:port/工程路径
               /hello 为http://ip:port/工程路径/hello
         -->
         
        <!--hello的命名要与模块（HelloServlet）有对应关系        -->
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
```

### 3.到运行servlet

```
http://localhost:8080/Test_service_war_exploded/hello
// http://  协议
// localhost:8080  ip地址
// Test_service_war_exploded  工程名
// hello XML文件中‘hello’所对应的类
```

---

## 二、处理请求

### 1.基本请求

创建一个HTML表单

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
	<!--请求方法为GET-->
	<!--填写完整请求响应路径-->
    <form action="http://localhost:8080/Test_service_war_exploded/hello" method="get">
        <input type="submit">
    </form>
</body>
</html>
```

### 2.POST与GET区分请求

1. Get是不安全的，因为在传输过程，数据被放在请求的URL中；Post的所有操作对用户来说都是不可见的。  
 2. Get传送的数据量较小，这主要是因为受URL长度限制；Post传送的数据量较大，一般被默认为不受限制。  
 3. Get限制Form表单的数据集的值必须为ASCII字符；而Post支持整个ISO10646字符集。  
 4. Get执行效率却比Post方法好。Get是form提交的默认方法。  
   
 **1.区分GET与POST方法需要在Servlet的实现方法中设置**

```
public class HelloServlet implements Servlet {

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        //1.为了使用类型判断方法，需要将servletRequest的类型转换为子类httpservletRequest
        HttpServletRequest httpservletRequest=(HttpServletRequest) servletRequest;
        
        //2.使用类型判断请求方式
        String str=httpservletRequest.getMethod();
        
        //3.区分请求处理信息
        if(str.equals("POST")) System.out.println("HelloPOST");
        else if (str.equals("GET")) System.out.println("HelloGET");
    }

    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {
    }
}
```

**2.为了进一步区分GET与POST请求，将两种状态封装函数**

```
public class HelloServlet implements Servlet {

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        //1.为了使用类型判断方法，需要将servletRequest的类型转换为子类httpservletRequest
        HttpServletRequest httpservletRequest=(HttpServletRequest) servletRequest;
        //2.使用类型判断请求方式
        String str=httpservletRequest.getMethod();
        //3.区分请求处理信息
        if(str.equals("POST")) doPost();//直接调用
        else if (str.equals("GET")) doGet();

    }
    
    //4.做GET请求
    public void doGet(){
        System.out.println("HelloGET");
    }
    
    //5.做POST请求
    public void doPost(){
        System.out.println("HelloPOST");
    }
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {

    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}
```

---

## 三、常用Servlet开发原则

### 1.直接继承子类HttpServlet

***PS：快速重写类的方法 鼠标点击类后CTRL+O***

```
public class HelloServlet2 extends HttpServlet {

	//直接在方法里面做处理，不需要重写service方法
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("GET");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("POST");
    }
}
```

---

## 四、后台获取前端请求参数

前端代码：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="http://localhost:8080/Test_service_war_exploded/hello3" method="post">
    
    	     	<!--name属性需要前后端一致-->
        姓名：<input type="text" name="username"></br>
        
        学号：<input type="text" name="PupilId"></br>
        
        专业：<input type="checkbox" name="Major" value="c">c
             <input type="checkbox" name="Major" value="java">java
             <input type="checkbox" name="Major" value="PHP">php </br>
             
        <input type="submit" value="提交">
    </form>
</body>
</html>
```

Servlet代码：

```
public class HelloServlet3 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //  /Test_service_war_exploded/hello3
        System.out.println("URI==>"+req.getRequestURI());
        //  http://localhost:8080/Test_service_war_exploded/hello3
        System.out.println("URL==>"+req.getRequestURL());

        System.out.println("客户端IP地址:Host==>"+req.getRemoteHost());

        System.out.println("请求头：Header==>"+req.getHeader("User"));

        System.out.println("请求方法：Method==>"+req.getMethod());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //GET请求中设计编码为"UTF-8"
        //获取请求参数前调用才有效
        req.setCharacterEncoding("UTF-8");

        //getParameter:获取单个请求
        //getParameterValues:获取多个请求
        //获取请求的参数一一对应
        String name=req.getParameter("username");
        String id=req.getParameter("PupilId");
        //返回类型数组
        String []Major=req.getParameterValues("Major");

        System.out.println("姓名："+name);
        System.out.println("学号:"+id);
        //打印数组
        System.out.println("专业："+ Arrays.asList(Major));
    }
}
```

---

## 五、请求转发

**1.Servlet1**

```
public class Test_Servlet1 extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        //Servlet1中获取请求的参数
        String name=req.getParameter("username");
        System.out.println("1获取到参数");

        //在域中添加数据表示经过Servlet1
        //setAttribute(?，！) 将！作为数据放入到Request？中
        req.setAttribute("key","1章");

        //获取Servlet2的路径怎么走
        RequestDispatcher requestDispatcher=req.getRequestDispatcher("/Test2");
        //转发到Servlet2
        requestDispatcher.forward(req,resp);
    }
}
```

**2.Servlet2**

```
public class Test_Servlet2 extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        //Servlet2执行获取请求的参数
        String name=req.getParameter("username");
        System.out.println("2"+name);

        //查看是否有章
        //getAttribute(?) 获取request对象？的值
        Object key=req.getAttribute("key");
        System.out.println("zhang"+key);
    }
}
```

---

## 六、返回给前端数据

### 1.直接回传给页面

```
public class Servlet01 extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取字符流
        PrintWriter printWriter= resp.getWriter();
        //设置响应的字符流数据
        printWriter.write("Hello Word!");
    }
}
```
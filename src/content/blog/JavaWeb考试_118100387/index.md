---
title: "JavaWeb考试"
publishDate: 2022-08-22
source: "https://blog.csdn.net/HJS1453100406/article/details/118100387"
tags:
  - '未分类'
description: '- 2.Servlet'
language: 'English'
---

#### 文章目录

- [1.学生类](#1_5)
- [2.Servlet](#2Servlet_55)
- [3.XML](#3XML_84)
- [4.JSP](#4JSP_95)

---

## 1.学生类

```
public class Student {
    public Student(int ID, String name, int age, String major) {
        this.ID = ID;
        this.name = name;
        this.age = age;
        Major = major;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getMajor() {
        return Major;
    }

    public void setMajor(String major) {
        Major = major;
    }

    int ID;
    String name;
    int age;
    String Major;
}
```

## 2.Servlet

```
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class LServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置学生信息
        List<Student> studentList=new ArrayList<Student>();
        for (int i = 0; i <10 ; i++) {
            int t=i+1;
            studentList.add(new Student(t,"name",18,"计算机"));
        }

        //保存查询的结果到request中
        req.setAttribute("stulist",studentList);

        //请求发送给jsp页面
        req.getRequestDispatcher("/Show_student.jsp").forward(req,resp);
    }
}
```

## 3.XML

```
	<servlet>
        <servlet-name>LServlet</servlet-name>
        <servlet-class>com.example.kaoshi.LServlet</servlet-class>
 	</servlet>
    <servlet-mapping>
        <servlet-name>LServlet</servlet-name>
        <url-pattern>/Hello</url-pattern>
    </servlet-mapping>
```

## 4.JSP

```
<html>
<head>
    <title>Title</title>
    <style>
        table{
            border: 1px blue solid;
            width: 500px;
            border-collapse: collapse;/*合并边框*/
        }
        td,th{
            border: 1px blue solid;
        }
    </style>
</head>
<body>
    <%
        List<Student> studentList= (List<Student>) request.getAttribute("stulist");
    %>
    <table>
        <%--表头--%>
        <tr>
            <td>学号</td>
            <td>姓名</td>
            <td>年龄</td>
            <td>专业</td>
        </tr>

        <%for (Student student:studentList) {%>
            <tr>
                <td><%=student.getID()%></td>
                <td><%=student.getName()%></td>
                <td><%=student.getAge()%></td>
                <td><%=student.getMajor()%></td>
            </tr>
        <%}%>
    </table>
</body>
</html>
```

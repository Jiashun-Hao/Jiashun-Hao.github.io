---
title: "Mysql数据库使用命令"
publishDate: 2021-03-14 
description: '笔记'
tags:
  - SQL
language: 'Chinese'
---

# DDL数据定义语言

## 一、数据库
### 1.创建数据库
```sql
CREATE DATABASE 库名;
#防止重复创建而报错
CREATE DATABASE IF NOT EXISTS 库名;
```
### 2.选择数据库
```sql
USE hao;
```
### 3.删除数据库
```sql
DROP DATABASE 库名;
#防止重复删除而报错
CREATE DATABASE IF EXISTS 库名;
```
## 二、数据表
### 1.创建数据表
```sql
CREATE [TEMPORARY] TABLE [IF NOT EXECUTE] 数据表名(create_definition)[table_options][select_statement]

1.TEMPORARY:如果使用该关键字则表示该表为临时表
2.IF NOT EXECUTE：避免表存在时Mysql报错
3.create_definition：表的列属性部分，一个表至少有一列
4.table_options：表的一些特性参数
5.select_statement：SELECT语句描述部分，用它可以快速的创建表

create_definition详细说明：
col_name type [NOT NULL | NULL] [DEFAULT default_value] [AUTO_INCREMENT] [PRIMARY KEY] [reference_definition]

1.col_name：字段名
2.type：字段类型
3.[NOT NULL | NULL]：该字段是否允许为空。默认允许NULL
4.DEFAULT default_value：字段的默认值
5.AUTO_INCREMENT：表示是否自动编号，一个表只能有一个AUTO_INCREMENT列，且必须被索引
6.PRIMARY KEY：该字段是为主键
7.reference_definition：注释

举例：
CREATE TABLE IF NOT EXISTS jia(
    ID INT UNSIGNED AUTO_INCREMENT,#UNSIGNED表示无符号
    title VARCHAR(100) NOT NULL,
    author VARCHAR(40) NOT NULL,
    date DATE,
   PRIMARY KEY (ID)#表示主键为ID
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
#存储引擎是innodb
#字符集是utf8;
```
### 2.查看表的结构
```sql
show columns from 表名[from 数据库名];
或者
show columns from 数据库名.表名;
或者
DESCRIBE 数据表名 [列名];
```
### 3.修改表
```sql
#1.修改表名
RENAME TABLE 旧名字 to 新名字;
或
ALTER TABLE 旧名字 RENAME to 新名字;

#2.语法
ALTER TABLE 表名 ADD（添加字段）|MODIFY（字段类型）|CHANGE（字段名）|DROP（删除字段） COLUMN 字段名 字段类型 【约束】
```
### 4.删除表
```sql
DROP TABLE IF EXISTS 表名;
```
### 5.复制表
```sql
#1.仅仅复制表的结构
CREATE TABLE 新表 LIKE 被复制的表;

#2.复制表的结构和数据
CREATE TABLE 新表 select * FROM 被复制的表;
```

## 三、MySql操作
### 1.插入记录
```sql
insert into 表名 (字段1,字段2,字段3,...) value ('属性1','属性2','属性3',...);
```
### 2.基础查询
```sql
# 查询的结果是一张虚拟表
# 类似与Java的打印语句
select 要查询的列表1,要查询的列表2 from 列表所在的表名;
或者
select * from 列表所在的表名;#查询表内所有的列
```
### 3.查询函数与起别名
```sql
select USER();#查询函数，当前用户
select USER() AS "郝佳顺";#AS为起别名,或者使用空格代替
```
### 4.查询字段种类
```sql
select 字段名 from 表名;#查询所有字段
#DISTINCT
select DISTINCT 字段名 from 表名;#查询字段的种类
```
### 5.判空函数
```sql
select ifnull(表达式1,表达式2) from 表;#如果表达式1为空则查询内容为表达式2的值
```
### 6.条件查询
```sql
select 列名1,列名2,列名3,列名4 from 表名 where NOT(表达式);
```
### 7.模糊条件查询
```sql
#模糊查询不管前面或者后面有多少字符(0到多个)都用%代替
select 列名1,列名2,列名3,列名4 from 表名 where 条件列名 like '%a%';
#如果确定模糊的个数则用下划线_代替
select 列名1,列名2,列名3,列名4 from 表名 where 条件列名 like '_a%';
#如果就是要查询包含下划线的内容则使用转义字符
select 列名1,列名2,列名3,列名4 from 表名 where 条件列名 like '_\_%';
#转义字符也可以自定义
select 列名1,列名2,列名3,列名4 from 表名 where 条件列名 '_&_%' ESCAPE '&';
```
### 8.查询字段的值是否在列表内
```sql
select 列名1,列名2 from 表名 where 条件列名 in('字段1','字段2');
```
### 9.查询字段的值是否在范围内
```sql
select 列名1,列名2 from 表名 where 条件列名 BETWEEN '10' and '30';
```
### 10.查询值为空（NULL）的字段
```sql
#直接使用=null查询不到
#判断为空
select 列名1,列名2 from 表名 where 条件列名 is null;
#判断不为空
select 列名1,列名2 from 表名 where 条件列名 is not null;

is：只能判断NULL值
=：只能判断普通值
<=>:可以判断普通值和NULL值
```
### 11.查询结果排序
```sql
#排序条件列 
单个字段、多个字段（先后顺序）、函数、表达式、别名（复杂简化）、列数
#升序(默认)
select 列名1,列名2 from 表名 where 条件列名 <='30' ORDER BY 排序条件列名 ASC ;
#降序
select 列名1,列名2 from 表名 where 条件列名 <='30' ORDER BY 排序条件列名 DESC ;

#函数参与排序
select * from 表名 where length(条件列名)<3 order by length(条件列名) DESC ;
#列号排序
select * from 表名 where length(条件列名)<3 order by 1 DESC ;#按第一列
```
## 四、常用函数
### 1.统计行数
```sql
select COUNT(*) from 表名;
或
select COUNT(1) from 表名;
```
### 2.分组前查询
```sql
#分组查询依据 group by
#一般是所查询的分组函数+分组依据
SELECT 列名1,sum(列名2) from 表名 group by 列名1（分组依据）;

#练习 查询部门名中包含a字符的部门的最高工资
SELECT MAX(NUMBER) 最高工资,author 部门名称 from 表名 where author like '%a%' group by author;
```
### 3.分组后查询
```sql
#分组前查询条件使用 where 并且where后面不可以跟函数
#分组后查询条件使用 having 后面可以跟函数
练习：查询每个部门最高工资大于20的人
SELECT MAX(工资) 最大值,部门名称 from 表名 group by 部门名称 having 最大值>20;
```
## 五、SQL92语法
### 1.多表等值连接
```sql
#不同表中属性名不同
select author,NUMBER,
from 表1 别名1,表2 别名2 
where 别名1.ID=别名2.ID;

#不同表中属性名相同
select 别名1.列名,别名2.列名
from 表1 别名1,表2 别名2 
where 别名1.列名=别名2.列名;
#例
select j.ID,j.author,
       t.ID,t.author1
from jia j,test1 t
where j.id=t.ID;
```
## 六、SQL99语法
### 1.SQL99与SQL92区别
`Sql92仅支持 内连接`

`Sql99支持 内连接、外连接、交叉连接`
#### 1.1内连接
```sql
#SQL92
select last_name,department_name
from employees e, departments d
where e.department_id = d.department_id #连接条件
    AND d.department_id>=100 #筛选条件

#SQL99
select last_name,department_name 
from employees e 【inner】 join departments d #inner可省
on e.department_id = d.department_id;#连接条件
where d.department_id>=100 #筛选条件
```
#### 1.2外连接
```sql
#外连接的作用主要在于查询一个表（主表）有的而另外一个表（从表）没有的数据字段
#外连接查询分为左连接和右链接

#语法：
select 查询的列表
from 表1 别名
left|right [outer] join 表2 别名
on 连接条件
where 筛选条件；
```

## 七、子查询
### 1.子查询规范
```sql
1.select 后面
	要求：子查询的结果为单行单列
2.from 后面
	要求：子查询的结果可以为多行多列
3.where 或 having 后面 ※
	要求：子查询的结果必须为单列
			单行子查询
			多行子查询
4.exists 关键字后面查询结果为true 或 false
	要求：子查询结果必须为单列（相关子查询）
	
#例子
查询jia表中是否有 author属性为'a'的字段
select exists(
        select *
        from jia
        where author='a'
) CX

```
### 2.多行子查询
```sql
#关键字：
in：判断某字段是否在指定列表内
any/some: 判断某字段的值是否满足其中任意一个
all：判断某字段的值是否满足里面所有的
```

## 七、分页查询
```sql
select * from 查询表 limit [起始位置默认为0] 查询条数;
#小技巧
select * from dept where deptno >10 order by deptno asc limit n;//下一页
select * from dept where deptno <60 order by deptno desc limit n//上一页
```
## 八、联合查询
```sql
#联合查询
union 联合 合并：将多条查询语句的结果合并成一个结果
#语法：
查询语句1
union
查询语句2
union
...
应用场景：
要查询的结果来自于多个表，且多个表没有直接的连接关系，但查询的信息一致时
特点：★
1、要求多条查询语句的查询列数是一致的！
2、要求多条查询语句的查询的每一列的类型和顺序最好一致
3、union关键字默认去重，如果使用union all 可以包含重复项
```
## 九、约束
```sql
#1.非空约束：NOT NULL 
ID int(255) not null 

#2.设置默认值：DEFAULT
name varchar(70)  default '郝'

#3.设置主键：PRIMARY KEY 唯一且非空
ID int(255) not null PRIMARY KEY 

#4.设置唯一：UNIQUE，限定该字段不能重复
name varchar(70)   default '郝' UNIQUE,

#5.设置约束：CHECK
#MySQL不支持，语法不报错，但无效
name  varchar(70)   CHECK(name='男' or name='女')

#6.设置外键约束：FOREIGN KEY
name varchar(70) ,
CONSTRAINT [约束名] FOREIGN KEY (name) REFERENCES 约束来源表(约束来源字段)


#1.添加外键需要两个表的索引一致，如果一个是主键那么另外一个也是主键，目前不知道为什么字符不能做主键
#2.设置外键的语句要放在表的最后
#例子：
#外链表
create table if not exists Hao1(
    ID int(255) not null PRIMARY KEY ,
    name varchar(50),
    number int

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
#主表
create table if not exists Hao(
    ID int(255) not null PRIMARY KEY ,
    name varchar(50),
    number int,
     CONSTRAINT FK FOREIGN KEY (ID) REFERENCES hao1(ID)#目前不知道为什么字符不能做索引

)ENGINE=InnoDB DEFAULT CHARSET=utf8;#索引必须一致
```
[无法添加外键](https://blog.csdn.net/wangpeng047/article/details/19624351)

# DML数据操纵语言

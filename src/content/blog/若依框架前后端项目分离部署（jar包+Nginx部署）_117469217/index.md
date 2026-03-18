---
title: "若依框架前后端项目分离部署（jar包+Nginx部署）"
publishDate: 2021-06-02
tags:
  - '若依框架'
description: '笔记'
language: 'Chinese'
---

# 若依框架前后端项目分离部署（jar包+Nginx部署）
最近用偌依的前后端分离框架做了一个小项目，想要部署到另外一台windows电脑（服务器）上的时候出了一点问题，最后解决，写一篇文档总结一下。

## 1.部署必备
要将项目部署到服务器，该服务器必须具备以下几个条件：
1.JDK1.8以上
2.Tomact（如果部署jar包则不用）
3.Nginx （必备）
4.Redis服务（直接下载运行不设置服务也可以）
5.Mysql的连接以及正确性
## 2.打包
这一步可以参照官网给出的文档，这里我之写明我实现了所用到的部分

### 2.1后台打包
如果需要打包到Tomact，则将ruoyi/pom.xml中的packaging修改为war，这里使用的是jar包，所以不需要更改。

![](https://i-blog.csdnimg.cn/blog_migrate/4ecf62f5f5942657123b1e483e662ea4.png)

然后通过Maven进行打包即可。

### 2.2前端打包
在控制台输入打包命令

![](https://i-blog.csdnimg.cn/blog_migrate/b65745310c522aeb28e7209b41f53745.png)

```java
# 打包正式环境
npm run build:prod

# 打包预发布环境
npm run build:stage
```
打完以后会产生一个名叫dist的文件夹

![](https://i-blog.csdnimg.cn/blog_migrate/a311a9a15afd4897f58832f8cde8ae9a.png)

## 3.部署
第一步，启动数据库。
第二步，启动Redis服务
	在Redis文件路径上直接输入cmd回车以后输入`redis-server.exe redis.windows.conf`，不会的可以看这个[window启动redis](https://blog.csdn.net/qq_41530004/article/details/103287848)
第三步，运行后台的jar包（或Tomact部署war包）。

**关键开始：**

第四步：配置Nginx，首先将刚刚打好的前端包（dist文件夹）放入到Nginx中的HTML文件夹里。

![](https://i-blog.csdnimg.cn/blog_migrate/efc37baf8f5c0827ebaab07ff832c92e.png)

然后返回一层到conf下修改nginx配置文件

![](https://i-blog.csdnimg.cn/blog_migrate/5c34a721bbf31a2c2f3fd5520834abec.png)

我的修改如下，复制的时候将注释删除：
```java
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       90;//前端项目的端口
        server_name  localhost;
        location / {
        root   html/dist;//刚刚保持的路径
        index  index.html index.htm;
        }
		
      location /prod-api/{
      	proxy_set_header Host $http_host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header REMOTE-HOST $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_pass http://localhost:8090/;//后台项目的运行端口
}

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

做完这些以后运行Nginx，然后访问前端的端口（90）就可以啦！

---
title: "Java 简单笔记 -- IO流(二)"
publishDate: 2020-10-03
description: '笔记'
tags:
  - Java
language: 'Chinese'
---

# IO流（二）

# 一、缓冲流
**作用：** 直接作用于在==节点流==之上，缓冲流属于处理流的一种，其目的是为了加快流的处理速度；
**原理：** 是在创建流对象的时候，会创建一个内置默认大小的缓冲区数组（大小为：8192（8kb）），等缓冲区满了以后在写入文件，减少系统IO次数，从而提高读写效率；
**详细图解：**[图解缓冲流](https://www.cnblogs.com/pjhaymy/p/13339501.html).
<br>
## 1.字节缓冲流的使用
```java
import org.junit.jupiter.api.Test;
import java.io.*;
public class Buffered {
    @Test
    public void Buffered(){
        File in=new File("Text1.txt");//读取位置
        File out=new File("Text2.txt");//写入位置
        BufferedInputStream BuffIn=null;
        BufferedOutputStream BuffOut=null;
        try {
            FileInputStream Fint=new FileInputStream(in);//创建基本的节点流
            FileOutputStream Fout=new FileOutputStream(out);//创建基本的节点流

            BuffIn=new BufferedInputStream(Fint);
            BuffOut=new BufferedOutputStream(Fout);
            byte [] b=new byte[24];
            int len=0;
            while((len=BuffIn.read(b))!=-1){
                    BuffOut.write(b,0,len);
                    BuffOut.flush();//刷新，清空未使用空间
            }

        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            try {
                BuffOut.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                BuffIn.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```
### 2.补充
1.由于缓冲流起到是是一种包装的作用，所以直接关闭缓冲流的对象即可；
2.先关闭输入，再关闭输出；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/27b88fead7f4993c4829fbd715888805.png#pic_center)

3.需要在try-catch以外先声明缓冲流，并赋值为null；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6ff7c1745c5fd36458be2dcf21853232.png#pic_center)

4.==在使用缓冲流 ***完成写入*** 以后，最好使用`.flush()`方法清空一下缓存区；其原因在于当输入、输出流被关闭时候仍然有可能有一部分数据在缓冲区，我们需要强制输出一下；==

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/66839caae2ab88f6596ebdee01407229.png#pic_center)

5.测试程序执行时间语句：
```java
 		long start=System.currentTimeMillis();
        long end=System.currentTimeMillis();
        System.out.println("执行时间为"+(end-start)+"毫秒");
```
<br>

### 3.字符缓冲流（BufferedReader和BufferedWriter）的特殊方法
字符缓冲流用法和字节缓冲流基本一样；
```java
public void BufferedFileReader(){
        File in=new File("Text2.txt");//读取位置
        File out=new File("Text3.txt");//写入位置
        BufferedReader Br=null;
        BufferedWriter Bw=null;
        try{
            FileReader Fin= new FileReader(in);
            FileWriter Fout= new FileWriter(out);

            Br=new BufferedReader(Fin);
            Bw=new BufferedWriter(Fout);

            String str=null;

            while((str=Br.readLine())!=null){
                Bw.write(str);
                Bw.newLine();//换行
                Bw.flush();//清理缓冲区
            }

        }catch (Exception e){
            e.printStackTrace();
        }finally{
            try {
                Bw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                Br.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```
需要特殊说明`FileReader`的一个特殊方法——`readLine()`

==该方法可以一次读取一行的字符==

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8cab88adf933d9d024f60a20cb922d42.png#pic_center)

使用的时候需要注意以下几点；
* 读入的数据要注意有/r或/n或/r/n
* 没有数据时会阻塞，在数据流异常或断开时才会返回null
* 使用socket之类的数据流时，要避免使用readLine()，以免为了等待一个换行/回车符而一直阻塞

<br>

# 二、转换流
**作用**：直接作用在**节点流**之上，完成流的转换；

* 输入型字节流转换为字符流：`InputStreamReader`;
* 输出型字节流转换为字符流：`OutputStreamWriter`;

同时，==字节流可以视为字节数组，字符流可以视为字符串==，转换流也可以视为 ==**字节数组**和**字符串**== 的转换，这也衍生出了两个概念：

* **编码**：字符串 ——》字节数组
* **解码**：字符串《——字节数组

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/76376137072c411ea3e0949b3bdb67f8.png#pic_center)

在这两个流的构造器中需要传递两个参数：**要进行编/解码的文件**和**编码集（charstName）**；

所谓编码集就是进行编码/解码的格式集合，常用的有以下几种；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/58b003222f33278bca93f4ccd81db84e.png#pic_center)

并且，**编码集按照字符串的格式输入：**

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d2c475dc5a9573c966085e4ce61f63e4.png#pic_center)
<br>
## 1.解码使用
```java
import org.junit.jupiter.api.Test;
import java.io.*;

public class Text {
    @Test
    public void test(){
        //1.解码：字节数组到字符串
        BufferedReader Bre=null;
        try {
            File file=new File ("Text1.txt");
            FileInputStream Fin=new FileInputStream(file);//字节流

            //按照GBK的形式使字节流转换为字符流
            InputStreamReader Iin=new InputStreamReader(Fin,"GBK");

           Bre=new BufferedReader(Iin);//字符流

            System.out.println(Bre.readLine());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                Bre.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
    }
}
```
源文件：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/fdd0a57f4c946202bc3a0c9a2f13bfb9.png#pic_center)

解码后：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/75a1e6f68627f8574b6e7bd84494c8b3.png#pic_center)
<br>

### 2.编码使用
```java
import org.junit.jupiter.api.Test;
import java.io.*;

public class Text {
    @Test
    public void test(){
        //1.解码：字节数组到字符串
        BufferedReader Bre=null;
        BufferedWriter Bwr=null;

        try {
            File file=new File ("Text1.txt");//解码文件的来源
            FileInputStream Fin=new FileInputStream(file);//节点流

            //按照GBK的形式使字节流转换为字符流
            InputStreamReader Iin=new InputStreamReader(Fin,"GBK");

            Bre=new BufferedReader(Iin);//字符流

            
            //2.编码：字符串到字节数组
            File file1=new File("Text2.txt");//编码文件的写入位置
            FileOutputStream Fout=new FileOutputStream(file1);//节点

            //按照GBK的形式是字符流转换为字节流
            OutputStreamWriter Outp=new OutputStreamWriter(Fout,"GBK");

            Bwr=new BufferedWriter(Outp);

            String str;
            while((str=Bre.readLine())!=null){
                Bwr.write(str);
                Bwr.newLine();
                Bwr.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                Bwr.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                Bre.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```
编码后写入：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/726a99e2b8e46244d50f8a31de5ccb1f.png#pic_center)
<br>

### 3.补充
* `System.out.println()`的作用是将内容打印到控制台同时消耗该流；也就是说如果显示的打印了则无法在写入到文件内部；
* 编码和解码中的 **“码”** 就是指计算机中的字节；
**其它东西变成字节，就是编码；
字节变成其他东西，就是解码；**
<br>

# 三、标准输入/输出流
**作用：**
`System.out` :从显示器输出数据；
`System.in`：从键盘输入数据；

**使用：**
```java
import org.junit.jupiter.api.Test;
import java.io.*;

public class IO {
    public static void main(String[] args) throws IOException {

        InputStream in=System.in;//创建输入流
        InputStreamReader input=new InputStreamReader(in);//输入性字节流
        //InputStreamReader input=new InputStreamReader(System.in);//组合写法

        BufferedReader Buf=new BufferedReader(input);//包装为缓冲读取字符流
        
        String str;
        
        PrintStream out=System.out;//创建输出流
        
        while((str=Buf.readLine())!=null){
            out.println(str);//输出
        }
        out.close();
        Buf.close();

    }
    /*@Test
    public void HH() throws IOException {
        //标准输入流的使用
        //InputStream in=System.in;//创建输入流
        InputStreamReader input=new InputStreamReader(System.in);
        //InputStreamReader input=new InputStreamReader(in);//输入性字节流
        BufferedReader Buf=new BufferedReader(input);
        String str;

        PrintStream out=System.out;
        while((str=Buf.readLine())!=null){
            out.println(str);
        }
         out.close();
        Buf.close();

    }*/
}
```
**补充：** 
* 在`@Test`中无法使用标准输入流；
* 在做题过程中一般使用`Scanner`,`Scanner`的构造器支持多种方式，可以从字符串（Readable）、输入流、文件等等来直接构建Scanner对象，有了Scanner了，就可以逐段（根据正则分隔式）来扫描整个文本，并对扫描后的结果做想要的处理。
	```java
	//Scanner(扫描器)
	Scanner sc=new Scanner (System.in);
	```
<br>

# 四.打印流
**作用：** 打印（输出内容）到控制台或者文件中；
**分类：** 字节打印流（`PrintStream`）和字符打印流（`PrintWriter`）
**特点：** 打印流是IO中最方便的输出类，并且打印流只能是输出流（废话）
```java
import org.junit.jupiter.api.Test;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;

public class Main {
    @Test
    public void Stream1() throws FileNotFoundException {
        FileOutputStream out=new FileOutputStream("Text1.txt");//创建节点输出流
        PrintStream OutStream=new PrintStream(out);//将其包装为打印流
        OutStream.print("123456789");//写入要打印的内容
        OutStream.close();

    }
}
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5e1ec499f3e9918ae189560eddc19d87.png#pic_center)
<br>

# 五.Data流（数据流）
**作用：** 为了更好的处理基本数据类型；
**分类：** 读取基本数据类型（`DataInputStream`）和写出基本数据类型（`DataOutputStream`）
**特点：** 专针对于Java的基本数据类型所衍生出的处理流；

**配图：**

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/04efad6449f97a385d659f782a1c44e8.png#pic_center)

使用：
```java
import org.junit.jupiter.api.Test;

import java.io.*;

public class Main {
    @Test
    public void Data() throws IOException {
       FileOutputStream out=new FileOutputStream("Text2.txt");//创建基本写入节点流(写入位置)
        DataOutputStream DataOut=new DataOutputStream(out);//数据流包装
        DataOut.writeUTF("好好学习");//写入
        DataOut.writeBoolean(true);
        DataOut.writeInt(123);

       FileInputStream in=new FileInputStream("Text2.txt");//读取位置
        DataInputStream DataIn=new DataInputStream(in);
        System.out.println( DataIn.readUTF());
        System.out.println( DataIn.readBoolean());
        System.out.println( DataIn.readInt());

    }
}
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/3e41487d333f4285a3ed000db4856f73.png#pic_center)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/fdeec0d6accf5edeee65abc6a6d7e886.png#pic_center)

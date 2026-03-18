---
title: "Java 简单笔记 -- 集合(应用层略谈)"
publishDate: 2020-05-17 
description: '笔记'
tags:
  - Java
language: 'Chinese'
---

# 一、集合：
集合是Java中用于存储数据的“容器”，可以看作为是一种**特殊的数组**，与数组不同的是，**集合的容量（长度）不是固定的**，并且集合只能存储**引用数据类型**（数组可以存储基本和引用），所以在集合存储一般对象时候必须使用包装类来定义声明；

PS：之前以为集合相较于数组还有一个特点是可以存储不同类型的数据，但是后来发现其实数组本身就可以存储不同类型的数据；

具体操作为使用根节父类Object类来定义，存储不同的包装类元素（虚拟方法调用）：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/7524e3bbae8b072d6e403d0c3e24d159.png)

好了，继续说集合；

集合下的体系可以分为两种：**Collection接口**和**Map接口**两种体系；

**Collection接口：**
* **Set接口**：用于存储无序、不重复出现的元素的集合；（无序！=随机）
	|—— ——实现类：**ArrayList、LinkedList、Vector**；
     
* **List接口**：用于存储有序、（可以）重复出现的集合；（动态数组）
	 |—— ——实现类：**HashSet、LinkedHashSet、TreeSet**；

**Map接口：**
* **Map接口**：用于存储 **“Key—Value”** 键值对，即具有映射关系的集合；（类似数学中的函数：y=f（x））
	 |—— ——实现类：**HashMap、LinkedHashMap、TreeMap**；
<br>


# 二、Collection接口：
聊集合，其实就是聊集合中特有的方法，正是因为有了这些方法，集合才有了更多的使用价值；

### 1.Collection接口下的通用方法（List与Set通用）
```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

public class Hello {
    public static void main(String[] args) {
      Collection coll=new ArrayList();//collection本身无法实例化对象，借助子类ArrayList；
        Collection coll1=new ArrayList();
      //1.返回集合中元素（对象）的个数；
        coll.size();
        
      //2.在集合里面添加元素(任意类型)；
        coll.add(3);coll.add(4);
        coll1.add(4);coll1.add("a");coll1.add(true);coll1.add(3);
        
      //3.将集合里面所有元素添加到另外一个集合；
        coll1.addAll(coll);
        
      //4.判断集合是否为空；
        coll.isEmpty();
        
      //5.清空集合元素；
        coll.clear();
        
      //6.查看当前集合所有元素；
        System.out.println(coll);
        
      //7.判断集合中是否有某个元素(任意类型)；
        coll.contains(3);//判断是根据equals方法，如果存入集合中的元素是自定义类的对象，必须重写equals方法
        
      //8.判断某个集合是否为当前集合的“子集”；
        coll1.containsAll(coll);
        
      //9.求某个集合与当前集合的“交集”；
        coll.retainAll(coll1);//如果coll与coll1有交集，交集内容赋值给coll，如果没有则coll为空；
        
      //10.删除集合中的一个元素；
        coll1.remove("a");//返回true或false
        
      //11.删除两个集合相同的元素
        coll1.removeAll(coll);
        
      //12.判断两个集合是否完全相等（顺序也相等）
        coll1.equals(coll);
        
      //13.计算集合中的哈希值(叠加)
        coll1.hashCode();
        
      //14.将集合转化为数组;
        coll1.toArray();
	  //14.1.使用；
	  //如果toArray中不写，将list直接转为Object[] 数组；
　　  //如果toArray中写明要转化的目标，将list转化为你所需要类型的数组，当然我们用的时候会转化为与list内容相同的类型。
	    b.add("c");
		String [] ars=new String[b.size()];
		b.toArray(ars);	
        
      //15.数组转换为集合(数组必须为引用数据类型--包装类定义);
        Integer [] a={1,2,3,4};//如果是基本数据类型则视为将一个对象索引传入集合；
        Collection coll3= Arrays.asList(a);
        
      //16.集合遍历：
        //第一种方法：使用迭代器Iterator;
        //1):指针一开始在“表”上;
        Iterator i =coll.iterator();
        while(i.hasNext()){//2):hasNext()判断一个元素是否有值;
            System.out.println(i.next());//3):next(),返回当前元素并将指针下移一位;
        }
        //第二种方法：使用增强for循环(也可以便利数组);
        for (Object i1 : coll){//将coll的值给了i1；并不改变原有的值;
            System.out.println(i1);
        }
    }

}
```
<br>

### 2.List接口下的方法和实现类：
#### 2.1实现类：
* **ArrayList：** ArrayList是List的主要实现类，其底层使用数组存储方法存储对象；其特点是方便遍历；![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f4bf512f1c1555987df1be951c0e0fd9.png)
* **LinkedList：** 使用的方法与ArrayList中一样，与之不同的是它的底层是使用链表存储；其特点是适用于频繁的删除和插入；
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ae4c2cf15e34dad796d2c611233d8a70.png)
* **Vector：** 该实现类主要用于实现线程的安全，插入删除较慢，所以现在基本不用这里也不做太多说明；
<br>

#### 2.2实现方法：
由于ArrayList是List的主要实现类，所以方法的练习都用ArrayList实现的对象来说明,并且只说明相较于**通用方法** List独有和新增的方法；
```java
import java.util.ArrayList;
public class ceshi {
    public static void main(String[] args) {
        ArrayList list =new ArrayList();
        ArrayList list1 =new ArrayList();
        list1.add(1);list1.add(2);list1.add(3);list1.add(4);

       //1.指定位置添加元素
       //Void add(int index,Object ele):指定位置index,添加元素ele；
        list.add(0,1);

       //2.指定位置添加集合
       //Boolean addAll(int index,Collection eles):指定位置添加集合
        list1.addAll(0,list);

       //3.获取指定位置的元素
       //Object get(int index): 指定位置index;
        list.get(0) ;

       //4.删除指定位置的元素
       //Object remove(int index):删除指定位置index的元素；(后续的往前顶)
        list.remove(0);

       //5.删除两集合的中交集的元素
       //Boolean removeAll(Collection eles):删除当前集合与eles的中交集的元素;
        list.removeAll(list1);

       //6.修改指定位置的元素
       //Object set(int index,Object ele):修改指定位置index的元素为ele；
        list.set(0,2);

       //7.返回元素在集合中首次出现的位置
       //int indexOf (Object obj):返回obj在集合中首次出现的位置，如果无则返回-1；
        list.indexOf(1);

       //8.返回元素在集合中最后出现的位置
       //int lastIndexOf (Object obj):返回obj在集合中最后出现的位置，如果无则返回-1；
        list.lastIndexOf(1);

       //9.返回集合中的子集
       //List sublist(int formIndex,int toIndex):返回从fromIndex到toIndex中一个左闭右开的子集list
        System.out.println(list1.subList(0,3));//取到2为止
    }
}
```
<br>

### 3.Set接口下的方法和实现类：
#### 3.1实现类：
* **HashSet：** HashSet是Set接口的主要实现类；前面说到的Set存储的无序性是指在元素存储的位置是无序的，但并不是杂乱无章；元素的存储位置按照HashSet的计算（哈希）计算分配到特定的位置；稍后详细说明；
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/eb5212d8cbab3c1b6bff610b2da061ba.png)
* **LinkedHashSet：** LinkedHashSet是使用了一个链表来维护添加进集合的顺序，其顺序就是添加的顺序，他的添加性能低于HashSet（因为多了一个链表），但是遍历方便（因为多了一个链表）。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6503ea339625bb69cde5be2ef178d973.png)
* **Treeset：** Treeset有很多特点：
   	①向Treeset中添加的元素必须是同一类型（类）的；
   	②如果不设置，则添加进的顺序默认按照ASCII码进行从小到大排序；
   	③如果添加的元素是**自定义类**所实例化的，则有两种方法可以自定义排序：**自然排序**和**定制排序**（稍后详谈）

#### 3.2特殊的点：（相较于Collention接口无新增方法）
**3.2.1、Hashset中特殊的点**

&nbsp;&nbsp;1）：Hashset具有不可重复性，存储无序性；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/92b32b14fa1d3861a519b2a3456c6644.png)<br>

&nbsp;&nbsp;

2）：可以增加NULL；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/61c60476d05b88b7bf7ba499b8e911c6.png)![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a48036776b3b816e3838bb5456509f2a.png)<br>

&nbsp;&nbsp;

3）：当向set中添加对象的时候，首先调用对象所在类的**hashcode（）方法**，此方法用于计算机对象的==哈希值==，而此哈希值决定了此对象在set中的存储位置。通过哈希值生成的位置，如果在此元素添加之前没有其他元素，则将该元素放入该位置，如果有，在通过equals（）方法比较两个对象是否完全相同，如果完全相同，则保留最先存在的元素；

==所以：hashcode（）要与equals（）方法一致，要么都为true要么都为false==


<br>

&nbsp;&nbsp;4）：规定添加进set的元素所在的类（多为自定义类）一定要重写 **equals（）** 方法 和  **hashcode（）** 方法来确保 ==“不可重复”== 的特点；
测试：
```java
package NewOnePackag;
import java.util.HashSet;
public class ceshi {
    public static void main(String[] args) {
        HashSet has1=new HashSet();
        has1.add(1);
        has1.add(new Person(13,"xiaoming"));
        has1.add(new Person(13,"xiaoming"));
        System.out.println(has1.size());
        System.out.println(has1);
    }

}
class Person{
    Integer age;
    String name;
    public Person(int age,String name){
        this.age=age;
        this.name=name;
    }

    @Override
    public String toString() {
        return "Person{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }
}
```
此处没有重写**equals（）** 方法 和  **hashcode（）** 方法，所以输出结果存在重复性；（注意，自定义类输出的时候默认打印的是地址，原因在于没有重写toString方法）

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9428efe51207006d7d97ef635e0bb9e2.png)

修改代码：
```java
package NewOnePackag;
import java.util.HashSet;
import java.util.Objects;

public class ceshi {
    public static void main(String[] args) {
        HashSet has1=new HashSet();
        has1.add(1);
        has1.add(new Person(13,"xiaoming"));
        has1.add(new Person(13,"xiaoming"));
        System.out.println(has1.size());
        System.out.println(has1);
    }

}
class Person{
    Integer age;
    String name;
    public Person(int age,String name){
        this.age=age;
        this.name=name;
    }

    @Override
    public String toString() {
        return "Person{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;
        Person person = (Person) o;
        return age == person.age &&
                name.equals(person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(age, name);
    }
}
```
输出结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b6b09cf7ccca07e9a535b319a8c8b0dc.png)

ps：上面所写的hashCode（）方法为系统默认集成的，其实我们也可以自己手写，在这里写一个：
```java
public int hashCode() {
        final int prime=31;
        int result =1;
        result=prime*result+((age==0) ?0 :age.hashCode());
        result=prime*result+((name==null) ?0 :name.hashCode());
        return result;
    }
```
<br>

**3.2.2、Treeset中特殊的点**
前面说到了Treeset 的几个基本的特点，其中说到 ==“如果添加的元素是**自定义类**所实例化的，则有两种方法可以自定义排序：**自然排序**和**定制排序**”== 

**1.自然排序：**

实现自然排序需要三个点：
①自定义类需要实现Comparable接口；
②重写CompareTo方法；
③CompareTo() 方法与 HashCode()方法 以及 equals()方法应保持一致

原因也很简单，如果当前类不实现Comparable接口，运行时候会报错，错误类型为`ClassCastException`(两个类型间转换不兼容时引发的运行时异常)

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0a57d26c528c3f69d9353067b5ebe524.png)

如果只实现了Comparable接口没有重写CompareTo方法，也会提示需要重写该方法；

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ff072bcfb3d0b66e9b690dd59bf1c991.png)

所以，伪•完整的代码是这样：
```java
import java.util.TreeSet;
public class ceshi {
    public static void main(String[] args) {
        TreeSet tre =new TreeSet();
        tre.add(new Person(13,"student"));
        tre.add(new Person(10,"student"));
        tre.add(new Person(18,"student"));
        tre.add(new Person(10,"student1"));
        System.out.println(tre);
    }

}

class Person implements Comparable{

    Integer age;
    String name;
    public Person(int age,String name){
        this.age=age;
        this.name=name;
    }

    @Override
    public int compareTo(Object o) {
        return 0;
    }

    @Override
    public String toString() {//如果不重写toString方法则会打印地址
        return "Person{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }

}
```
那么，这个排序是根据什么排序的？其实就是根据compareTo（）方法，上面重写的compareTo（）我没有添加任何判断，只是返回一个0，所以便有了这样的事——无论添加多少元素（不相同的元素），都只保留第一个。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/554a2be0f80f820099febef95b706845.png)

所以我们需要手写一个compareto（）方法；
```java
public int compareTo(Object o) {
        if (o instanceof Person){//判断是否为同一类型
            Person p=(Person)o;
            int i=this.age.compareTo(p.age);//先根据age排序
            if(i==0){
                return this.name.compareTo(p.name);//如果相同，再根据name排序
            }return i;//因为上面如果满足条件有一个return，所以这里不用else;
        }
        return 0;
    }
```
所以，下面这才是真•完整代码：
```java
import java.util.Objects;
import java.util.TreeSet;
public class ceshi {
    public static void main(String[] args) {
        TreeSet tre =new TreeSet();
        tre.add(new Person(13,"student"));
        tre.add(new Person(10,"student"));
        tre.add(new Person(18,"student"));
        tre.add(new Person(10,"student1"));
        System.out.println(tre);
    }

}

class Person implements Comparable{

    Integer age;
    String name;
    public Person(int age,String name){
        this.age=age;
        this.name=name;
    }

    @Override
    public int compareTo(Object o) {
        if (o instanceof Person){//判断是否为同一类型
            Person p=(Person)o;
            int i=this.age.compareTo(p.age);//先根据age排序
            if(i==0){
                return this.name.compareTo(p.name);//如果相同，再根据name排序
            }return i;//因为上面如果满足条件有一个return，所以这里不用else;
        }
        return 0;
    }

    @Override
    public String toString() {//如果不重写toString方法则会打印地址
        return "Person{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;
        Person person = (Person) o;
        return Objects.equals(age, person.age) &&
                Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(age, name);
    }
}
```

输出结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c969541d451fdd4a990cd3bfd224733c.png)

<br>
**2.定制排序：**
相较于自然排序，定制排序有以下两个特点：
①在自定义类外实现，不修改自定义类；
②==Compare() 方法==（注意不是CompareTo() 方法）与 HashCode()方法 以及 equals()方法应保持一致；

第一步：额外创建一个实现`Comparator`接口的类，注意不是Comparable接口；
第二步：重写Comparator中的`Compare`方法（equals（）方法默认使用父类，可以不用重写）
第三步：指明按照哪个属性排序
第四步及以后：同上

```java
import java.util.Comparator;
import java.util.Objects;
import java.util.TreeSet;
public class ceshi {
    public static void main(String[] args) {
        custom com=new custom();//4.实例化一个对象;
        TreeSet tre =new TreeSet(com);//5.将此对象传入构造器
        tre.add(new Person(11,"小明"));//6.添加元素(此处必修是Person)
        tre.add(new Person(12,"小白"));
        tre.add(new Person(12,"小黑"));
        System.out.println(tre);//7.打印测试

    }

}
class custom implements Comparator{ //1.第一步，额外创建一个实现了Comparator的类
    @Override
    public int compare(Object o1, Object o2) { //2.第二步，重写compare方法
        if(o1 instanceof Person && o2 instanceof Person ){//3.指明按照哪个属性排序
            Person c1=(Person)o1;
            Person c2=(Person)o2;
            int i=((Person) o1).getAge().compareTo(((Person) o2).getAge());
            if(i==0){
                return ((Person) o1).getName().compareTo(((Person) o2).getName());
            } return i;
        }
        return 0;
    }

}

class Person {
    private Integer age;
    private String name;
    public Person(int age,String name){
        this.age=age;
        this.name=name;
    }

    public int hashCode() {
        return Objects.hash(age, name);
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Person{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }

    public Person(Integer age, String name) {
        this.age = age;
        this.name = name;
    }
}
```
<br>


# 三、Map接口：
Map接口是与Collection接口同一级的接口，用于存储具有映射关系的数据，这一点可以理解为数学中的函数：y=f（x）；这是表示的对应关系为`Key—Value`，其中，Key使用set存储的，具有不可重复性，Value使用Collection存储的，可以有set和list的特性；这样的一对数据成为一个`Entry`,而Entry也是用set存放的，所以也是不可重复的；

因为Key与Value之间存在单向的一对一关系，即通过指定的Key总能找到唯一的、确定的Value；

#### 1.实现类：
由于Map接口下没有子接口，所以直接对应的是实现类；
* **HashMap：** HashMap是Map的主要实现类，根据哈希值的计算确定存储位置，还有一个特点在于向HashMap中添加元素时，会调用Key所在的类的equals（）方法，判断两个元素是否相同，如果相同，则添加==后进的元素==

* **LinkedHashMap：** 考虑哈希值存储位置，但是由于涉及到一个链表的增加，所以遍历时的顺序就是添加元素时候的顺序，特点是遍历很快，维护（插入、添加）很慢。

* **TreeMap：** 根据添加进Map中的元素的Key属性进行排序，并且要求所有的Key都为同一类才可添加，针对Key的排序也有**定制排序**和**自然排序**

* **Hashtable：** Hashtable是一个很古老的实现类，出现于1.0版本，用于保证线程安全，与HashMap不同，HashMap不允许使用NULL作为Key和Value。与HashMap相同，HashTable也不能保证Entry的顺序，他判断两个value相等的标准与HashMap一致，都是用equals（）方法。现在一般不用这个实现类，不过他的子类`Properties`很常用,常用来处理属性文件（键和值都为String类）
<br>

#### 2.实现方法：
```java
import java.util.HashMap;
import java.util.Map;

public class ceshi {
    public static void main(String[] args) {
    Map a= new HashMap();
        Map b= new HashMap();

    //1.向Map中添加元素（一对）
    //Object put(Object Key,Object Value);
       a.put(1,1);

    //2.删除元素（一对）
    //Object remove(Object Key)
       a.remove(1);

    //3.向Map中添加一个Map
    //Void putAll(Map map)
       a.putAll(b);

    //4.清空Map
    //Void clear()
       a.clear();

    //5.获取指定Key对应的Value值
    //Object get(Object Key):如果没有在返回null
       a.get(1);

    //6.判断Map是否存在某个Entry
    //Boolean containsKey(Object Key)
    //Boolean containsValue(Object Value)
       a.containsKey(1);
       a.containsValue(1);

    //7.判断集合的长度
    //int size();一个Entry长度为1
       a.size();   
       
    //8.判断集合是否为空
    //Boolean isEmpty();
       a.isEmpty();
       
    //9.判断两个集合是否完全相同
    //Boolean equals(Object obj);
       a.equals(b);     
    }
}
```
<br>

#### 遍历Map：
①遍历Key集（无序）
```java
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class ceshi {
    public static void main(String[] args) {
        Map map=new HashMap();
        map.put(1,2);map.put(3,4);map.put(5,6);map.put(7,8);map.put(9,0);
        Set set=map.keySet();//key使用set存放的
        for (Object obj:set){
            System.out.print(obj+" ");
        }
    }
}
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/509293b3178f9ce55ce25f6e37ee2e26.png)

<br>

②遍历Value集
```java
import java.util.*;
public class ceshi {
    public static void main(String[] args) {
        Map map=new HashMap();
        map.put(1,2);map.put(3,4);map.put(5,6);map.put(7,8);map.put(9,0);
        Collection values =map.values();
        
        Iterator i=values.iterator();//迭代器
        while(i.hasNext()){
            System.out.print(i.next()+" ");
        }
    }
}
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5a8cc55114a57c1d99d181434dbb9de0.png)<br>

③遍历Entry(自定义)
```java
import java.util.*;
public class ceshi {
    public static void main(String[] args) {
        Map map=new HashMap();
        map.put(1,2);map.put(3,4);map.put(5,6);map.put(7,8);map.put(9,0);

        Set set=map.keySet();
        for (Object obj:set){
            System.out.print(obj+"-->"+map.get(obj)+" ");
        }
    }
}
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/210ec48b60f442fbb1aef19b3c769c18.png)

<br>

④遍历Entry（方法）
```java
import java.util.*;
public class ceshi {
    public static void main(String[] args) {
        Map map=new HashMap();
        map.put(1,2);map.put(3,4);map.put(5,6);map.put(7,8);map.put(9,0);

        Set set=map.entrySet();
        for (Object obj:set){
            Map.Entry entry=(Map.Entry) obj;
            System.out.print(entry+" ");
        }
    }
}
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/54b0c438f0556b3ca80f606d7468e6de.png)

<br>

# 四、操作集合的工具类--Collections：
首先：`Collections`工具类不是`Collection`接口
* **Collection接口:** 下面有set和list子接口，前面提到过；
* **Collections工具类：** 很明显，多了一个s......是一个工具类，可以用来操作Collection接口和Map接口，也就是说可以操作‘集合’这一个整体；

同样的，Collections工具类的用法也是基于方法

```java
        //1.反转List中元素的顺序;
        Collections.reverse(List);

        //2.对List集合顺序进行随机排序（打乱）;
        Collections.shuffle(List);

        //3.根据元素的自然顺序对List集合升序排序;
        Collections.sort(List);

        //4.根据Comparator产生的顺序对List集合排序
        Collections.sort(List,Comparator);

        //5.交换List集合中两个元素的位置
        Collections.swap(List,int,int);//int为位置

        //6.根据元素的自然顺序，返回集合中最大元素
        //Object Collections.max(Collection)
        Collections.max(Collection);

        //7.根据元素的自然顺序，返回集合中最小元素
        //Object Collections.min(Collection)
        Collections.min(Collection);

        //8.根据Comparator产生的顺序，返回集合中最大元素
        //Object Collections.max(Collection,Comparator)
        Collections.max(Collection,Comparator);

        //9.根据Comparator产生的顺序，返回集合中最小元素
        //Object Collections.min(Collection,Comparator)
        Collections.min(Collection,Comparator);

        //10.返回指定集合中指定元素出现的次数
        //int Collections.frequency(Collection,Object)
        Collections.frequency(Collection,Object);

        //11.复制一个List集合到另一个List集合
        //Void copy(List dest,List src);将src中的内容复制到dest
        List list=new List();
        List list1=Arrays.asList(new Object[List.size()]);
        //要接收的数组的长度必须大于或等于被复制的数组;
        Collections.copy(list,list1);
        
        //12.替换List中旧的元素为新的元素
        //Boolean replaceAll(List list,Object oldval,Object newval)
        Collections.replaceAll(list1,1,2);
```






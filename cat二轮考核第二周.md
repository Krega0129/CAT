### 1. 触发（目标）对象

target：触发（目标）对象（事件对象的属性）

与**this**不同，**this**永远指向函数主人，但**target**指向触发对象的节点。（IE8一下不兼容）IE8一下的格式是**window.event.srcElement**

兼容写法：

```js
var target = e.target || window.event.srcElement
```

例：若给**ul**添加点击事件，点击**li**触发了该事件，则**this**指向**ul**，**target**指向被点击的**li**

### 2. 事件冒泡和事件捕获

###### 1. 事件冒泡：由里向外逐级触发同名事件

触发子节点事件，若父元素有相同的事件，则父元素在子元素触发后，也会触发该事件。

###### 2. 事件捕获：由外向里逐级触发同名事件

触发字节点事件，若父元素有相同的事件，则父节点先触发，逐级向内触发该事件。

###### 阻止事件冒泡：事件对象方法（要先获取到对象）

W3C标准：e.stopPropagation();

非标准IE：e.cancelBubble = true;

兼容写法：

```js
function stopBubble(e){
	//e为事件对象
	return e.stopPropagation() ? e.stopPropagation : e.cancelBubble = true;
}
```

### 3. 阻止默认行为

###### 1. 阻止官方右键菜单弹出（可用于自定义右键菜单）

```js
//第一种方法
document.oncontextmenu = function(){
	return false;
}

//第二种方法
document.oncontextmenu = function(e){
    e.preventDefault();
}
```

###### 2. 阻止超链接默认行为（可用于跳转前询问）

1. 简陋地阻止a链接地默认行为：

   ```js
   a1.onclick = function(){
   	return false;	//直接阻止
   }
   
   a2.onclick = function(){
   	return confirm("确认离开此页面吗？");
   	//根据按确认或取消返回true或false来进行判断是否阻止
   }
   ```

   缺点：运用了return，判断后直接结束函数，若判断后还有代码要执行，则执行不了。

2. 规范方法：

   W3C：e.preventDefault();

   非标准IE：window.event.returnValue = false;

### 4. 正则表达式：是一个描述字符模型的对象（RegExp）

用户在HTML表单中填写信息时，在提交到服务器前，js会检查表单，确认用户确实输入了符合要求的信息。

1. 声明正则表达式：

   1. 通过new声明正则表达式：var box = new RegExp("hello", "ig");
      1. 第一个参数：正则表达式的主体
      2. 第二个参数：修饰符
   2. 省略new声明：var box = RegExp("hello", "ig");
   3. 通过常量赋值：var box = /hello/gi ;

2. 正则表达式方法：

   1. test
      1. 格式：正则.text(str);
      2. 功能：在字符串中匹配这个正则是否存在
      3. 返回值：如果匹配成功，则返回true，匹配失败则返回false
   2. exec：
      1. 格式：正则.exec(str);
      2. 功能：与test相同
      3. 返回所匹配到的字符串，匹配成功则返回一个装着字符串的数组，每个元素是匹配到的一个字符串，匹配失败则返回null。

3. 字符串中使用正则表达式的方法：

   1. match():
      1. 格式：str.match(正则)；
      2. 功能：在字符串中匹配是否有符合正则表达式的子串
      3. 返回值：匹配成功则返回装有匹配到字符串的数组，匹配失败则返回null
   2. replace()
      1. 格式：str.replace(oldstr/正则, newstr);
      2. 用newstr 替换 oldstr
      3. 返回值：替换成功的字符串
   3. split()
      1. 格式：str.split(str1, 正则)
      2. 功能：用分割符将原来的字符串进行分割（匹配所有的str1）
      3. 返回值：分割剩下的子串组成的数组
   4. search()
      1. 格式：str.search(子串/正则)
      2. 功能：找到符合内容的子串第一次（正则使用g没用）出现的位置
      3. 返回值：若找到，返回大于等于0的下标（字符下标），若找不到，则返回-1

4. 正则元字符：在正则表达式中有特殊含义的字符

   1. 单个数字或字符的元字符：

      1.  ' . '：匹配指定位置的单个任意字符（若要匹配 ' . '，则用转义字符 ）"\\."
      2. [范围]：匹配范围**内**的单个字符
         1. 如[0-9]：匹配数字
         2. [a-zA-Z0-9_]：数字字母下划线
      3. [^范围]：匹配范围**外**的单个字符
      4. \w：匹配数字字母下划线，相当于[a-zA-Z0-9_]
      5. \W：匹配非数字字母下划线
      6. \d：匹配单个数字
      7. \D：匹配单个非数字

   2. 重复字符（此处x代表任意字符）

      1. x? ：匹配0或1个字符x（x可不存在）
      2. x+：匹配至少一个字符x
      3. x*：匹配任意个字符x
      4. x{n}：必须匹配n个字符x
      5. x{m, n}：匹配至少m个，最多n个字符x
      6. (abc)：()里面当作一个整体匹配

   3. 空白字符：

      1. \s：匹配单个任意空白字符（如\n, \t, \b(空格)等）
      2. \S：匹配单个非空白字符

   4. 锚字符

      1. ^：行首匹配
      2. $：行尾匹配 【注】$必须写在正则表达式末尾

      【注】 /^str$/  表示的并不是行首一个str，行尾也有一个str，而是只有一个str，既在行首，又在行尾，即只匹配了一个srt字符串

   5. 替代字符：" | "，匹配指定字符中的任意一个均可，如：

      ​	baidu|google|sougou，三者匹配其一均可

   6. 修饰符：

      1. i：忽略大小写
      2. g：全局匹配（把字符串所有字符都匹配一次）
      3. m：换行匹配（若遇到换行，则重新计算行首）

   7. 中文范围：[\u4e00-\u9fa5]

### 5. 获取一些高/宽度：（可适应不同尺寸的窗口）

```js
//获取页面文档显示区高度（不包括滚动条）
var height1 = document.documentElement.clientHeight||document.body.clientHeight;
//获取页面文档显示区宽度（不包括滚动条）
var width1 = document.documentElement.clientWidth || document.body.clientWidth;

//获取窗口文档显示区的高度(不包含工具条与滚动条):
var width2 = window.innerWidth;
//获取窗口文档显示区的宽度(不包含工具条与滚动条):
var height2 = window.innerHeight;
```

### 6. 事件委托

实现步骤：

1. 找到当前节点的父节点或祖先节点
2. 将事件添加到找到的这个父节点或祖先节点
3. 找到触发对象（target），判断触发对象是不是想要的触发对象，再执行后续操作

```html
<ul id="ul">
    <li>11111</li>
    <li>22222</li>
    <li>33333</li>
    <li>44444</li>
    <li>55555</li>
</ul>

<script>
    /* li委托ul将li变成红色 */
    var ul = document.getElementById("ul");
    var btn = document.getElementById("btn");
    ul.onclick = function(ev){
        var e = ev || window.event;
        var target = e.target || window.event.srcElement;
        if(target.nodeName.toLowerCase() == "li"){
            target.style.backgroundColor = "red";
        }
    }
</script>
```

### 7. localStorage：本地存储技术

1. **localStorage***：IE8以下不兼容

   1.  localStorage 本地存储对象

      ​        设置数据：setItem("name", "value");  

      ​        通过name获取value：getItem("name"); 

      ​        手动删除数据：removeItem("name");  

   2. 特点：

      1. 永久储存（只能手动删除）
      2. 最大可存储5MB
      3. 只能存储字符串

2. **cookie**

   1. 格式：name=value;[expires=date];[path=path];[domain=somewhere.com];[secure],

      ​     	name：键，一个键只能存储一个数据

      ​      	value：值，都是自定义的

      【注】后续的中括号的值都是可选项，写的时候不用加中括号

   2. expires：过期时间

      ​        后面必须填写日期对象

      ​      【注】系统会自动清除过期的cookie，可以设置过期时间进行手动删除

   3. cookie存储中文可能会乱码，因此一般转化为字符存储

      ​      encodeURIComponent 将中文编码为字符

      ​      decodeURIComponent 将对应的字符编译成中文

   4. path：限制访问路径

      ​        若不去设置，则默认是加载当前的html的路径

      ​        【注】我们设置的cookie路径，和当前加载的文件路径必须一致，如果不一致，cookie访问失败

   5. domain：限制访问域名

      ​        若不去设置，则默认是加载当前的html的服务器域名/ip

      ​        【注】如果加载当前文件域名和设置的域名不一致，设置cookie失败

   6. secure：

      ​        如果不设置，设置cookie，可以通过http协议加载文件设置，也可以通过https协议来加载文件设置

      ​        设置这个字段以后，只能通过https协议加载cookie

   7. 特点：

      1. 可以设置过期时间
      2. 最大可以存储4KB
      3. 每个域名下最多可以储存50条

3. **messionStorage**（结合后台使用）

### 8. 强制类型转换

1. call()

   1. 格式：函数名.call()
   2. 参数1：传入该函数this指向的对象
   3. 将原函数的参数往后移一位

2. apply()

   1. 格式：函数名.apply()
   2. 参数1：传入该函数this指向的对象，可以为null
   3. 参数2：数组，数组内装原有的参数

3. bind()：预设this指向的对象

   1. 格式：函数名.bind()
   2. 参数：传入该函数this指向的对象
   3. 返回值：预设完成的函数

   **可以直接加参数调用：函数名.bind("this要指向的对象")(参数)**

   【注】当我们给事件赋值一个函数调用，我们只是把函数返回值赋值给它，若要给事件添加函数，可以赋值函数名。

4. apply()应用

   ```js
   var arr = [10, 20, 30, 40, 50]
   //可以传入数组，不用多次传入这么多参数
   Math.max.apply(null, arr);
   Math.min.apply(null, arr);
   ```

### 9. let, var与const关键字

1. var：声明变量，将变量或形参所在函数的大括号作为作用域处理

2. let：声明变量，作用域更小，只要遇到一个大括号，就形成一个作用域

   ​	【注】let声明的变量所在作用域叫做块级作用域

3. const：声明变量，变量值只能在声明的时候确定，后续无法被修改

### 10. Ajax

1. 同步与异步

   ​	同步： "阻塞"，当前程序运行，必须等前一个程序运行完毕以后才能运行

   ​    异步： "非阻塞" ，当前程序运行，和当前程序的运没有任何关系。

2. 表单的提交：

   1. action 点击submit以后跳转到的url

   2. method 表单的提交数据方式

   3. GET(默认)

      提交方式：直接将数据拼接在url后面进行提交，通过?进行拼接，查询字符串

      1. 好处：简单
      2. 缺点：
         1. 不安全
         2. 最大2kb
         3. 无法实现上传

   4. POST

      注：要在form表单行间加上：enctype="application/x-www-form-urlencoded"

      提交方式：通过浏览器内部进行提交

      1. 好处：
         1. 安全
         2. 理论上没有上限
         3. 可以实现上传
      2.  缺点：比GET复杂

3. ajax的提交

   1. GET

      xhr.open("get","url?xxx=yyy&...",ture)

      xhr.send();

   2. POST：通过send的方式提交

   ​      xhr.open("get","url",true) 

   ​			  第一个参数：请求方式：get post

   ​          	第二个参数：url

   ​             第三个参数：是否异步  

   ​            	true：异步

   ​            	false：同步 

   ​      xhr.send("xxx=yyy...")

   ​      POST注意点：在send()之前，必须设置请求的格式：

   ​      xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")

   

   ?xxx=yyy&...  search（有问号）

   xxx=yyy&...   queryString（没问号）

4. 将对象转成字符串

   ```js
   function queryString(obj){	//传入对象
   	var str = "";	//新建空数组
   	for(var attr in obj){	//遍历对象中有几个属性
   		str += attr + "=" + obj[attr] + "&";	//拼接成queryString
   	}
   	return str.substring(0, str.length-1);	//减去最后一个&，所以返回少一个字符
   }
   
   //调用时
   var str = queryString({
       name1: "value1",
       name2: "value2",
       name3: "value3"
   });
   
   //拼接成：name1=value1&name2=value2&name3=value3
   ```

5. 请求状态监控

   onreadystatechange事件

   readyState属性：请求状态

​                0：(初始化)还没有调用open()方法

​                1：(载入)已经调用send()方法，正在发送请求

​                2：(载入完成)sand方法完成，已经收到全部响应内容

​                3：(解析)正在解析响应内容

​                4：(完成)响应内容解析完成

  	status属性：（状态码），服务器(请求资源)的状态，200为成功

​      返回的内容

​			 responseText：返回以文本形式存放的内容

​			 responseXML：返回XML形式的内容

6. ```js
   try{
       //尝试执行的代码
   }catch(error){
       //error 错误对象，含try括号中代码执行的异常信息
       //补救代码
   }
   ```

   与if...else类似

### 11. Ajax函数的封装

```js
function $ajax({method = "get", url, data}){ //method默认为get
    //新建对象
    var xhr = null;
    //兼容浏览器
    try{
        xhr = new XMLHttpRequest();
    }catch(error){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    /* 判断data数据是否存在，存在则将对象转为字符串 */
    if(data){
        data = queryString(data);
    }

    /* 判断方法是否是GET，且有无数据请求，真的话将url和data拼接起来 */
    if(method == "get" && data){
        url += "?" + data;
    }

    xhr.open(method, url, true);

    //判断提交方法
    if(method == "get"){
        xhr.send();
    }else{
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    /* 等待数据响应 */
    xhr.onreadystatechange = function(){
        /* 判断是否解析完成 */
        if(xhr.readyState == 4){
            /* 判断本次下载的状态码是多少 */
            if(xhr.status == 200){
                console.log(xhr.resposeText);
            }else{
                console.log("ERROR:" + xhr.status);
            }
        }
    }
}

/* 将对象转成字符串 */
function queryString(obj){
    var str = "";
    for(var attr in obj){
        str += attr + "=" + obj[attr] + "&";
    }
    return str.substring(0, str.length-1);
}
```

### 12. 心得

在这一周里，继续学了一些js之后，我打算先把js先放一放，先学习一下AJax和api的调用方法，然后在网上看教程，学到了封装Ajax函数的方法，然后一边学习一边把学到的内容运用在页面当中，虽然运用的还不是很熟练，但是也实现了登录，通过id获取歌曲进行播放等功能，打算在接下来的时间里面，尝试着去实现搜索歌曲和歌词显示等功能。
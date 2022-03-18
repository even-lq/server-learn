# server-learn
Server development learning

## 从输入url到显示页面的过程

1. DNS解析，建立TCP连接，发送HTTP请求
2. server接收到http请求，处理并返回
3. 客户端接收到返回的数据，处理数据（如渲染页面，执行js）

## 搭建环境

```javascript
npm init -y
npm install nodemon cross-env --save-dev

// 启动node服务
npm run dev

// 为前端启动一个服务
http-server -p 8001

// 启动redis
打开一个cmd redis-server.exe
打开另一个cmd redis-cli.exe -h 127.0.0.1 -p 6379

// 启动nginx
start nginx
nginx -s reload（重启nginx）
```

## 开发

### 接口设计

![接口设计](E:\study\StudyProjects\server-learn\learn-pic\接口设计.png)

### 路由处理过程

![访问路由获取信息流程图](E:\study\StudyProjects\server-learn\learn-pic\访问路由获取信息流程图.png)

### cookie

#### 什么是cookie

![什么是cookie](E:\study\StudyProjects\server-learn\learn-pic\什么是cookie.png)

- 含义

  存储在浏览器的一段字符串（最大5kb），格式如k1=v1;k2=v2;k3=v3;因此可以存储结构化数据

- 跨域不共享

  浏览器为每个域名存储一段cookie，每次发送http请求，会将请求域的cookie一起发送给server

- 设置

  - server可以修改cookie并返回给浏览器
  - client（浏览器）可以通过js修改cookie（有限制）

#### server端nodejs操作cookie

![cookie登录验证](E:\study\StudyProjects\server-learn\learn-pic\cookie登录验证.png)

### session

使用cookie会暴露隐私信息，不够安全；cookie的容量是有限的；

#### cookie的问题

使用cookie存储唯一标识，在server端用session解析该唯一标识，取得对应的数据

#### session & cookie 登录验证

![session登录验证](E:\study\StudyProjects\server-learn\learn-pic\session登录验证.png)

#### session的问题

session是js变量放在nodejs进程内存中

- 进程内存有限，当访问量过大时，内存会暴增
- 线上是多进程的，进程之间内存无法共享

### redis

内存数据库，web server常用的缓存数据库，数据存放于内存中，访问速度快，但是成本高、可存储的数据量小

#### session适合redis的原因

1. 性能好

   session访问频繁，对性能要求极高

2. 稳定性

   session可不考虑断电丢失数据的问题（内存的硬伤）

3. 数据量

   session数据量不会太大(相比于mysq|中存储的数据)

### 完整登录流程

![登录流程图](E:\study\StudyProjects\server-learn\learn-pic\登录流程图.png)

### 日志

#### 日志拆分

- 日志内容会慢慢积累，放在一个文件中不好处理
- 按时间划分日志文件，如2019-02-10.access.log
- 实现方式：linux的crontab命令,即定时任务

#### crontab

- 设置定时任务，格式：\*(min)\*(hour)\*(date)\*(month)*(week)command
- 将access.log拷贝并重命名为2019-02-10.access.log
- 空access.log文件，继续积累日志

### 安全

#### sql注入

 

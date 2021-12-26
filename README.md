# server-learn
Server development learning

## 从输入url到显示页面的过程

1. DNS解析，建立TCP连接，发送HTTP请求
2. server接收到http请求，处理并返回
3. 客户端接收到返回的数据，处理数据（如渲染页面，执行js）

## 搭建环境

```shell
npm init -y
npm install nodemon cross-env --save-dev

```

## 开发

### 接口设计

![接口设计](E:\study\StudyProjects\server-learn\learn-pic\接口设计.png)

### 路由处理过程

![访问路由获取信息流程图](E:\study\StudyProjects\server-learn\learn-pic\访问路由获取信息流程图.png)


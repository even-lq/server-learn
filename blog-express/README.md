# express开发博客
## 搭建环境

```javascript
// 脚手架搭建
npm i express-generator -g
express blog-express

// 辅助工具
npm i nodemon cross-env --save-dev 
```

## express中间件原理

中间件介绍：express提供ues、get和post等方法，访问路由时，express实例会在`next()`后按照优先级（ues > get/post...）和请求先后顺序（规则）执行中间件回调函数

原理：每次请求时，收集所有中间件回调函数，根据规则形成一个中间件回调函数队列，当执行`next()`时，依次出队执行每个中间件回调函数。

注意：this.callback必须要闭包返回，否则在处理路由时无法在当前执行上下文找到this，用this获取函数、方法等会报错。

![express中间件原理](E:\study\StudyProjects\server-learn\learn-pic\express中间件原理.png)

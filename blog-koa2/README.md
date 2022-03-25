# express开发博客
## koa2中间件原理

中间件介绍：koa提供ues、get和post等方法，访问路由时，express实例会在`next()`后按照优先级（ues > get/post...）和请求先后顺序（规则）执行中间件回调函数

原理：每次请求时，收集所有中间件回调函数，根据规则形成一个中间件回调函数数组，根据`next()`的执行情况，依次从0到末尾（i）执行中间件回调函数。

注意：不同于express把next函数当作参数传给中间件回调函数去执行，koa2用函数柯里化的方式bind生成下一个next函数，执行改next函数则会执行下一个中间件回调函数。![express中间件原理](E:\study\StudyProjects\server-learn\learn-pic\koa2中间件原理.png)


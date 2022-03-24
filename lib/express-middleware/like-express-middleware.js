const http = require('http');
const slice = Array.prototype.slice;

class Middleware {
  constructor() {

    // 分别对应存放的中间件列表use，get，post
    this.routes = {
      all: [], // app.use(...)
      get: [], // app.get(...)
      post: [] // app.post(...) 
    }
  }
  register(path) {
    const info = {};
    if (typeof path === 'string') {
      info.path = path;

      // 从第二个参数开始存入执行路由的所有回调
      info.stack = slice.call(arguments, 1);
    }

    // 第一个参数不传默认根路由
    else {
      info.path = '/';
  
      // 从第二个参数开始存入执行路由的所有回调
      info.stack = slice.call(arguments, 0);
    }
    return info;
  }
  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info);
  }
  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info);
  }
  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info);
  }
  match(method, url) {
    let stack = [];
    if (url === '/favicon.ico') {
      return stack;
    }

    // 获取 routes
    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all);
    curRoutes = curRoutes.concat(this.routes[method]);
    curRoutes.forEach(routeInfo => {

      // 前面收集了use和当前方法的中间件函数，但是还是要对path进行过滤
      // 过滤规则：本次请求的path（本路由），根path（根路由），父path（父路由）
      if (url.indexOf(routeInfo.path) === 0) {
        // url === '/api/get-cookie 且 routeInfo.path === '/'
        // url === '/api/get-cookie 且 routeInfo.path === '/api'
        // url === '/api/get-cookie 且 routeInfo.path === '/api/get-cookie'
        stack = stack.concat(routeInfo.stack);
      }
    })
    return stack;
  }

  // 核心next机制
  handle(req, res, stack) {
    const next = () => {

      // 拿到第一个匹配的中间件
      const middleware = stack.shift();
      if (middleware) {
        
        // 执行中间件函数
        middleware(req, res, next);
      }
    }
    next()
  }
  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Conent-type', 'application/json');
        res.end(JSON.stringify(data));
      }

      // 过滤非本次请求方法的路由，比如get请求过滤post
      const url = req.url;
      const method = req.method.toLowerCase();
      const resList = this.match(method, url);
      this.handle(req, res, resList);
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

// 工厂模式
module.exports = () => {
  return new Middleware()
}
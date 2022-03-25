const http = require('http');

// 组合中间件
function compose(middlewareList) {
    return function (ctx) {
      
      // 中间件调用逻辑
      function dispatch(i) {
        const fn = middlewareList[i];
        try {

          // 无论use的回调是否是async，都返回promise做一下兼容
          return Promise.resolve(
            fn(ctx, dispatch.bind(null, i + 1))
          )
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return dispatch(0)
    }
}

class Middleware {
  constructor() {
    this.middlewareList = [];
  }

  // 注册中间件
  // return this是为了可以链式调用
  // app.use(...).use(...)...
  use(fn) {
    this.middlewareList.push(fn);
    return this;
  }
  createContext(req, res) {
    const ctx = {
      req,
      res
    }
    ctx.query = req.query;
    return ctx;
  }
  handleRequest(ctx, fn) {
    return fn(ctx);
  }
  callback() {
    const fn = compose(this.middlewareList);
    return (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = Middleware
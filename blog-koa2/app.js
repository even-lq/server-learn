const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const path = require('path');
const fs = require('fs');
const morgan = require('koa-morgan');

const user = require('./routes/user')
const blog = require('./routes/blog')
const { REDIS_CONF } = require('./conf/index')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session 配置
app.keys = ['f2.3r_(Fv,gf'];
app.use(session({

  // 配置cookie
  cookie: {
    maxAge: 24 *60 * 60 * 1000
  },

  // 配置redis
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

const ENV = process.env.NODE_ENV;
// 记录日志的工具
if (ENV === 'dev') {
  app.use(morgan('dev', {
    stream: process.stdout
  }))
}
else {
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }))
}

// routes
// allowedMethods处理的业务是当所有路由中间件执行完成之后, 若ctx.status为空或者404的时候, 丰富response对象的header头
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

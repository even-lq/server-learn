var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

// 本次http请求的实例
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV;
// 记录日志的工具
if (ENV === 'dev') {
  app.use(logger('dev', {
    stream: process.stdout
  })) 
}
else {
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
}
// 将post请求的数据以json格式挂到req.body里面
app.use(express.json());

// 兼容x-www-form-urlencoded的content-type
app.use(express.urlencoded({ extended: false }));

// 注册cookieParser，可以在路由里面通过req.cookies访问处理好的cookie
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// 解析session
const redisClient = require('./db/redis');
const SessionStore = new RedisStore({
  client: redisClient
});
app.use(session({
  secret: 'f2.3r_(Fv,gf',
  cookie: {
    path: '/', // 默认
    httpOnly: true, // 默认
    maxAge: 24 * 60 * 60 * 1000
  },
  store: SessionStore
}));

// 注册路由
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

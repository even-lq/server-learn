var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

// 本次http请求的实例
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 记录日志的工具
app.use(logger('dev'));

// 将post请求的数据以json格式挂到req.body里面
app.use(express.json());

// 兼容x-www-form-urlencoded的content-type
app.use(express.urlencoded({ extended: false }));

// 注册cookieParser，可以在路由里面通过req.cookies访问处理好的cookie
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
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

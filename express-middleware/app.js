const express = require('express');

// 本次http请求的实例
const app = express();

// 访问路由时首先执行下面
app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url);

  // 执行对应请求方法的下一个注册函数，没有就执行app.use
  next();
})

app.use((req, res, next) => {

  // 假设在处理cookie
  req.cookie = {
    userId: 'abc123'
  }
  next();
})

app.use((req, res, next) => {

  // 假设处理post dataa（异步）
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200,
    }
    next();
  }, 0);
})

// 不论什么请求的方法都会在这里处理路由
app.use('/api', (req, res, next) => {
  console.log('处理/api路由');
  next();
})

// 处理get路由
app.get('/api', (req, res, next) => {
  console.log('get /api路由');
  next();
})

// 处理post路由
app.post('/api', (req, res, next) => {
  console.log('post /api路由');
  next();
})

// 模拟登录验证
function loginCheck(req, res, next) {
  setTimeout(() => {
    console.log('模拟登陆失败')
    res.json({
      errno: -1,
      msg: ' 登录失败'
    })
    // console.log('模拟登陆成功')
    //next()
  })
}

// 如果访问/api/get-cookie会先访问loginCheck，如果loginCheck有next，则再执行第三个参数的回调
app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /api/get-cookie');
  res.json({
    errno: 0,
    data: req.cookie
  });
});

app.post('/api/get-post-data', (req, res, next) => {
  console.log('post /api/get-post-data');
  res.json({
    errno: 0,
    data: req.body
  });
});

app.use((req, res, next) => {
  console.log('处理404');
  res.json({
    errno: -1,
    data: '404 not found'
  });
});

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
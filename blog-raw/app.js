const qs = require('qs');
const {
  handleBlogRouter,
  handleUserRouter
} = require('./src/router');

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}

// session 数据
const SESSION_DATA = {};

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(
        JSON.parse(postData)
      );
    })
  })
  return promise;
}

const serverHandle = (req, res) => {

  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json');

  // 获取path
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析query
  req.query = qs.parse(url.split('?')[1]);

  // 解析 cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.trim().split('=');
    const key = arr[0];
    const val = arr[1];
    req.cookie[key] = val;
    console.log('req.cookie', req.cookie)
  });

  // 解析 session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  console.log('userid', req.cookie.userid)
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  }
  else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];


  // 处理post data
  getPostData(req).then(postData => {
    req.body = postData;

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie && blogData.errno !== -1) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }
        res.end(JSON.stringify(blogData));
      }).catch(err => console.log(err));
      return;
    }
    
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }

    // 处理user路由
    const userRes = handleUserRouter(req, res);
    if (userRes) {
      userRes.then(userData => {
        console.log('userData', userData)
        if (needSetCookie && userData.errno !== -1) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }
        res.end(JSON.stringify(userData));
      }).catch(err => console.log(err));
      return;
    }

    // 未命中路由，返回404
    res.writeHead(404, {
      "Content-type": "text/plain"
    });
    res.write("404 Not Found\n");
    res.end();
  })
}

module.exports = serverHandle;

// process.env.NODE_ENV
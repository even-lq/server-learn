const qs = require('qs');
const {
  handleBlogRouter,
  handleUserRouter
} = require('./src/router');
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

  // 处理post data
  getPostData(req).then(postData => {
    req.body = postData;

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
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
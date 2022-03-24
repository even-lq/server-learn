const { Router } = require('express');
const router = Router();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {

  // 自带的，不用自己从url的query上取，express已封装好
  const { keyword = '', isadmin = '' } = req.query;
  let { author = '' } = req.query;
  if (isadmin) {
    if (!req.session.username) {

      // 未登录
      res.json(new ErrorModel('未登录'));
      return;
    }
    author = req.session.username
  }
  const result = getList(author, keyword);
  return result.then(listData => {

    // 相当于
    // 设置返回格式 JSON
    // res.setHeader('Content-type', 'application/json');
    // res.end(JSON.stringify(xxx));
    res.json(new SuccessModel(listData));
  })
});

router.get('/detail', (req, res, next) => {
  const { id } = req.query;
  const result = getDetail(id);
  return result.then(data => {
    res.json(new SuccessModel(data));
    return;
  });
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  const result = newBlog(req.body);
  result.then(data => {
    res.json(new SuccessModel(data));
    return;
  });
})

router.post('/update', loginCheck, (req, res, next) => {
  const { id } = req.query;
  const result = updateBlog(id, req.body);
  result.then(val => val ? res.json(new SuccessModel('success update')) : res.json(new ErrorModel('error update')));
})

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username;
  const { id } = req.query;
  const result = deleteBlog(id, author);
  result.then(val => val ? res.json(new SuccessModel('success delete')) : res.json(new ErrorModel('error delete')));
})
module.exports = router;
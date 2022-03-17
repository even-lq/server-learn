const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog');

const { SuccessModel, ErrorModel } = require('../model/resModel');

// 统一登录验证函数
const loginCheck = (req) => {
  return !req.session.username ? Promise.resolve(
    new ErrorModel('尚未登录')
  ) : null;
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const { path } = req;
  const { id = '' } = req.query;

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const {  keyword = '', isadmin = '' } = req.query;
    let { author = '' } = req.query;
    if (isadmin) {
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {

        // 未登录
        return loginCheckResult;
      }
      author = req.session.username
    }
    const result = getList(author, keyword);
    return result.then(listData => {
      return new SuccessModel(listData);
    })
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      
      // 未登录
      return loginCheckResult;
    }

    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {

      // 未登录
      return loginCheckResult;
    }

    const result = updateBlog(id, req.body);
    return result.then(val => val ? new SuccessModel('success update') : new ErrorModel('error update'));
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {

      // 未登录
      return loginCheckResult;
    }

    const author = req.session.username;
    const result = deleteBlog(id, author);
    return result.then(val => val ? new SuccessModel('success delete') : new ErrorModel('error delete'));
  }
}

module.exports = handleBlogRouter;
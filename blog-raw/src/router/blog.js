const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog');

const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = (req, res) => {
  const method = req.method;
  const { path } = req;
  const { id = '' } = req.query;

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    const listData = getList(author, keyword);

    return new SuccessModel(listData);
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const data = getDetail(id);
    return new SuccessModel(data);
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const data = newBlog(req.body);
    return new SuccessModel(data);
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const result = updateBlog(id, req.body);
    return result ? new SuccessModel('success') : new ErrorModel('error')
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/delete') {
    const result = deleteBlog(id);
    return result ? new SuccessModel('success delete') : new ErrorModel('error delete')
  }
}

module.exports = handleBlogRouter;
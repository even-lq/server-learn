const handleBlogRouter = (req, res) => {
  const method = req.method;
  const { path } = req;

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    return {
      msg: '获取博客列表的接口'
    }
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: '获取博客详情的接口'
    }
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: '新建一篇博客'
    }
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: '更新一篇博客'
    }
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    return {
      msg: '删除一篇博客'
    }
  }
}

module.exports = handleBlogRouter;
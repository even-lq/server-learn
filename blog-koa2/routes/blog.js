const router = require('koa-router')();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog');
router.get('/list', async (ctx, next) => {

  // 自带的，不用自己从url的query上取，express已封装好
  const { keyword = '', isadmin = '' } = ctx.query;
  let { author = '' } = ctx.query;
  if (isadmin) {
    if (!ctx.session.username) {

      // 未登录
      ctx.body = new ErrorModel('未登录');
      return;
    }
    author = ctx.session.username
  }
  const listData = await getList(author, keyword);
  ctx.body = new SuccessModel(listData);
});

router.get('/detail', async (ctx, next) => {
  const { id } = ctx.query;
  const data = await getDetail(id);
  ctx.body = new SuccessModel(data);
})

router.post('/new', loginCheck, async (ctx, next) => {

  // 这里用ctx.request是因为登录/login路由是用ctx.request 请求参数获取用户传过来的用户名密码
  const body = ctx.request.body;
  body.author = ctx.session.username;
  const data = await newBlog(body);
  ctx.body = new SuccessModel(data);
})

router.post('/update', loginCheck, async (ctx, next) => {
  const { id } = ctx.query;
  const val = updateBlog(id, ctx.request.body);
  ctx.body = val ? new SuccessModel('success update') : new ErrorModel('error update')
})

router.post('/del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username;
  const { id } = ctx.query;
  const val = await deleteBlog(id, author);
  ctx.body = val ? new SuccessModel('delete update') : new ErrorModel('delete update')
})

module.exports = router;
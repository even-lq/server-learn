const router = require('koa-router')();
const {
  login
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.prefix('/api/user')
router.post('/login', async function (ctx, next) {
  console.log(ctx.request.body);
  const { username, password } = ctx.request.body;
  const data = await login(username, password)
  if (data.username) {

    // 设置session，设置的时候会同步到redis中
    ctx.session.username = data.username;
    ctx.session.realname = data.realname;
    ctx.body = new SuccessModel('success login');
    return;
  }
  ctx.body = new ErrorModel('error login');
})

router.get('/session-test', async function (ctx, next) {
  if (!ctx.session.viewCount) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;

  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount
  }
})

module.exports = router

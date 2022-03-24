const { ErrorModel } = require('../model/resModel');

// 统一登录验证函数
module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next();
    return;
  }
  ctx.body = new ErrorModel('未登录');
}
const { ErrorModel } = require('../model/resModel');

// 统一登录验证函数
module.exports = (req, res, next) => {
  if (req.session.username) {
    next();
    return;
  }
  res.json(new ErrorModel('未登录'))
}
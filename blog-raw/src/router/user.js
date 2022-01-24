const {
  loginCheck
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const method = req.method;
  const { path } = req;

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body;
    const result = loginCheck(username, password)
    return result.then(data => data.username ? new SuccessModel('success login') : new ErrorModel('error login'));
  }
}

module.exports = handleUserRouter;
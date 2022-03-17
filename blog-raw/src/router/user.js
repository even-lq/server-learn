const {
  login
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method;
  const { path } = req;

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    // debugger
    const { username, password } = req.body;
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        req.session.username = data.username;
        req.session.realname = data.realname;

        // 同步到redis中
        set(req.sessionId, req.session);
        return new SuccessModel('success login')
      }
      return new ErrorModel('error login');
    });
  }
}

module.exports = handleUserRouter;
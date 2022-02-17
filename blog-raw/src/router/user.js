const {
  login
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const method = req.method;
  const { path } = req;

  // 登录
  if (method === 'GET' && path === '/api/user/login') {
    // debugger
    // const { username, password } = req.body;
    const { username, password } = req.query;
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        req.session.username = data.username;
        req.session.realname = data.realname;
        console.log('session', req.session)
        return new SuccessModel('success login')
      }
      return new ErrorModel('error login');
    });
  }

  // 登录验证
  if (method === 'GET' && path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session
        })
      )
    }
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

module.exports = handleUserRouter;
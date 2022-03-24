const { Router } = require('express');
const router = Router();
const {
  login
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  console.log('req.body', req.body);
  const result = login(username, password)
  return result.then(data => {
    console.log('result data', data);
    if (data.username) {

      // 设置session，设置的时候会同步到redis中
      req.session.username = data.username;
      req.session.realname = data.realname;

      // 同步到redis中
      // set(req.sessionId, req.session);
      res.json(new SuccessModel('success login'));
      return;
    }
    res.json(new ErrorModel('error login'));
  });
});

router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: req.session.username
    });
    return;
  }
  res.json({
    errno: -1,
    msg: 'error'
  });
})

router.get('/session-test', (req, res, next) => {
  const session = req.session;
  if (session.viewNum === null) {
    session.viewNum = 0;
  }
  session.viewNum++;
  res.json({
    viewNum: session.viewNum
  })
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
// 判断method是get，处理get请求
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

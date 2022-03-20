const { Router } = require('express');
const router = Router();

router.get('/list', (req, res, next) => {

  // 相当于
  // 设置返回格式 JSON
  // res.setHeader('Content-type', 'application/json');
  // res.end(JSON.stringify(xxx));
  res.json({
    errno: 0,
    data: [1, 2, 3]
  });
});

module.exports = router;
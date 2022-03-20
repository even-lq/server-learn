const { Router } = require('express');
const router = Router();

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  res.json({
    errno: 0,
    data: {
      username,
      password
    }
  });
});

module.exports = router;
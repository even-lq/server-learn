const cypto = require('crypto');

// 密钥
const SECRET_KEY = 'vd9J3@ds_3d#';

// md5 加密
function md5(content) {
  let md5 = cypto.createHash('md5');

  // 将content永md5加密，以16进制的方式输出
  return md5.update(content).digest('hex');
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}
console.log(genPassword('123'))
module.exports = {
  genPassword
}
const env = process.env.NODE_ENV; // 环境参数

// 配置
let MYSQL_CONF;

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'liqing',
    port: '3306',
    database: 'rawblog'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'liqing',
    port: '3306',
    database: 'rawblog'
  }
}

module.exports = {
  MYSQL_CONF
}
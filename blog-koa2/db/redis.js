const redis = require('redis');
const { REDIS_CONF } = require('../conf')
const { port, host } = REDIS_CONF

// 创建客户端
const redisClient = redis.createClient(port, host);

redisClient.on('error', err => console.error(err));
module.exports = redisClient
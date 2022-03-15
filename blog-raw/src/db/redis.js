const redis = require('redis');
const { REDIS_CONF } = require('../conf')
const { port, host } = REDIS_CONF
const redisClient = redis.createClient(port, host);

redisClient.on('error', err => console.error(err));

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
    
  }
  redisClient.set(key, val, redis.print);
}

// 异步的
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === null) {
        resolve(null);
        return;
      }

      // 有可能parse不成功
      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
    })
  })
  return promise;
}

module.exports = {
  set,
  get
}
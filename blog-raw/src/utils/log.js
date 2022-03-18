const fs = require('fs');
const path = require('path');

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n');
}

// 生成 write Stream
function createWriteStream(fileName) {
  
  // join是把各个path片段连接在一起，仅用于路径的拼接
  // resolve把‘／’当成根目录，可以将多个路径解析为一个规范化的绝对路径。其处理方式类似于对这些路径逐一进行cd操作，与cd操作不同的是，这引起路径可以是文件，并且可不必实际存在（resolve()方法不会利用底层的文件系统判断路径是否存在，而只是进行路径字符串操作）
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream;
}

function access(log) {

  // 写访问日志
  const accessWriteStream = createWriteStream('access.log');
  writeLog(accessWriteStream, log);
}

module.exports = {
  access
}
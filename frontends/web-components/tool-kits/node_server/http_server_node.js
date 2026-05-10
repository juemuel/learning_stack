const http = require('http');

const port = 3000;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // 设置server的响应头：即客户端和服务器之间的字符编码需要一致
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end('你好世界\n');
})

server.listen(port, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});
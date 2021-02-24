// 引入依赖
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { verifyToken,errorToken } = require("./utils/JwtToken")
const usersRouter = require('./routes/users');
const wsRouter = require('./routes/ws');

// 创建实例
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(8765);
io.on('connection', function (socket) {
  socket.emit('receiveMsg', { hello: 'world' });
  socket.on('sendMsg', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
// 日志打印
app.use(logger('dev'));
// post请求解析
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie解析
app.use(cookieParser());
// 公共资源路径
app.use(express.static(path.join(__dirname, 'public')));
//  开启 CORS 跨域 
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); //让options请求快速返回
  }
  else {
    next();
  }
});
// 接收所有请求验证
app.use(verifyToken()); 
// token失败处理
app.use(errorToken);
app.use('/sys', usersRouter);
process.env.PORT = '8060'
module.exports = app;

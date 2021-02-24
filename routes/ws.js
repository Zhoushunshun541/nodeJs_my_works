const express = require('express')
const router = express.Router();
const {query} = require("../db/mysql")
const {ResultCode,CODE} = require('../utils/ResultCode')


// router.ws('/test', function (ws, req){
//   console.log(req);
//   ws.on('message', function (msg) {
//       // 业务代码
//       ws.send('你连接成功了')
//       console.log(msg);
//   })
// })

module.exports = router
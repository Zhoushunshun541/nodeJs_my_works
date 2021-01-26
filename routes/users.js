const express = require('express');
const router = express.Router();
const {query} = require("../db/mysql")
const {createToken} = require('../utils/JwtToken')
const {ResultCode,CODE} = require('../utils/ResultCode')

// 登录接口
router.post('/login', function(req, res) {
  let p = req.body
  query(`select id as user_id,username,pic,name,mobile,email,job,company_name,company_id from user where username=? and password=?`,[p.username,p.password],function(result) {
    console.log(result);
    let r = JSON.parse(JSON.stringify(result))
    res.send(ResultCode({token:createToken(r),...r[0]}));
  })
})

router.post('/registry',function (req, res) {
  let p = req.body
  let sql = 'insert into user (name,mobile,sex,email,age,password,username,job) values (?,?,?,?,?,?,?,?)'
  let sqlParams = [p.name,p.mobile,p.sex,p.email,p.age,p.password,p.username,p.job]
  query(sql,sqlParams,function (data) {
    console.log(data)
    res.send(CODE.SUCCESS)
  })
  
})

module.exports = router;

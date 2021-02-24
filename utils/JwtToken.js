const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const { secret,tokenType } = require("./GlobalConfig")

// 生成方法---data是自定义信息，exp是传的过期时间
const createToken = function (data, exp) {
  let obj = {};
  obj.data = data ? data : null; 
  obj.type = tokenType; // 加个类型
  obj.ctime = new Date().getTime(); //token的创建时间
  // 如果直接放在data这里，要这样设置过期时间，并且这样设置过期时间要加上当前时间从1970开始算，所以要用当前时间 + 过期时间，单位毫秒，除1000换成s
  // obj.exp = Math.floor(Date.now() / 1000) + 60 * 60 *24 * 3; 
  
  // 用expiresIn就不用，直接设置过期时间
  exp = exp ? exp : 60 * 60 * 24 * 3; //设定的过期时间,不设置就默认1天 

  let token = jwt.sign(obj, secret, { expiresIn: exp }); // 调用方法生成
  return token;
};

// 验证，传入token
const verifyToken = () => {
  return expressJWT({
    secret: secret,
    algorithms: ['HS256'], // 要加才能对
    // requestProperty:'auth',//自定义获取的信息位置，默认验证通过req.user获取token信息
    // credentialsRequired: true //是否允许无token请求
  }).unless({
    path: ['/sys/login','/sys/registry','/socket'] //除了这个地址，其他的URL都需要验证
  });
};

// 失败处理--放到最后一个app.use()
const errorToken = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') { 
    //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    let obj = {
      msg: 'token验证失败',
      code : 403,
      data : {}
    };
    if (req.originalUrl.indexOf('/socket.io/') !== -1) {
      res.send({
        msg: 'success',
        code : 200,
        data : {}
      }); //返回失败信息
    }else{
      res.send(obj); //返回失败信息
    }
  }else next()
};

// jwt-token解析
const decode = (req) => {
  const token = req.get('token')
  return jwt.verify(token, secret);
}
module.exports = { createToken, verifyToken,errorToken,decode };
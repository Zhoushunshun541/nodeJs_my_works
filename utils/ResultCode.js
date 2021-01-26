const CODE =  Object.freeze({
  SUCCESS:{code:200,msg:'success',data:{}},
  ERROR:{code:404,msg:'error',data:{}},
  EMPTY:{code:220,msg:'data empty',data:{}},
  NO_LOGIN:{code:403,msg:'user ',data:{}},
})
const ResultCode = (data,code,msg) => {
  return {
    code:code || 200,
    msg:msg || 'success',
    data:data || {}
  }
}

module.exports = {ResultCode,CODE}
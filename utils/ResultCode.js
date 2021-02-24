const CODE =  Object.freeze({
  SUCCESS:{status:200,msg:'success',data:{}},
  ERROR:{status:404,msg:'error',data:{}},
  EMPTY:{status:220,msg:'data empty',data:{}},
  NO_LOGIN:{status:403,msg:'user ',data:{}},
})
const ResultCode = (data,status,msg) => {
  return {
    status:status || 200,
    msg:msg || 'success',
    data:data || {}
  }
}

module.exports = {ResultCode,CODE}
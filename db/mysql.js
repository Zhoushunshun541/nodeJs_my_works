const mysql = require("mysql")
const config = {
    host:"localhost",
    user:'root',
    password:'idiotic521541',
    database:'my_works',
    multipleStatements:true,
    supportBigNumbers:true,
    connectionLimit:10
}
/**
 * 高度封装执行sql语句的方法  实时的释放资源
 */
const pool = mysql.createPool(config)
const query = (sql,sqlParams,callback) => {
  pool.getConnection((err,db) => {
    if (err) throw err
    db.query(sql,sqlParams,(error,result) => {
      if (error) throw error
      callback(JSON.parse(JSON.stringify(result)))
      db.release()
    })
  })
}
module.exports = {query}
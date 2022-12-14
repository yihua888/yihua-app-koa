const connection = require('../app/database')

class utilService {
  async create (utilName, utilCode, id) {
    const statement = `insert into tb_util (util_name,util_code,id) values(?,?,?);`
    const [result] = await connection.execute(statement, [utilName, utilCode, id])
    return result
  }

  async addCodes (codes, id) {
    const sqlArr = []
    const arr = []
    codes.forEach(item => {
      arr.push('(?,?,?)')
      sqlArr.push(...[item.filename, item.url, id])
    })
    const statement = `insert into tb_util_codes (filename,url,util_id) values${arr.join(',')};`
    const [result] = await connection.execute(statement, [...sqlArr])
    return result
  }

  async getUtils (utilName, limit, offset) {
    const argumentsList = []
    let condition = ''
    utilName && (condition += ` and util_name like concat('%', ?, '%')`) && argumentsList.push(utilName);
    // 获取总数
    let statement = `select  u.id id, util_name utilName,util_code utilCode  from tb_util u where 1=1` + condition + ` LIMIT ? , ?;`;
    const statement1 = `select count(*) total from tb_util where 1=1` + condition
    const [rst] = await connection.execute(statement1, [...argumentsList])
    const [data] = await connection.execute(statement, [...argumentsList, offset, limit]);
    return {
      data,
      total: rst[0]?.total ?? 0
    }
  }

  async getUtilById (id) {
    const statement = `
    SELECT 
    u.id id, util_name utilName,util_code utilCode ,
    (SELECT IF(COUNT(uc.id),JSON_ARRAYAGG(
      JSON_OBJECT('filename',uc.filename , 'url' , uc.url )
    ), NULL) FROM tb_util_codes uc WHERE uc.util_id = u.id) codes
    FROM tb_util u
    WHERE u.id = ?;
    `
    const [rst] = await connection.execute(statement, [id])
    return rst[0]
  }

}

module.exports = new utilService()
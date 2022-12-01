const connection = require('../app/database')

class caseService {
  async create (caseType, caseName, caseCode, id) {
    const statement = `insert into tb_case (case_name,case_type,case_code,id) values(?,?,?,?);`
    const [result] = await connection.execute(statement, [caseName, caseType, caseCode, id])
    return result
  }

  async addCodes (codes, id) {
    const sqlArr = []
    const arr = []
    codes.forEach(item => {
      arr.push('(?,?,?)')
      sqlArr.push(...[item.filename, item.url, id])
    })
    const statement = `insert into tb_case_codes (filename,url,case_id) values${arr.join(',')};`
    const [result] = await connection.execute(statement, [...sqlArr])
    return result
  }

  async getCases (caseType, caseName, limit, offset) {
    const argumentsList = []
    let condition = ''
    caseName && (condition += ` and case_name like concat('%', ?, '%')`) && argumentsList.push(caseName);
    caseType && (condition += ` and case_type like concat('%', ?, '%')`) && argumentsList.push(caseType);
    // 获取总数
    let statement = `select  c.id id, c.case_name caseName, c.case_type caseType, c.case_code caseCode from tb_case c where 1=1` + condition + ` LIMIT ? , ?;`;
    let statement1 = `select count(*) total from tb_case where 1=1` + condition;
    const [rst] = await connection.execute(statement1, [...argumentsList])
    const [data] = await connection.execute(statement, [...argumentsList , offset, limit]);
    return {
      data,
      total: rst[0].total
    }
  }

  async getCaseById (id) {
    const statement = `
    SELECT 
    c.id id, c.case_name caseName, c.case_type caseType, c.case_code caseCode,
    (SELECT IF(COUNT(cc.id),JSON_ARRAYAGG(
      JSON_OBJECT('filename',cc.filename , 'url' , cc.url )
    ), NULL) FROM tb_case_codes cc WHERE cc.case_id = c.id) codes
    FROM tb_case c
    WHERE c.id = ?;
    `
    const [rst] = await connection.execute(statement, [id])
    return rst[0]
  }

}

module.exports = new caseService()
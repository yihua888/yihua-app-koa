const connection = require('../app/database')

class SqlService {
    async create(codeUrl, info, id){
        const statement = `insert into tb_sql (codeUrl,info,id) values(?,?,?);`
        const [result] = await connection.execute(statement,[codeUrl, info, id])
        return result
    }

    async getSqls(info, limit, offset){
        const argumentsList = []
        let statement =  `select  p.id id,p.codeUrl codeUrl,p.info info from tb_sql p where 1=1`;
        info && (statement += ` and info like concat('%', ?, '%')`) && argumentsList.push(info);
        argumentsList.push(offset,limit)
        statement += ` LIMIT ? , ?;`
        
        // 获取总数
        const statement1 = `select count(*) total from tb_sql`
        const [rst] = await connection.execute(statement1)
        const [ data ] = await connection.execute(statement,[...argumentsList]);
        return {
            data,
            total : rst[0].total
        }

    }

    async getSqlById(utilId){
        const statement = `select p.id id,p.codeUrl codeUrl,p.info info from tb_sql p where id = ?;`
        const [rst] = await connection.execute(statement,[utilId])
        return rst[0]
    }
}

module.exports = new SqlService()
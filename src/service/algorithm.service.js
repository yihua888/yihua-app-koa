const connection = require('../app/database')

class AlgorithmService {
    async createAlgorithmType(typeName,typeCode,id){
        const statement = `insert into tb_algorithm_type (algorithm_type,type_name,id) values(?,?,?);`
        const [result] = await connection.execute(statement, [typeCode,typeName,id])
        return result
    }

    async getAlgorithmTypes(){
        const statement = `select algorithm_type typeCode,type_name typeName, id from  tb_algorithm_type;`
        const [result] = await connection.query(statement)
        return result
    }

    async getAlgorithmTypeByName(name){
        const statement = `select algorithm_type typeCode,type_name  typeName , id from  tb_algorithm_type where type_name = ?;`
        const [result] = await connection.execute(statement, [name])
        return result[0]
    }

    async create (name, label, info, typeId, id) {
        const statement = `insert into tb_algorithm (name,label,info,type_id,id) values(?,?,?,?,?);`
        const [result] = await connection.execute(statement, [name, label, info, typeId, id])
        return result
    }

    async addCodes (codes, id) {
        const sqlArr = []
        const arr = []
        codes.forEach(item => {
            arr.push('(?,?,?)')
            sqlArr.push(...[item.filename, item.url, id])
        })
        const statement = `insert into tb_algorithm_codes (filename,url,algorithm_id) values${arr.join(',')};`
        const [result] = await connection.execute(statement, [...sqlArr])
        return result
    }

    async getAlgorithms (algorithmName , algorithmType ,limit, offset) {
        let condition = ''
        const argumentsList = []
        algorithmName && (condition += ` and algorithm_name like concat('%', ?, '%')`) && argumentsList.push(algorithmName);
        algorithmType && (condition += ` and algorithm_type like concat('%', ?, '%')`) && argumentsList.push(algorithmType);
        const statement = `select a.name name,a.label label,a.info info,a.id id,atype.type_name type
        from tb_algorithm a
        left join tb_algorithm_type atype on atype.id=a.type_id` + condition + ` LIMIT ? , ?;`
        const statement1 = `select count(*) total from tb_algorithm a left join tb_algorithm_type atype on atype.id=a.type_id` + condition 
        const [rst] = await connection.execute(statement1 , [...argumentsList])
        const [data] = await connection.execute(statement, [...argumentsList , offset, limit])
        return {
            data,
            total: rst[0].total
        }
    }

    async getAlgorithmById (algorithmId) {
        const statement = `
        select 
        a.name name,a.label label,a.info info,a.id id,atype.type_name type,
        (select IF(count(ac.id),JSON_ARRAYAGG(
            JSON_OBJECT('filename',ac.filename,'url',ac.url)
        ),NULL) from tb_algorithm_codes ac where ac.algorithm_id=a.id) codes
        from tb_algorithm a
        left join tb_algorithm_type atype on atype.id=a.type_id
        where a.id = ?;
        `
        try {
            const [rst] = await connection.execute(statement , [algorithmId])
            return rst[0]
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AlgorithmService()
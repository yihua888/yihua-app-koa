const connection = require('../app/database')

class pluginService {
    async create(pluginName, codeUrl, info, id){
        const statement = `insert into tb_plugin (plugin_name,codeUrl,info,id) values(?,?,?,?);`
        const [result] = await connection.execute(statement,[pluginName, codeUrl, info, id])
        return result
    }

    async getPlugins(pluginName, info, limit, offset){
        const argumentsList = []
        let statement =  `select  p.id id,p.codeUrl codeUrl,p.info info, p.plugin_name pluginName  from tb_plugin p where 1=1`;
        pluginName && (statement += ` and plugin_name like concat('%', ?, '%')`) && argumentsList.push(pluginName);
        info && (statement += ` and info like concat('%', ?, '%')`) && argumentsList.push(info);
        argumentsList.push(offset,limit)
        statement += ` LIMIT ? , ?;`
        
        // 获取总数
        const statement1 = `select count(*) total from tb_plugin`
        const [rst] = await connection.execute(statement1)
        const [ data ] = await connection.execute(statement,[...argumentsList]);
        return {
            data,
            total : rst[0].total
        }

    }

    async getPluginById(utilId){
        const statement = `select p.id id,p.codeUrl codeUrl,p.info info, p.plugin_name pluginName from tb_plugin p where id = ?;`
        const [rst] = await connection.execute(statement,[utilId])
        return rst[0]
    }
}

module.exports = new pluginService()
const connection = require('../app/database')

class pluginService {
    async create(pluginName, codeUrl, info, id){
        const statement = `insert into tb_plugin (plugin_name,codeUrl,info,id) values(?,?,?,?);`
        const [result] = await connection.execute(statement,[pluginName, codeUrl, info, id])
        return result
    }

    async getPlugins(pluginName, info, limit, offset){
        const argumentsList = []
        let condition = ''
        pluginName && (condition += ` and plugin_name like concat('%', ?, '%')`) && argumentsList.push(pluginName);
        info && (condition += ` and info like concat('%', ?, '%')`) && argumentsList.push(info);
        // 获取总数
        let statement =  `select  p.id id,p.codeUrl codeUrl,p.info info, p.plugin_name pluginName  from tb_plugin p where 1=1` + condition +  ` LIMIT ? , ?;`;
        let statement1 = `select count(*) total from tb_plugin where 1=1` + condition
        const [rst] = await connection.execute(statement1,[...argumentsList])
        const [ data ] = await connection.execute(statement,[...argumentsList,offset,limit]);
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
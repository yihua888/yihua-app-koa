const connection = require('../app/database')

class CpnService {
  async create (cpn) {
    const { cpnName, label, info, blog, cpnUrl , id } = cpn
    const statement = `insert into tb_cpn (cpn_name,label,info,blog,cpn_url,id) values(?,?,?,?,?,?);`
    const [result] = await connection.execute(statement,[cpnName, label, info, blog, cpnUrl,id])
    return result
  }

  async addAttr(attrs,id){
    const sqlArr = []
    const arr = []
    attrs.forEach(item=>{
      arr.push('(?,?,?,?,?,?)')
      sqlArr.push(...[item.attrName,item.info,item.required,item.defaultValue,item.attrType,id])
    })
    const statement = `insert into tb_cpn_attr (attr_name,info,required,default_value,attr_type,cpn_id) values${arr.join(',')};`
    const [result] = await connection.execute(statement,[...sqlArr])
    return result
  }

  async addMethod(methods,id){
    const sqlArr = []
    const arr = []
    methods.forEach(item=>{
      arr.push('(?,?,?)')
      sqlArr.push(...[item.methodName,item.info,id])
    })
    const statement = `insert into tb_cpn_methods (method_name,info,cpn_id) values${arr.join(',')};`
    const [result] = await connection.execute(statement,[...sqlArr])
    return result
  }

  async addSlot(slots,id){
    const sqlArr = []
    const arr = []
    slots.forEach(item=>{
      arr.push('(?,?,?,?)')
      sqlArr.push(...[item.slotName,item.info,item.argumentsInfo,id])
    })
    const statement = `insert into tb_cpn_slots (slot_name,info,arguments_info,cpn_id) values${arr.join(',')};`
    const [result] = await connection.execute(statement,[...sqlArr])
    return result
  }

  async addCodes(codes,id){
    const sqlArr = []
    const arr = []
    codes.forEach(item=>{
      arr.push('(?,?,?)')
      sqlArr.push(...[item.name,item.url,id])
    })
    const statement = `insert into tb_cpn_codes (file_name,url,cpn_id) values${arr.join(',')};`
    const [result] = await connection.execute(statement,[...sqlArr])
    return result
  }

  async getCpns(cpnName,label,limit,offset){
    const argumentsList = []
    let statement =  `select * from tb_cpn where 1=1`;
    cpnName && (statement += ` and cpn_name like concat('%', ?, '%')`) && argumentsList.push(cpnName);
    label && (statement += ` and label like concat('%', ?, '%')`) && argumentsList.push(label);
    argumentsList.push(offset,limit)
    statement += ` LIMIT ? , ?;`
    
    // 获取总数
    const statement1 = `select count(*) total from tb_cpn`
    const [rst] = await connection.execute(statement1)
    const [ data ] = await connection.execute(statement,[...argumentsList]);
    return {
      data,
      total : rst[0].total
    }

  }

  async getCpnById(cpnId){
    const statement = `
    SELECT 
    c.id id, c.cpn_name cpnName, c.label label, c.blog blog, c.info info, c.cpn_url cpnUrl,

    (SELECT IF(COUNT(ca.id),JSON_ARRAYAGG(
      JSON_OBJECT('name', ca.attr_name, 'info', ca.info , 'required', ca.required, 'defaultValue',ca.default_value,'type', ca.attr_type)
    ),NULL) FROM tb_cpn_attr ca WHERE ca.cpn_id = c.id) attrs,

    (SELECT IF(COUNT(cc.id),JSON_ARRAYAGG(
      JSON_OBJECT('fileName',cc.file_name , 'url' , cc.url)
    ), NULL) FROM tb_cpn_codes cc WHERE cc.cpn_id = c.id) codes,

    (SELECT IF(COUNT(cm.id),JSON_ARRAYAGG(
      JSON_OBJECT('name',cm.method_name , 'info' , cm.info )
    ), NULL) FROM tb_cpn_methods cm WHERE cm.cpn_id = c.id) methods,

    (SELECT IF(COUNT(cs.id),JSON_ARRAYAGG(
      JSON_OBJECT('name',cs.slot_name , 'info' , cs.info , 'arguments_info', arguments_info)
    ), NULL) FROM tb_cpn_slots cs WHERE cs.cpn_id = c.id) slots

    FROM tb_cpn c
    WHERE c.id = ?;
    `
    const [rst] = await connection.execute(statement,[cpnId])
    return rst[0]
  }
}

module.exports = new CpnService()

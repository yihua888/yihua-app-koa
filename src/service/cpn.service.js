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
    console.log(cpnName,label,limit,offset);
    const statement =  `select * from tb_cpn where cpn_name like '%?%' and label like '%?%' LIMIT ? OFFSET ?;`
    const [ result ] = await connection.execute(statement,[cpnName,label,limit,offset]);
    return result
  }
}

module.exports = new CpnService()

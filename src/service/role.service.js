const connection = require('../app/database')
class RoleSerice{
  async create(roleName){
    const statement = `INSERT INTO tb_role (role_name) VALUE(?);`
    const [rst] = await connection.execute(statement,[roleName])
    return rst
  }

  async getRoles(){
    const statement = `select r.id id, r.role_name roleName from tb_role r;`
    const [rst] = await connection.query(statement)
    return rst
  }

  async getRoleById(id){
    const statement = `select  r.id id, r.role_name roleName, 
    json_arrayagg(json_object('id',p.id,'name',p.permission_name,'pId',p.p_id)) permissions
    from tb_role r
    left join tb_role_permission trp on trp.role_id = r.id
    left join tb_permission p on p.id = trp.permission_id
    where r.id = ?;`
    const [rst] = await connection.execute(statement,[id])
    return rst
  }
}

module.exports = new RoleSerice()
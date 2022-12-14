const connection = require("../app/database");
class RoleSerice {
  async create(roleName) {
    const statement = `INSERT INTO tb_role (role_name) VALUE(?);`;
    const [rst] = await connection.execute(statement, [roleName]);
    return rst;
  }

  async update(roleName, id) {
    const statement = `update tb_role set role_name = ? where id = ?; `;
    const [rst] = await connection.execute(statement, [roleName, id]);
    return rst;
  }

  async removeRoleById(id) {
    const statement = `delete from tb_role  where id = ?;`;
    const rst = await connection.execute(statement, [id]);
    return rst;
  }

  async getRoles() {
    const statement = `select r.id id, r.role_name roleName from tb_role r;`;
    const [rst] = await connection.query(statement);
    return rst;
  }

  async getRoleById(id) {
    const statement = `select  r.id id, r.role_name roleName, 
    json_arrayagg(json_object('id',p.id,'name',p.permission_name,'pId',p.p_id)) permissions
    from tb_role r
    left join tb_role_permission trp on trp.role_id = r.id
    left join tb_permission p on p.id = trp.permission_id
    where r.id = ?;`;
    const [rst] = await connection.execute(statement, [id]);
    return rst[0];
  }

  async updateRolePermission(roleId, permissionIds){
    // 先删除
    const statement = `delete from tb_role_permission where role_id = ?;`
    await connection.execute(statement,[roleId])
    if(permissionIds.length){
      const str = []
      const value = []
      permissionIds.forEach(item=>{
        str.push('(?,?)')
        value.push(roleId,item)
      })
      // 再插入
      const statement1 = `insert into tb_role_permission (role_id,permission_id) values${str.join(',')};`
      await connection.execute(statement1,[...value])
    }
    return '编辑成功'
  }
}

module.exports = new RoleSerice();

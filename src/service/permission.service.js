const connection = require('../app/database');

class PermissionService{
    async getPermission(userId){
        const statement = `
        SELECT 
        p.permission_name permissionName , p.permission_type type , p.path path,p.permission_code permissionCode ,p.icon icon, p.p_id pId ,p.cpnURL cpnURL
        FROM tb_user u
        LEFT JOIN tb_role_permission rp ON rp.role_id = u.id
        LEFT JOIN tb_permission p ON p.id = rp.permission_id
        WHERE  u.id = ? and p.id is not null;
        `
        const [result] = await connection.execute(statement,[userId])
        return result
    }

    async getPermissionList(){
        const statement = `
        SELECT 
        p.id  id ,p.permission_name permissionName , p.permission_type type , p.path path,p.permission_code permissionCode ,p.icon icon, p.p_id pId ,p.cpnURL cpnURL
        FROM tb_permission p;
        `
        const [result] = await connection.query(statement)
        return result
    }

    async updatePermission(name,type,path,code,pId,icon,cpnUrl,id){
        const statement = `update tb_permission 
       set  permission_name=?,permission_type=?,path=?,permission_code=?,p_id=?,icon=?,cpnURL=?
       where id =?;`
        const [rst] = await connection.execute(statement,[name,type,path,code,pId,icon,cpnUrl,id])
        return rst
    }

    async create(name,type,path,code,pId,icon,cpnUrl){
        const statement = `insert into tb_permission 
        (permission_name,permission_type,path,permission_code,p_id,icon,cpnURL) 
        values (?,?,?,?,?,?,?);`
        const [rst] = await connection.execute(statement,[name,type,path,code,pId,icon,cpnUrl])
        return rst
    }


    async remove(id){
        const statement = `delete from tb_permission  where id = ?;`
        const [rst] = await connection.execute(statement,[id])
        return rst
    }
}

module.exports = new PermissionService()
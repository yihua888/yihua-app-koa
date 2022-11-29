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
}

module.exports = new PermissionService()
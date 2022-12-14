const connection = require('../app/database');

class PermissionService{
    async getPermission(userId){
        const statement = `
        SELECT 
        p.permission_name permissionName , p.permission_type type , p.path path,p.permission_code permissionCode ,p.icon icon, p.p_id pId ,p.cpnURL cpnURL
        FROM tb_user u
        LEFT JOIN tb_role_permission rp ON rp.role_id = u.role_id
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
        const value = [name,type,pId];
        const strArr = ''
        path && (strArr.push('path=?') || value.push(path)); 
        code && (strArr.push('permission_code=?') || value.push(code)); 
        icon && (strArr.push('icon=?') || value.push(icon));
        cpnUrl && (strArr.push('cpnURL=?') || value.push(cpnUrl));
        value.push(id)
        const statement = `update tb_permission 
        set permission_name=?,permission_type=?,p_id=?,${strArr.join(',')}
        where id =?;`
        const [rst] = await connection.execute(statement,[...value])
        return rst
    }

    async create(name,type,path,code,pId,icon,cpnUrl){
        const fileds = ['permission_name','permission_type','p_id'];
        const value = [name,type,pId];
        if(path){fileds.push('path') ; value.push(path);}; 
        if(code){ fileds.push('permission_code') ; value.push(code) }
        if(icon){fileds.push('icon') ; value.push(icon);}
        if(cpnUrl) {fileds.push('cpnURL') ; value.push(cpnUrl);}
        const statement = `insert into tb_permission 
        (${fileds.join(',')}) 
        values (${fileds.map(i=>'?').join(',')});`
        const [rst] = await connection.execute(statement,[...value])
        return rst
    }

    async remove(id){
        const statement = `delete from tb_permission  where id = ?;`
        const [rst] = await connection.execute(statement,[id])
        return rst
    }
}

module.exports = new PermissionService()
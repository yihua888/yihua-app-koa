const permissionService = require('../service/permission.service')

class PermissionController {
    async getPermission(ctx,next){
        const userId = ctx.user.id
        const rst =  await permissionService.getPermission(userId)
        ctx.body = rst
    }

    async getPermissionList(ctx,next){
        const rst = await permissionService.getPermissionList()
        ctx.body = rst
    }

    async create(ctx,next){
        // 需要写校验规则
        const { permissionName , type , path, permissionCode , icon, pId , cpnURL} = ctx.request.body
        const rst = await permissionService.create(permissionName,type,path,permissionCode,pId,icon,cpnURL)
        ctx.body = rst
    }

    async update(ctx,next){
        // 需要写校验规则
        const { permissionName , type , path, permissionCode , icon, pId , cpnURL ,id} = ctx.request.body
        const rst = await permissionService.updatePermission(permissionName,type,path,permissionCode,pId,icon,cpnURL,id)
        ctx.body = rst
    }

    async remove(ctx,next){
        const { id } = ctx.request.params
        const rst = await permissionService.remove(id)
        ctx.body = rst
    }
}

module.exports = new PermissionController()
const permissionService = require('../service/permission.service')

class PermissionController {
    async getPermission(ctx,next){
        const userId = ctx.user.id
        const rst =  await permissionService.getPermission(userId)
        ctx.body = rst
    }
}

module.exports = new PermissionController()
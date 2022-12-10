const  roleService  = require("../service/role.service") 

class RoleController {
  async create(ctx,next){
    const { roleName } = ctx.request.body
    await roleService.create(roleName)
    ctx.body = '添加角色成功'
  }

  async getRoles(ctx,next){
    // 不做分页，角色全部查询
    const rst = await roleService.getRoles()
    ctx.body = rst
  }

  async getRoleById(ctx,next){
    // 依据角色id查找是包括对应的名字及权限
    const { roleId } = ctx.request.params
    const rst = await roleService.getRoleById(roleId)
    ctx.body = rst
  }
}

module.exports = new RoleController()
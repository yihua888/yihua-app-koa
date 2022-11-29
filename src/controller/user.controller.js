const userService = require('../service/user.service');

class UserController{
  async create(ctx,next){
    // 获取用户传递的参数
    const user = ctx.request.body;
    // 查询数据
    const rst = await userService.create(user)
    // 返回数据
    ctx.body = rst;
  }
}

module.exports = new UserController()
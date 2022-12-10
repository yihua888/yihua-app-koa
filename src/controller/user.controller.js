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

  async getUsers(ctx,next){
    const { username, limit, offset } = ctx.request.query
    const rst = await userService.getUsers(username, limit, offset)
    ctx.body = rst
  }

  async getUserById(ctx,next){
    const { userId } = ctx.request.params
    const rst = await userService.getUserById(userId)
    ctx.body = rst
  }

  async updateUser(ctx,next){
    console.log(ctx.request);
  }
}

module.exports = new UserController()
const userService = require("../service/user.service");
const fs = require("fs");
const createID = require("../utils/createId");

class UserController {
  async create(ctx, next) {
    // 获取用户传递的参数
    const user = ctx.request.body;
    // 查询数据
    const rst = await userService.create(user);
    // 返回数据
    ctx.body = rst;
  }

  async getUsers(ctx, next) {
    const { username, limit, offset } = ctx.request.query;
    const rst = await userService.getUsers(username, limit, offset);
    ctx.body = rst;
  }

  async getUserById(ctx, next) {
    const { userId } = ctx.request.params;
    const rst = await userService.getUserById(userId);
    ctx.body = rst;
  }

  async updateUser(ctx, next) {
    const { id: userId, username, roleId, avatarId: aId } = ctx.request.body;
    const files = ctx.request.files;
    const flag = aId === "null" || !aId;
    const avatarId = flag ? createID() : aId;
    if (Object.keys(files)[0]) {
      // 保存文件地址到avatar
      const avatarUrl =
        "upload/avatar/" + files[Object.keys(files)[0]].newFilename;
      const filename = files[Object.keys(files)[0]].originalFilename;
      if (!flag) await userService.upDateAvatar(avatarUrl, aId, filename);
      else await userService.createAvatar(avatarUrl, avatarId, filename);
    }
    // 更新其余信息
    await userService.updateUser(
      username,
      userId,
      roleId,
      Object.keys(files)[0] ? avatarId : null
    );
    ctx.body = "修改成功";
  }
}

module.exports = new UserController();

const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
const userService = require('../service/user.service')

class AuthController{

  async login(ctx,next){
    const { username , id } = ctx.user
    const token = jwt.sign({id,username},PRIVATE_KEY,{
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    // 拿用户头像
    const rst = await  userService.getUserById(id)
    ctx.body = { id, username, token , ...rst}
  }

}

module.exports = new AuthController() 
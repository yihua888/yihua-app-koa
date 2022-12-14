const Router = require('koa-router')
const { koaBody } = require('koa-body')
const path = require('path')
const createID = require('../utils/createId')

const {create, getUsers, getUserById, updateUser, removeUser} = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const userRouter = new Router({ prefix: '/users' })

// 注册用户
userRouter.post('/', handlePassword, verifyUser ,create)
userRouter.patch('/' ,  koaBody({
  'multipart': true,
  formidable: {
    uploadDir: path.resolve(__dirname, '../../upload/avatar'),
    filename: (name, ext, part) => createID() + path.extname(part.name)
  }
}), updateUser)
userRouter.get('/', getUsers)
userRouter.get('/:userId', getUserById)
userRouter.delete('/:userId',  removeUser)

module.exports = userRouter

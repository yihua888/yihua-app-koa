const Router = require('koa-router')

const { create, getUsers, getUserById, updateUser} = require('../controller/user.controller')
const {verifyUser, handlePassword} = require('../middleware/user.middleware')
const userRouter = new Router({prefix: '/users'})

// 注册用户
userRouter.post('/', verifyUser , handlePassword, create)
userRouter.patch('/', updateUser)
userRouter.get('/' , getUsers)
userRouter.get('/:userId' , getUserById)

module.exports = userRouter

const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { getPermission, getPermissionList, create, update, remove } = require('../controller/permission.controller')

const userRouter = new Router({ prefix: '/permission' })

// 获取权限
userRouter.get('/', verifyAuth, getPermission)
// 获取权限列表
userRouter.get('/list', getPermissionList)
// 新增权限
userRouter.post('/', verifyAuth, create)
// 更新
userRouter.patch('/', verifyAuth, update)
// 删除
userRouter.delete('/:id', verifyAuth, remove)

module.exports = userRouter

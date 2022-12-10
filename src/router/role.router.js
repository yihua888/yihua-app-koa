const Router = require('koa-router')

const { create, getRoles, getRoleById} = require('../controller/role.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const roleRouter = new Router({prefix: '/role'})
// 注册
roleRouter.post('/' , verifyAuth , create)
// 获取
roleRouter.get('/' , getRoles)
// 获取单个
roleRouter.get('/:roleId' , getRoleById)

module.exports = roleRouter

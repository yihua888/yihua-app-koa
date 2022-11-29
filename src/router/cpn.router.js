const Router = require('koa-router')

const { create, getCpns, getCpnById} = require('../controller/cpn.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const cpnRouter = new Router({prefix: '/cpn'})
// 注册组件
cpnRouter.post('/' , verifyAuth , create)

cpnRouter.get('/' , getCpns)
cpnRouter.get('/:cpnId' , getCpnById)

module.exports = cpnRouter

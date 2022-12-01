const Router = require('koa-router')

const { create, getAlgorithm, getCaseById} = require('../controller/algorithm.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const algorithmRouter = new Router({prefix: '/algorithm'})
// 注册组件
algorithmRouter.post('/' , verifyAuth , create)
// 获取组件
algorithmRouter.get('/' , getAlgorithm)
// 获取单个组件
algorithmRouter.get('/:algorithmId' , getCaseById)

module.exports = algorithmRouter

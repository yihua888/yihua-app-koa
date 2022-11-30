const Router = require('koa-router')

const { create, getCases, getCaseById} = require('../controller/case.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const caseRouter = new Router({prefix: '/case'})
// 注册组件
caseRouter.post('/' , verifyAuth , create)
// 获取组件
caseRouter.get('/' , getCases)
// 获取单个组件
caseRouter.get('/:caseId' , getCaseById)

module.exports = caseRouter

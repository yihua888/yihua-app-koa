const Router = require('koa-router')

const { create, getUtils, getUtilById} = require('../controller/util.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const utilRouter = new Router({prefix: '/util'})
// 注册组件
utilRouter.post('/' , verifyAuth , create)
// 获取组件
utilRouter.get('/' , getUtils)
// 获取单个组件
utilRouter.get('/:utilId' , getUtilById)

module.exports = utilRouter

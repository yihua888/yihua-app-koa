const Router = require('koa-router')

const { create, getSqls, getSqlById} = require('../controller/sql.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const sqlRouter = new Router({prefix: '/sql'})
// 注册组件
sqlRouter.post('/' , verifyAuth , create)
// 获取组件
sqlRouter.get('/' , getSqls)
// 获取单个组件
sqlRouter.get('/:utilId' , getSqlById)

module.exports = sqlRouter

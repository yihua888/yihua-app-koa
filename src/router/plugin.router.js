const Router = require('koa-router')

const { create, getPlugins, getPluginById} = require('../controller/plugin.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const pluginRouter = new Router({prefix: '/plugin'})
// 注册组件
pluginRouter.post('/' , verifyAuth , create)
// 获取组件
pluginRouter.get('/' , getPlugins)
// 获取单个组件
pluginRouter.get('/:utilId' , getPluginById)

module.exports = pluginRouter

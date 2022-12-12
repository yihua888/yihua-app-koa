const Router = require('koa-router')

const { getAvatar } = require('../controller/upload.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const uploadRouter = new Router({prefix: '/upload'})
uploadRouter.get('/avatar/:filename' , getAvatar)

module.exports = uploadRouter

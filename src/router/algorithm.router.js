const Router = require('koa-router')

const { create, getAlgorithms, getAlgorithmById, createAlgorithmType, getAlgorithmTypeByName, getAlgorithmTypes} = require('../controller/algorithm.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const algorithmRouter = new Router({prefix: '/algorithm'})

algorithmRouter.post('/type', verifyAuth, createAlgorithmType)
algorithmRouter.get('/type', getAlgorithmTypes)
algorithmRouter.get('/type/:name',  getAlgorithmTypeByName)
algorithmRouter.post('/' , verifyAuth , create)
algorithmRouter.get('/' , getAlgorithms)
algorithmRouter.get('/:algorithmId' , getAlgorithmById)

module.exports = algorithmRouter

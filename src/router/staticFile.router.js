const Router = require('koa-router')

const fs = require('fs')
const path = require('path')
const staticFile = new Router({prefix: '/staticFile'})

// 获取静态文件
staticFile.get('/',(ctx,next)=>{
    const filePath = path.join(__dirname,'../static',ctx.request.query.url)
    const codeStr = fs.readFileSync(filePath)
    ctx.set({
        'Access-Control-Expose-Headers': 'Content-Disposition',//核心配置
        'Content-Type': 'application/octet-stream',//核心配置
    })
    ctx.body = codeStr
})


module.exports = staticFile

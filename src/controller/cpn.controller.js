const service = require('../service/cpn.service')
const createID = require('../utils/createId')
class CpnController {
  async create(ctx,next){
    try {
      const {cpnName, label, info, blog, cpnUrl , attrs , methods , slots , codes} = ctx.request.body
      console.log(ctx.request.body);
      ctx.body = '添加成功'
      const id = createID()
      // 新增一条组件基本信息
      await service.create({cpnName, label, info, blog, cpnUrl ,id})
      // 增加attr
      attrs && attrs.length && await service.addAttr(attrs,id)
      // 增加methods
      methods && methods.length && await service.addMethod(methods,id)
      // 增加插槽
      slots && slots.length && await service.addSlot(slots,id)
      // 增加code
      codes && codes.length &&  await service.addCodes(codes,id)
      ctx.body = '添加成功'
    } catch (error) {
      ctx.app.emit('error', error, ctx)
    }
  
  }

  async getCpns(ctx,next){
    const { cpnName,label,limit,offset } = ctx.request.query
    const rst =  await service.getCpns(cpnName,label,limit,offset)
    ctx.body = rst
  }

  async getCpnById(ctx,next){
    const { cpnId } = ctx.request.params
    const rst =  await service.getCpnById(cpnId)
    ctx.body = rst
  }
}

module.exports =  new CpnController()
const service = require('../service/case.service')
const createID = require('../utils/createId')

class caseController {
  async create(ctx,next){
    const { caseType, caseName, caseCode, codes } = ctx.request.body
    const id = createID()
    await service.create(caseType, caseName, caseCode, id)
    if(codes && codes.length)
    await service.addCodes(codes,id)
    ctx.body = '添加成功'
  }

  async getCases(ctx,next){
    const { caseType, caseName, limit, offset } = ctx.request.query
    const rst = await service.getCases(caseType, caseName, limit, offset)
    ctx.body = rst
  }

  async getCaseById(ctx,next){
    const { caseId } = ctx.request.params
    const rst = await service.getCaseById(caseId)
    ctx.body = rst
  }
}

module.exports = new caseController()
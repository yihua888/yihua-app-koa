const service = require('../service/util.service')
const createID = require('../utils/createId')

class caseController {
  async create (ctx, next) {
    const { utilName, utilCode, codes } = ctx.request.body
    console.log(utilName, utilCode, codes);
    const id = createID()
    await service.create(utilName, utilCode, id)
    if (codes && codes.length)
      await service.addCodes(codes, id)
    ctx.body = '添加成功'
  }

  async getUtils (ctx, next) {
    const { utilName, limit, offset } = ctx.request.query
    const rst = await service.getUtils(utilName, limit, offset)
    ctx.body = rst
  }

  async getUtilById (ctx, next) {
    const { utilId } = ctx.request.params
    const rst = await service.getUtilById(utilId)
    ctx.body = rst
  }
}

module.exports = new caseController()
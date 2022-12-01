const service = require("../service/algorithm.service");
const createID = require("../utils/createId");

class algorithmController {

  async createAlgorithmType (ctx, next) {
    const { typeName, typeCode } = ctx.request.body
    const id = createID()
    const obj = await service.getAlgorithmTypeByName(typeName)
    if(obj){
      ctx.body = '已存在'
      return
    }
    const rst = await service.createAlgorithmType(typeName,typeCode,id)
    ctx.body = rst
  }

  async getAlgorithmTypes(ctx,next){
    const rst = await service.getAlgorithmTypes()
    ctx.body = rst
  }

  async getAlgorithmTypeByName(ctx,next){
    const { name } = ctx.request.params
    const rst = await service.getAlgorithmTypeByName(name)
    ctx.body = rst
  }

  async create (ctx, next) {
    const { name, label, info, typeId, codes } = ctx.request.body
    const id = createID()
    await service.create(name, label, info, typeId, id)
    if (codes && codes.length)
      await service.addCodes(codes, id)
    ctx.body = '添加成功'
  }

  async getAlgorithms (ctx, next) {
    const { algorithmName, algorithmType, limit, offset } = ctx.request.params
    const rst = await service.getAlgorithms(algorithmName, algorithmType, limit, offset)
    return rst
  }

  async getAlgorithmById (ctx, next) {
    const { algorithmId } = ctx.request.params;
    const rst = await service.getAlgorithmById(algorithmId);
    ctx.body = rst;
  }
}

module.exports = new algorithmController();

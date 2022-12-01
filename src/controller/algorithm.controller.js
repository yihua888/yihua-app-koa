const service = require("../service/algorithm.service");
const createID = require("../utils/createId");

class algorithmController {
  async create(ctx, next) {}

  async getAlgorithms(ctx, next) {}

  async getAlgorithmById(ctx, next) {
    const { algorithmId } = ctx.request.params;
    const rst = await service.getAlgorithmById(algorithmId);
    ctx.body = rst;
  }
}

module.exports = new algorithmController();

const service = require("../service/plugin.service");
const createID = require("../utils/createId");

class pluginController {
  async create(ctx, next) {
    const { pluginName, codeUrl, info} = ctx.request.body;
    const id = createID();
    await service.create(pluginName, codeUrl, info, id);
    ctx.body = "添加成功";
  }

  async getPlugins(ctx, next) {
    const { pluginName, info , limit, offset } = ctx.request.query;
    const rst = await service.getPlugins( pluginName, info, limit, offset);
    ctx.body = rst;
  }

  async getPluginById(ctx, next) {
    const { utilId } = ctx.request.params;
    const rst = await service.getPluginById(utilId);
    ctx.body = rst;
  }
}

module.exports = new pluginController();

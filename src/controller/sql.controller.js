const service = require("../service/sql.service");
const createID = require("../utils/createId");

class sqlController {
    async create(ctx, next) {
        const { codeUrl, info } = ctx.request.body;
        const id = createID();
        await service.create(codeUrl, info, id);
        ctx.body = "添加成功";
    }

    async getSqls(ctx, next) {
        const { info, limit, offset } = ctx.request.query;
        const rst = await service.getSqls(info, limit, offset);
        ctx.body = rst;
    }

    async getSqlById(ctx, next) {
        const { utilId } = ctx.request.params;
        const rst = await service.getSqlById(utilId);
        ctx.body = rst;
    }
}

module.exports = new sqlController();

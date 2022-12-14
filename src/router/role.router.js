const Router = require("koa-router");

const {
  create,
  update,
  remove,
  getRoles,
  getRoleById,
} = require("../controller/role.controller");
const { verifyAuth } = require("../middleware/auth.middleware");

const roleRouter = new Router({ prefix: "/role" });
// 注册
roleRouter.post("/", verifyAuth, create);
// 更新
roleRouter.patch("/", verifyAuth, update);
// 获取
roleRouter.get("/", getRoles);
// 获取单个
roleRouter.get("/:roleId", getRoleById);
// 删除
roleRouter.delete("/:roleId", remove);

module.exports = roleRouter;

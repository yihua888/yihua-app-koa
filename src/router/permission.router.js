const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { getPermission } = require("../controller/permission.controller");

const userRouter = new Router({ prefix: "/permission" });

// 获取权限
userRouter.get("/", verifyAuth, getPermission);

module.exports = userRouter;

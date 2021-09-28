import Vue from "vue";
import VueRouter from "vue-router";
import ConstantRoutes from "./constantRoutes";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
Vue.use(VueRouter);

export const routes = [];

// 重置路由方法，退出登录或变更权限时使用
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}
const createRouter = () =>
  new VueRouter({
    // mode: "history",
    base: process.env.VUE_APP_BASE_URL,
    routes: ConstantRoutes
    // routes:routes
  });

const router = createRouter();

export default router;

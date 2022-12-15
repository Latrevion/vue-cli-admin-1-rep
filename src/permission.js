import router from "./router";
import { Notification } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });

const needLoginRouter = [];
// vue-router 库的路由守卫。
// 守卫通过检查本地存储中是否存在 token 来检查用户是否已登录。
// 如果用户未登录并且请求的路由需要身份验证（由 needLoginRouter 数组表示），
// 则将用户重定向到带有请求路由作为查询参数的 /login 路由。
// 否则，用户可以访问请求的路由。NProgress 模块用于在路由解析时显示加载指示器。

router.beforeEach((to, from, next) => {
  NProgress.start();
  const hasToken = localStorage.getItem("token");
  if (hasToken) {
    next();
  } else {
    if (needLoginRouter.indexOf(to.path) === -1) {
      next();
    } else {
      Notification.warning("请登陆");
      next("/login?redirect=${to.path}");
      NProgress.done();
    }
  }
  next();
});

router.afterEach(()=>{
    NProgress.done()
})

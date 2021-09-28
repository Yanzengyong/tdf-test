import router from "./index";
import * as MenuAPI from "@/tdf/api/system-management/menu";
import Home from "../views/dashboard/index";
import store from "../store/index";
import routes from "./constantRoutes";
import { LocalStorage, SessionStorage } from "quasar";
import { addTagView, setTagView } from "../components/tagview/TagViewUtils";
var getRouter; //获取从后台获取的路由

router.beforeEach((to, from, next) => {
  setBreadcrumbsAndTagView(to);

  // 针对用户手动在地址栏输入路由地址而跳转到登录页的情况进行判断
  if (
    to.path === "/" ||
    to.path === "/forgotpassword" ||
    to.path === "/register"
  ) {
    LocalStorage.remove("token");
  }

  let token = LocalStorage.getItem("token");
  if (token) {
    if (!getRouter) {
      if (to.path.indexOf("component") !== -1) {
        next();
      } else {
        getRouterFromBack(to, next);
      }
    } else {
      store.commit("SET_CURRENT_ROUTE", to.path);
      if (to.matched.length === 0) {
        next("/404"); // 跳转路由不存在，跳转404页面
      } else {
        next();
      }
    }
  } else {
    store.commit("SET_CURRENT_ROUTE", to.path);
    if (window.location.href.indexOf("/#/ssologin") >= 0) {
      next();
    } else if (window.location.href.indexOf("/ssologin") >= 0) {
      window.location.href = `/#/ssologin` + window.location.search;
    } else if (
      to.path === "/" ||
      to.path === "/forgotpassword" ||
      to.path === "/register"
    ) {
      next();
      // } else if (window.location.href.indexOf("/ssologin") >= 0) {
      //   next();
    } else {
      next("/");
    }
  }
});

function setBreadcrumbsAndTagView(to) {
  store.commit("SET_BREADCRUMBS", to.matched);
  // 判断是否为刷新操作，如果是刷新操作则从 SessionStorage 获取保存的 tagView 信息
  let tagViewOnSS = [];
  JSON.parse(SessionStorage.getItem("tagView")) === null
    ? SessionStorage.set("tagView", "[]")
    : (tagViewOnSS = JSON.parse(SessionStorage.getItem("tagView")));
  if (store.getters.getTagView.length === 0 && tagViewOnSS.length !== 0) {
    // 界面刷新时取缓存的数据
    setTagView(tagViewOnSS);

    const expandedMenus = SessionStorage.getItem("expandedMenus");
    store.commit("SET_EXPANDED_MENUS", expandedMenus);

    const allGrey = SessionStorage.getItem("allGrey");
    if (allGrey) {
      store.commit("SET_ALL_GREY", allGrey);
    }

    const allTdf = SessionStorage.getItem("allTdf");
    if (allTdf) {
      store.commit("SET_ALL_TDF", allTdf);
    }

    const menuBg = SessionStorage.getItem("menuBg");
    if (menuBg) {
      store.commit("SET_MENU_BG", menuBg);
    }

    store.commit("SET_KEEPALIVE_LIST", tagViewOnSS);
  } else {
    addTagView(to);
  }
}

function getRouterFromBack(to, next) {
  MenuAPI.getRouterFromBack().then(data => {
    getRouter = data.router;
    routerGo(to, next); // 执行路由跳转方法
  });
}

function routerGo(to, next) {
  let dynimicRoutes = filterAsyncRouter(getRouter); // 过滤路由
  // console.log(dynimicRoutes);
  dynimicRoutes.forEach(item => {
    routes[1].children.push(item);
  });
  //routes[1].children=[...dynimicRoutes]
  store.commit("SET_ROUTES", routes);
  dynimicRoutes.forEach(item => {
    router.addRoute(item);
  });
  next(to.path);
}

function filterAsyncRouter(asyncRouterMapForPromission) {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = [];
  asyncRouterMapForPromission.forEach(route => {
    const accessedRoute = {};
    if (route.path) {
      if (route.component !== "Layout" && route.component !== "Submenu") {
        if (route.path.indexOf("index") !== -1) {
          accessedRoute.component = require("../../" +
            route.children[0].component +
            ".vue").default; // Layout组件特殊处理
        } else {
          accessedRoute.component = () =>
            import("../../" + route.component + ".vue");
        }
      } else if (route.component === "Layout") {
        accessedRoute.component = Home;
      }
      accessedRoute.path = route.path;
      if (route.children && route.children.length) {
        accessedRoute.name = route.path.substring(1, route.path.length);
      } else {
        accessedRoute.name = route.path;
      }
      accessedRoute.meta = route.meta;
      accessedRoute.id = route.id;
      if (route.children && route.children.length) {
        accessedRoute.children = filterAsyncRouter(route.children);
      }
      accessedRouters.push(accessedRoute);
      return true;
    }
  });
  return accessedRouters;
}

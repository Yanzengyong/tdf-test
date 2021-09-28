import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import { SessionStorage } from "quasar";
import {
  removeATagView,
  removeOneSide
} from "../components/tagview/TagViewUtils";
import dictionaries from "./modules/dictionaries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    verification: 1000,
    allGrey: false,
    allTdf: false,
    menuBg: "bg-white",
    breadcrumbs: [],
    tagView: [],
    expandedMenus: []
  },
  mutations: {
    //设置验证码
    SET_VERIFICATION: (state, verification) => {
      state.verification = verification;
    },
    // 设置全局灰色
    SET_ALL_GREY: (state, payload) => {
      state.allGrey = payload;
    },
    // 设置全局tdf背景
    SET_ALL_TDF: (state, payload) => {
      state.allTdf = payload;
    },
    // 设置左侧菜单栏背景颜色
    SET_MENU_BG: (state, payload) => {
      state.menuBg = payload;
    },
    // 设置路由
    SET_ROUTES: (state, payload) => {
      state.routes = payload;
    },
    SET_CURRENT_ROUTE: (state, payload) => {
      state.currentRoute = payload;
    },
    // 设置面包屑
    SET_BREADCRUMBS: (state, payload) => {
      const temp = [];
      for (let i = 0; i < payload.length; i++) {
        temp.push(payload[i].meta);
      }
      state.breadcrumbs = temp;
    },
    // 新增 tagView
    ADD_TAG_VIEW: (state, payload) => {
      const size = state.tagView.length;
      // 首次进入或刷新页面时，当前路由不是根路由
      if (!size && payload.fullPath !== "/") {
        state.tagView.push(payload);
        return;
      }
      // 为了避免 tagView 重复添加。 构建一个以 fullPath 为标识的数组 t[]
      const t = [];
      for (let i = 0; i < size; i++) {
        t.push(state.tagView[i].fullPath);
      }
      if (t.indexOf(payload.fullPath) === -1) {
        state.tagView.push(payload);
      }
    },
    SET_TAG_VIEW: (state, payload) => {
      state.tagView = payload;
    },
    // 移除 tagView
    REMOVE_TAG_VIEW: (state, payload) => {
      switch (typeof payload) {
        case "undefined":
          state.tagView = [];
          SessionStorage.set("tagView", "[]");
          router.push("/home/about");
          break;
        case "object":
          removeOneSide(state, payload);
          break;
        default:
          removeATagView(state, payload);
      }
    },
    // 设置缓存列表
    SET_KEEPALIVE_LIST: (state, payload) => {
      state.keepAliveList = [];
      for (let i = 0; i < payload.length; i++) {
        if (payload[i].keepAlive) {
          state.keepAliveList.push(payload[i].name);
        }
      }
      // 如果需要缓存首页，如下方所示，在方法最后 push 对应的路由组件名称即可
      // state.keepAliveList.push('home')
      return state.keepAliveList;
    },
    //设置左侧菜单展开项
    AND_EXPANDED_MENUS: (state, payload) => {
      if (payload !== undefined || payload !== "") {
        if (state.expandedMenus.indexOf(payload) === -1) {
          state.expandedMenus.push(payload);
        } else {
          const i = state.expandedMenus.indexOf(payload);
          state.expandedMenus.splice(i, 1);
        }
        SessionStorage.set(
          "expandedMenus",
          JSON.stringify(state.expandedMenus)
        );
      }
    },
    SET_EXPANDED_MENUS: (state, payload) => {
      state.expandedMenus = JSON.parse(payload);
    }
  },
  getters: {
    getAllGrey: state => {
      return state.allGrey;
    },
    getAllTdf: state => {
      return state.allTdf;
    },
    getMenuBg: state => {
      return state.menuBg;
    },
    getBreadcrumbs: state => {
      return state.breadcrumbs;
    },
    getTagView: state => {
      return state.tagView;
    },
    getRoutes: state => {
      return state.routes;
    },
    getCurrentRoute: state => {
      return state.currentRoute;
    },
    getExpandedMenus: state => {
      return state.expandedMenus;
    }
  },
  actions: {},
  modules: { dictionaries }
});

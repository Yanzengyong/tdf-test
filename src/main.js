import Vue from "vue";
import App from "./App.vue";
import router from "./tdf/router";
import store from "./tdf/store";
import "./quasar";
import "./config";
import i18n from "./i18n";
import "./tdf/router/permission";

import TdfBtton from "./tdf/common/source/button/main.vue";

import { hasPermissionforviews } from "@/tdf/utils/elementPermission"; // 按钮权限

import * as filters from "@/tdf/filters";

import * as echarts from "echarts";
import Print from "@folder-outside-request/print";

import animated from "animate.css";

Vue.use(animated);
Vue.use(Print);
Vue.prototype.$echarts = echarts;

// 控制echart销毁
Vue.prototype.$mychart;

Vue.component(TdfBtton.name, TdfBtton);

import TdfUser from "tdf-ui-quasar/src/tdf-sys/views/user/index";
Vue.use(TdfUser);

import TdfMyself from "tdf-ui-quasar/src/tdf-sys/views/user/myself/index";
Vue.use(TdfMyself);

import TdfRole from "tdf-ui-quasar/src/tdf-sys/views/role/index";
Vue.use(TdfRole);

import TdfDept from "tdf-ui-quasar/src/tdf-sys/views/dept/index";
Vue.use(TdfDept);

import TdfMenu from "tdf-ui-quasar/src/tdf-sys/views/menu/index";
Vue.use(TdfMenu);

import TdfGroup from "tdf-ui-quasar/src/tdf-sys/views/group/index";
Vue.use(TdfGroup);

// import TdfParameter from 'tdf-ui-quasar/src/tdf-sys/parameter/index'
// Vue.use(TdfParameter)

import TdfLog from "tdf-ui-quasar/src/tdf-sys/views/logs/index";
Vue.use(TdfLog);

import TdfDictionarytype from "tdf-ui-quasar/src/tdf-sys/views/dictionary-type/index";
Vue.use(TdfDictionarytype);

import TdfMultidictionary from "tdf-ui-quasar/src/tdf-sys/views/dictionary/multiindex";
Vue.use(TdfMultidictionary);

Vue.component(TdfBtton.name, TdfBtton);

// 全局注册指令
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

process.env.VUE_APP_MOCK === "mock" && require("@/tdf/mock");

Vue.config.productionTip = false;

// 全局注册检测元素权限方法
Vue.prototype.hasPerm = hasPermissionforviews;

const vue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

export default vue;

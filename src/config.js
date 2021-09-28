import Vue from "vue";
import globalFunc from "./tdf/global"; // get global constant

// 自定义的一些全局变量
Vue.prototype.$viewStyle = "hHh Lpr lff"; // q-layout 的 view 配置
Vue.prototype.$btnSize = "13px"; // 按钮大小
Vue.prototype.$paginationSize = "12px"; // 分页按钮大小
Vue.prototype.$btnIconSize = "15px"; // 按钮图标大小
Vue.prototype.$drawerWidth = 200; // 左侧抽屉宽度
Vue.prototype.$menuIconSize = "15px"; // 左侧抽屉栏图标大小
Vue.prototype.$tagViewIconSize = "15px"; // tagView 图标大小
Vue.prototype.$tagViewHeight = "40px"; // tagView 高度
Vue.prototype.$tabsIconSize = "24px"; // tabs图标大小
Vue.prototype.$otherLoginIconSize = "30px"; // 登录页三方登录图标大小
Vue.prototype.$_global = globalFunc;

export default Vue;

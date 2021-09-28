import axios from "axios";
import { Notify, Dialog, LocalStorage } from "quasar";
import router from "../router/index";

const service = axios.create({
  retry: 2,
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.VUE_APP_BASE_API
      : window.__config.VUE_APP_BASE_API,
  timeout: 50000, // request timeout,
  retryDelay: 1000
});

service.interceptors.request.use(
  async request => {
    request.headers["Access-Control-Allow-Origin"] = "*";
    // token信息
    const tmpToken = LocalStorage.getItem("token");
    if (tmpToken) {
      request.headers["Authorization"] = tmpToken;
    }
    return request;
  },
  error => {
    // 请求发生错误
    console.log("request interceptor error"); // for debug
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  async response => {
    const res = response.data;
    console.log('response', response)
    if (res.code === 200) {
      // 这里是返回response中的data中的数据，如果接口返回数据格式不一致，需要相应改变
      return res.data;
    } else if (res.code === 401) {
      Dialog.create({
        title: "提示",
        message: "登录失效，您已被登出，可以取消继续留在此页面，或者重新登录",
        cancel: true,
        persistent: true
      }).onOk(() => {
        router.push("/");
      });
    } else {
      if (res.message) {
        Notify.create({
          message: res.message,
          type: "negative",
          position: "top"
        });
      } else {
        Notify.create({
          message: "请求异常",
          type: "negative",
          position: "top"
        });
      }
    }
  },
  async error => {
    Notify.create({
      message: error.message,
      type: "negative",
      position: "top"
    });
    return Promise.reject(error);
  }
);
export default service;

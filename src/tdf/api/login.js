import request from "@/tdf/utils/request";

export function login(data) {
  return request({
    url:
      "/login" +
      "?username=" +
      data.username +
      "&password=" +
      data.password +
      "&captchaKey=" +
      data.captchaKey +
      "&captchaCode=" +
      data.captchaCode,
    method: "post"
  });
}

export function getUserInfo() {
  return request({
    url: "/web-user-details",
    method: "get"
    // , params: { token }
  });
}

export function getRouterRoles() {
  return request({
    url: "/routers",
    method: "get"
    // , params: { token }
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post"
    // , params: { token }
  });
}

export function setElements(data) {
  const menuId = data.menuId;
  return request({
    url: "/permission/hasPermission",
    method: "get",
    params: { menuId }
  });
}

export function getQrcode() {
  return request({
    url: "/qrcodeId",
    method: "get"
  });
}

export function checkQrcode(qrcodeId) {
  return request({
    url: "/qrcodeTryAuth",
    method: "get",
    params: { qrcodeId }
  });
}

export function agreeQrcode(qrcodeId) {
  return request({
    url: "/qrcodeAuth",
    method: "get",
    params: { qrcodeId }
  });
}
//获取验证码
export function getVerification(data) {
  return request({
    url: "/verification-code",
    method: "get",
    patams: { data }
  });
}
//验证验证码
export function checkVertification(data) {
  return request({
    url: "/verification-code",
    method: "post",
    data
  });
}
//输入新密码
export function changePassword(data) {
  return request({
    url: "/cahnge-password",
    method: "post",
    data
  });
}
//注册
export function register(data) {
  return request({
    url: "/register",
    method: "post",
    data
  });
}

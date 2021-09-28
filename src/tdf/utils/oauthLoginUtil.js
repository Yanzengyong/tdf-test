import axios from "axios";
import querystring from "querystring";
import request from "./request";
const Base64 = require("js-base64").Base64;

const userAuthorizationUri =
  process.env.NODE_ENV === "development"
    ? process.env.VUE_APP_OAUTH_userAuthorizationUri
    : window.__config.VUE_APP_OAUTH_userAuthorizationUri;
const redirect_uri =
  process.env.NODE_ENV === "development"
    ? process.env.VUE_APP_OAUTH_redirect_uri
    : window.__config.VUE_APP_OAUTH_redirect_uri;
const accessTokenUri =
  process.env.NODE_ENV === "development"
    ? process.env.VUE_APP_OAUTH_accessTokenUri
    : window.__config.VUE_APP_OAUTH_accessTokenUri;
const userInfoUri =
  process.env.NODE_ENV === "development"
    ? process.env.VUE_APP_OAUTH_userInfoUri
    : window.__config.VUE_APP_OAUTH_userInfoUri;
// const logoutUri = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_OAUTH_logoutUri : window.__config.VUE_APP_OAUTH_logoutUri

var oauthLoginUtil = {
  getCode: function() {
    // TODO andyzhao code没有使用
    // process.env.oauth.code = RndNum(4)
    // 浏览器端重定向到统一认证服务地址，获取授权码
    window.location.href =
      userAuthorizationUri +
      ("?" +
        querystring.stringify({
          client_id: process.env.VUE_APP_OAUTH_clientId,
          response_type: process.env.VUE_APP_OAUTH_response_type,
          scope: process.env.VUE_APP_OAUTH_scope,
          state: process.env.VUE_APP_OAUTH_state,
          redirect_uri: redirect_uri
        }));
  },
  getToken: function(code, callback, error) {
    const baseStr = Base64.encode(
      process.env.VUE_APP_OAUTH_clientId +
        ":" +
        process.env.VUE_APP_OAUTH_client_secret
    );
    const tokenUrlStr =
      "?" +
      "client_id=" +
      process.env.VUE_APP_OAUTH_clientId +
      "&" +
      "client_secret=" +
      process.env.VUE_APP_OAUTH_client_secret +
      "&" +
      "code=" +
      code +
      "&" +
      "redirect_uri=" +
      redirect_uri +
      "&" +
      "grant_type=" +
      process.env.VUE_APP_OAUTH_grant_type;

    axios
      .post(accessTokenUri + tokenUrlStr, null, {
        headers: {
          Accept: "application/json",
          // "Accept": "application/json,application/x-www-form-urlencoded",
          // "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          authorization: "Basic " + baseStr
        }
      })
      .then(callback)
      .catch(error);
  },
  getUserInfo: function(token, callback, error) {
    axios({
      url: userInfoUri + "?" + "access_token=" + token,
      headers: { Accept: "application/json" }
    })
      .then(callback)
      .catch(error);
  },
  bindOAuth2User: function(data) {
    return request({
      url: "/bindOAuth2User",
      method: "post",
      data
    });
  }
};
export default oauthLoginUtil;

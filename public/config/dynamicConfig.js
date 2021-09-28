var __config = {
  // 生产环境 44上
  // VUE_APP_BASE_API: 'http://192.168.70.44:8802',
  // VUE_APP_userAuthorizationUri: 'http://192.168.70.44:8769/oauth/authorize',
  // VUE_APP_redirect_uri: 'http://192.168.70.44:8801/ssologin',
  // VUE_APP_accessTokenUri: 'http://192.168.70.44:8769/oauth/token',
  // VUE_APP_userInfoUri: 'http://192.168.70.44:8769/me',
  // VUE_APP_resUri: 'http://192.168.70.44:8802/tdf-service-sys'

  // 生产上
  VUE_APP_BASE_API: "https://tdf.taiji.com.cn:8889/",
  VUE_APP_OAUTH_userAuthorizationUri:
    "https://oauth2.taiji.com.cn/oauth/authorize",
  VUE_APP_OAUTH_clientId: "tdfuivue",
  VUE_APP_OAUTH_client_secret: "tdfuivue",
  VUE_APP_OAUTH_response_type: "code",
  VUE_APP_OAUTH_scope: "user_info",
  VUE_APP_OAUTH_state: "",
  VUE_APP_OAUTH_redirect_uri: "https://tdf.taiji.com.cn/ssologin",
  VUE_APP_OAUTH_grant_type: "authorization_code",
  VUE_APP_OAUTH_accessTokenUri: "https://oauth2.taiji.com.cn/oauth/token",
  VUE_APP_OAUTH_userInfoUri: "https://oauth2.taiji.com.cn/me",
  VUE_APP_OAUTH_logoutUri: "https://oauth2.taiji.com.cn/exit"
};

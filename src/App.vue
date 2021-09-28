<template>
  <q-layout
    class="full-height"
    :class="{
      'all-grey': $store.getters.getAllGrey === true,
      'all-tdf': $store.getters.getAllTdf === true
    }"
  >
    <q-page-container class="full-height">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import applogo from "./tdf/assets/applogo.png";
import { svgIcons } from "./tdf/icons/index";

const myIcons = {
  applogo: "img:" + applogo,
  "404": "img:" + svgIcons.error,
  add: "img:" + svgIcons.add,
  "auth-menu": "img:" + svgIcons.authMenu,
  captcha: "img:" + svgIcons.captcha,
  check: "img:" + svgIcons.check,
  del: "img:" + svgIcons.del,
  dept: "img:" + svgIcons.dept,
  "dictionary-multi": "img:" + svgIcons.dictionaryMulti,
  "dictionary-setting": "img:" + svgIcons.dictionarySetting,
  "dictionary-single": "img:" + svgIcons.dictionarySingle,
  "dictionary-type": "img:" + svgIcons.dictionaryType,
  edit: "img:" + svgIcons.edit,
  eye: "img:" + svgIcons.eye,
  index: "img:" + svgIcons.index,
  logs: "img:" + svgIcons.logs,
  password: "img:" + svgIcons.password,
  "role-group": "img:" + svgIcons.roleGroup,
  setting: "img:" + svgIcons.setting,
  user: "img:" + svgIcons.user,
  "user-group": "img:" + svgIcons.userGroup,
  "user-role": "img:" + svgIcons.userRole,
  "user-setting": "img:" + svgIcons.userSetting,
  qq: "img:" + svgIcons.qq,
  weixin: "img:" + svgIcons.weixin
};

export default {
  name: "App",
  created() {
    // 将本地的 svg、peg、jpg 等格式的图标装载到 quasar 的图标库中
    // 当遇到上面自定义的名称时，会自动加载本地图标
    this.$q.iconMapFn = iconName => {
      const icon = myIcons[iconName];
      if (icon !== void 0) {
        return { icon: icon };
      }
    };
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.all-grey {
  filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  -webkit-filter: grayscale(1);
}

.all-tdf {
  background: url("./tdf/assets/all-bg.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>

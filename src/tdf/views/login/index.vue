<template>
  <div>
    <!--设计了三种风格的登录页面，可以任选一种-->
    <q-select
      class="select"
      dense
      v-model="model"
      outlined
      options-dense
      :options="options"
    ></q-select>
    <q-btn class="locale" v-ripple flat round dense icon="o_translate">
      <q-menu :offset="[0, 0]" auto-close>
        <q-list padding>
          <q-item
            clickable
            v-ripple
            dense
            style="height: 40px;"
            :active="lang === 'zh-hans'"
            @click="changeLocale('zh-hans')"
          >
            <q-item-section class="cursor-pointer">中文</q-item-section>
          </q-item>
          <q-separator inset></q-separator>
          <q-item
            clickable
            v-ripple
            dense
            style="height: 40px;"
            :active="lang === 'en-us'"
            @click="changeLocale('en-us')"
          >
            <q-item-section class="cursor-pointer">English</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <!--第一种登录页面-->
    <div v-if="model === 'model-one'">
      <model-one
        @keepState="keepState"
        @login="login"
        @loginByTDFOS="loginByTDFOS"
      ></model-one>
    </div>
    <!--第二种登录页面-->
    <div v-if="model === 'model-two'">
      <model-two
        @keepState="keepState"
        @login="login"
        @loginByTDFOS="loginByTDFOS"
      >
      </model-two>
    </div>
    <!--第三种登录页面-->
    <div v-if="model === 'model-three'">
      <model-three
        @keepState="keepState"
        @login="login"
        @loginByTDFOS="loginByTDFOS"
      ></model-three>
    </div>
  </div>
</template>

<script>
import oauthLoginUtil from "../../utils/oauthLoginUtil";
import * as LoginApi from "@/tdf/api/login";
import ModelOne from "./ModelOne";
import ModelTwo from "./ModelTwo";
import ModelThree from "./ModelThree";
import store from "../../store";
import zhHans from "quasar/lang/zh-hans";
import enUS from "quasar/lang/en-us";

export default {
  name: "Login",
  data() {
    return {
      model: "model-one",
      options: ["model-one", "model-two", "model-three"],
      lang: ""
    };
  },
  components: {
    ModelOne,
    ModelTwo,
    ModelThree
  },
  mounted() {
    // 国际化
    this.lang = this.$q.localStorage.getItem("locale") || "zh-hans";

    this.$q.localStorage.remove("token"); // 移除 token
    this.$q.localStorage.remove("userInfo"); // 移除 userInfo
    this.$q.localStorage.remove("hometabs"); // 移除 hometabs

    // 可根据您的需要移除下面的内容
    // 比如被登出后，如果您希望重新登录后仍保留首页已进行过的操作，可以不移除
    store.commit("SET_CURRENT_ROUTE", ""); // 移除路由
    store.commit("REMOVE_TAG_VIEW"); // 移除 tagview
    store.commit("SET_EXPANDED_MENUS", JSON.stringify([])); // 移除 expandedMenus
  },
  methods: {
    changeLocale(l) {
      this.lang = l;
      this.$q.localStorage.set("locale", l);
      this.$i18n.locale = l;
      if (l === "zh-hans") {
        this.$q.lang.set(zhHans);
      } else {
        this.$q.lang.set(enUS);
      }
      console.log("当前quasar语言：" + this.$q.lang.isoName);
      this.$q.notify({
        progress: true,
        message: "当前国际化只做了部分界面用作示例",
        multiLine: true,
        closeBtn: true,
        position: "top-right"
      });
    },
    login(form) {
      const v = this.$q.localStorage.getItem("keepState");
      if (v === true) {
        this.$q.localStorage.set("username", form.username);
        this.$q.localStorage.set("password", form.password);
      } else {
        this.$q.localStorage.remove("username");
        this.$q.localStorage.remove("password");
        this.$q.localStorage.remove("keepState");
      }
      LoginApi.login(form)
        .then(res => {
          this.$q.localStorage.set("token", res);
          this.getUserInfo();
          this.$router.push("/home/about");
          this.$q.notify({
            type: "positive",
            message: "登录成功",
            position: "top"
          });
        })
        .catch(() => {
          //
        });
    },
    loginByTDFOS() {
      oauthLoginUtil.getCode();
    },
    getUserInfo() {
      LoginApi.getUserInfo().then(res => {
        if (res) {
          this.$q.localStorage.set("userInfo", res);
        }
      });
    },
    keepState(v) {
      this.$q.localStorage.set("keepState", v);
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  width: 140px;
  position: absolute;
  top: 20px;
  right: 50px;
  z-index: 1000;
}

.locale {
  position: absolute;
  top: 20px;
  right: 10px;
  z-index: 1000;
}
</style>

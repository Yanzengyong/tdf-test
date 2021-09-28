<template>
  <q-page class="body flex justify-center items-center column">
    <div class="text-primary text-h4 q-mb-xl">TDF Base</div>
    <q-form ref="myForm" :model="myForm" class="form">
      <div class="qr float-right cursor-pointer" @click="qrShow = !qrShow">
        <div class="qr__triangle"></div>
      </div>
      <div class="bg-white rounded-borders q-px-lg card">
        <q-card-section
          class="full-height flex column items-center justify-center"
          v-show="qrShow"
        >
          <div class="text-body1">请使用手机版TDF - 扫码登录</div>
          <qcode v-if="qrShow" :datasf2c="indexKey" :key="indexKey" />
          <!--<vue-qr-->
          <!--:text="qrcodeText"-->
          <!--:correctLevel="3"-->
          <!--:size="180"-->
          <!--:margin="0"-->
          <!--colorDark="black"-->
          <!--colorLight="white"-->
          <!--:logoSrc="require('../../assets/applogo.png')"-->
          <!--:logoMargin="4"-->
          <!--class="q-mt-xl"-->
          <!--&gt;</vue-qr>-->
          <q-btn
            class="full-width tdf-button-shadow"
            unelevated
            label="刷新"
            text-color="white"
            :style="{ background: themeColor }"
            @click="visibleQcode"
          ></q-btn>
          <div class="text-body2 q-mt-lg">打开 tdf App</div>
          <div class="text-body2">在「首页」页面顶部打开扫一扫</div>
          <div class="text-body2">如扫码异常请下载最新版客户端</div>
        </q-card-section>
        <q-card-section v-show="!qrShow">
          <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="loginOne" :label="$t('login.tab1')" />
            <q-tab name="loginTwo" :label="$t('login.tab2')" />
          </q-tabs>
          <q-tab-panels v-model="tab" animated class="q-mt-md">
            <q-tab-panel name="loginOne" class="tab__panel">
              <q-form ref="myForm" :model="myForm">
                <q-input
                  clearable
                  v-model="myForm.username"
                  :label="$t('login.username')"
                  :rules="[val => !!val || $t('login.usernameRules')]"
                >
                  <template v-slot:prepend>
                    <q-icon :size="usernameIconSize" :name="usernameIconName" />
                  </template>
                </q-input>
                <q-input
                  clearable
                  v-model="myForm.password"
                  :label="$t('login.password')"
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[val => !!val || $t('login.passwordRules')]"
                >
                  <template v-slot:prepend>
                    <q-icon :size="passwordIconSize" :name="passwordIconName" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      @click="isPwd = !isPwd"
                    ></q-icon>
                  </template>
                </q-input>
                <q-input
                  clearable
                  v-model="myForm.captchaCode"
                  :label="$t('login.captchaCode')"
                  :rules="[val => !!val || $t('login.captchaCodeRules')]"
                >
                  <template v-slot:prepend>
                    <q-icon :size="captchaIconSize" :name="captchaIconName" />
                  </template>
                  <template v-slot:append>
                    <random-code :value.sync="randomCode"></random-code>
                  </template>
                </q-input>
              </q-form>
            </q-tab-panel>
            <q-tab-panel name="loginTwo" class="tab__panel">
              <q-form ref="myForm2" :model="myForm2">
                <q-input
                  clearable
                  v-model="myForm2.phoneNumber"
                  :label="$t('login.phone')"
                  :rules="[val => !!val || $t('login.phoneRules')]"
                >
                  <template v-slot:prepend>
                    <q-icon :size="phoneIconSize" :name="phoneIconName" />
                  </template>
                </q-input>
                <q-input
                  clearable
                  v-model="myForm2.messageCode"
                  :label="$t('login.messageCode')"
                  :rules="[val => !!val || $t('login.messageCodeRules')]"
                >
                  <template v-slot:prepend>
                    <q-icon :size="messageIconSize" :name="messageIconName" />
                  </template>
                  <template v-slot:append>
                    <q-btn
                      style="width: 100px;"
                      unelevated
                      outline
                      dense
                      color="primary"
                      :label="code"
                      :disable="disabled"
                      @click="getMessageCode"
                    />
                  </template>
                </q-input>
                <q-input
                  clearable
                  v-model="myForm2.captchaCode"
                  :label="$t('login.captchaCode')"
                  :rules="[val => !!val || $t('login.captchaCodeRules')]"
                >
                  <template v-slot:prepend>
                    <q-icon :size="captchaIconSize" :name="captchaIconName" />
                  </template>
                  <template v-slot:append>
                    <random-code :value.sync="randomCode2"></random-code>
                  </template>
                </q-input>
              </q-form>
            </q-tab-panel>
          </q-tab-panels>
          <div class="flex items-center q-mt-sm" v-show="tab === 'loginOne'">
            <q-checkbox
              dense
              v-model="keep"
              :label="$t('login.remember')"
              @input="keepState"
            ></q-checkbox>
            <q-space></q-space>
            <div class="text-primary cursor-pointer" @click="forgotPassword">
              {{ $t("login.forget") }}
            </div>
          </div>
          <div class="flex items-center q-mt-sm" v-show="tab === 'loginTwo'">
            <q-space></q-space>
            <div class="text-primary cursor-pointer">
              {{ $t("login.messageCodeTip") }}
            </div>
          </div>
        </q-card-section>
        <q-card-actions v-show="!qrShow">
          <q-btn
            class="full-width tdf-button-shadow"
            unelevated
            :label="$t('login.login')"
            text-color="white"
            :style="{ background: themeColor }"
            @click="login"
          ></q-btn>
          <div class="flex q-mt-md items-center full-width">
            <div class="q-mr-md">{{ $t("login.other") }}</div>
            <q-btn
              color="warning"
              text-color="white"
              icon="title"
              dense
              round
              unelevated
              size="12px"
              class="q-mr-xs"
              @click="loginByTDFOS"
            />
            <q-icon
              name="qq"
              size="31px"
              class="q-mr-xs cursor-pointer"
              @click="loginByQQ"
            />
            <q-icon
              name="weixin"
              :size="$otherLoginIconSize"
              class="cursor-pointer"
              @click="loginByWEIXIN"
            />
            <q-space></q-space>
            <div class="self-end q-pb-xs">
              <span class="text-primary cursor-pointer" @click="register">
                {{ $t("login.register") }}
              </span>
            </div>
          </div>
        </q-card-actions>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import RandomCode from "../../components/randomcode/RandomCode";
import { colors } from "quasar";
import qcode from "./qcode/qcode";

export default {
  name: "ModelTwo",
  components: { RandomCode, qcode },
  props: {
    usernameIconName: {
      type: String,
      default: "person"
    },
    usernameIconSize: {
      type: String,
      default: "20px"
    },
    passwordIconName: {
      type: String,
      default: "lock"
    },
    passwordIconSize: {
      type: String,
      default: "20px"
    },
    captchaIconName: {
      type: String,
      default: "confirmation_number"
    },
    captchaIconSize: {
      type: String,
      default: "20px"
    },
    phoneIconName: {
      type: String,
      default: "phone"
    },
    phoneIconSize: {
      type: String,
      default: "20px"
    },
    messageIconName: {
      type: String,
      default: "chat_bubble"
    },
    messageIconSize: {
      type: String,
      default: "20px"
    }
  },
  comments: {
    RandomCode
  },
  data() {
    return {
      tab: "loginOne",
      qrShow: false,
      qrcodeText: "示例文字示例文字",
      myForm: {
        username: "admin",
        password: "admin",
        captchaCode: "",
        captchaKey: ""
      },
      myForm2: {
        phoneNumber: "",
        messageCode: "",
        captchaCode: "",
        captchaKey: ""
      },
      isPwd: true,
      randomCode: "",
      randomCode2: "",
      keep: false,
      themeColor: "",
      code: this.$t("login.getMessageCode"),
      disabled: false,
      time: null,
      indexKey: 0 // 只需要通过操作如点击事件改变这个值，child子组件就会刷新，而且视觉上不会有变化
    };
  },
  created() {
    const userInfo = this.$q.localStorage.getItem("userInfo");
    if (userInfo) {
      this.themeColor = userInfo.userMetadata
        ? "#" + userInfo.userMetadata
        : colors.getBrand("primary");
    } else {
      this.themeColor = colors.getBrand("primary");
    }
  },
  mounted() {
    const username = this.$q.localStorage.getItem("username");
    const password = this.$q.localStorage.getItem("password");
    const keepState = this.$q.localStorage.getItem("keepState");
    if (username) {
      this.myForm.username = username;
    }
    if (password) {
      this.myForm.password = password;
    }
    if (keepState === true) {
      this.keep = true;
    }
    this.myForm.captchaCode = this.randomCode;
    this.myForm2.captchaCode = this.randomCode2;
  },
  methods: {
    getMessageCode() {
      if (this.myForm2.phoneNumber === "") {
        this.$q.notify({
          type: "warning",
          message: "请先输入手机号码",
          position: "top"
        });
        return;
      }
      if (
        !/^1(3|4|5|7|8)\d{9}$/.test(this.myForm2.phoneNumber) ||
        this.myForm2.phoneNumber.length !== 11
      ) {
        this.$q.notify({
          type: "warning",
          message: "请输入正确的手机号码",
          position: "top"
        });
        return;
      }
      this.time = 60;
      this.timer();
    },
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.code = this.time + " s";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.code = this.$t("login.getMessageCode");
        this.disabled = false;
      }
    },
    keepState() {
      this.$emit("keepState", this.keep);
    },
    forgotPassword() {
      this.$router.push("/forgotpassword");
    },
    register() {
      this.$router.push("/register");
    },
    login() {
      console.log(this.tab);
      if (this.tab === "loginOne") {
        this.$refs.myForm.validate().then(success => {
          if (success) {
            this.$emit("login", this.myForm);
          } else {
            this.$q.notify({
              type: "warning",
              message: "请检查必填项",
              position: "top"
            });
          }
        });
      } else {
        this.$refs.myForm2.validate().then(success => {
          if (success) {
            this.$emit("login", this.myForm2);
          } else {
            this.$q.notify({
              type: "warning",
              message: "请检查必填项",
              position: "top"
            });
          }
        });
      }
    },
    loginByTDFOS() {
      this.$emit("loginByTDFOS");
    },
    loginByQQ() {
      this.$emit("loginByQQ");
    },
    loginByWEIXIN() {
      this.$emit("loginByWEIXIN");
    },
    visibleQcode() {
      this.indexKey = Math.random();
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  background: url("../../assets/login-bg.svg") no-repeat;
  background-size: 100% 100%;
}

.form {
  width: 350px;
}

.card {
  max-width: 350px;
  height: 460px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.qr {
  width: 40px;
  height: 40px;
  background: url("../../assets/login-qr.png");
  background-size: cover;
  z-index: 1000;

  .qr__triangle {
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-left: 40px solid white;
  }
}

.title {
  margin-top: -20px;
}

.tab__panel {
  padding: 0;
  overflow: hidden;
}
</style>

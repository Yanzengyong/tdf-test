<template>
  <q-page class="body">
    <div class="q-pl-lg q-pt-lg flex items-center cursor-pointer" @click="back">
      <q-icon name="arrow_back_ios" style="margin-bottom: 1px;" />
      <div class="text-grey">返回登录</div>
    </div>
    <div class="flex items-center justify-center column">
      <div class="text-primary text-h4 q-mt-md">TDF Base</div>
      <q-card
        class="q-pa-lg  rounded-borders bg-white card q-mt-lg column "
        flat
      >
        <q-tabs
          v-model="tab"
          class="q-mb-lg"
          active-color="primary"
          indicator-color="primary"
          narrow-indicator
        >
          <q-tab name="registerOne" label="账户密码" />
          <q-tab name="registerTwo" label="手机注册" />
          <q-tab name="registerThree" label="邮箱注册" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="q-mt-lg col">
          <q-tab-panel name="registerOne" class="tab__panel">
            <q-form ref="myFormOne" :model="myFormOne">
              <q-input
                clearable
                v-model="myFormOne.username"
                :label="usernameLable"
                :rules="[val => !!val || '请输入' + usernameLable]"
              >
                <template v-slot:prepend>
                  <q-icon :size="usernameIconSize" :name="usernameIconName" />
                </template>
              </q-input>
              <q-input
                clearable
                v-model="myFormOne.password"
                :label="passwordLable"
                :type="isPwd ? 'password' : 'text'"
                :rules="[val => !!val || '请输入' + passwordLable]"
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
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="registerTwo" class="tab__panel">
            <q-form ref="myFormTwo" :model="myFormTwo">
              <q-input
                clearable
                v-model="myFormTwo.phoneNumber"
                :label="phoneLable"
                :rules="[val => !!val || '请输入' + phoneLable]"
              >
                <template v-slot:prepend>
                  <q-icon :size="phoneIconSize" :name="phoneIconName" />
                </template>
              </q-input>
              <q-input
                clearable
                v-model="myFormTwo.messageCode"
                :label="messageLable"
                :rules="[val => !!val || '请输入' + messageLable]"
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
                    @click="getPhoneMessageCode"
                  />
                </template>
              </q-input>
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="registerThree" class="tab__panel">
            <q-form ref="myFormThree" :model="myFormThree">
              <q-input
                clearable
                v-model="myFormThree.emailNumber"
                :label="emailLable"
                :rules="[val => !!val || '请输入' + emailLable]"
              >
                <template v-slot:prepend>
                  <q-icon :size="emailIconSize" :name="emailIconName" />
                </template>
              </q-input>
              <q-input
                clearable
                v-model="myFormThree.messageCode"
                :label="messageLable"
                :rules="[val => !!val || '请输入' + messageLable]"
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
                    @click="getEmailMessageCode"
                  />
                </template>
              </q-input>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>

        <q-btn
          class="full-width tdf-button-shadow q-mt-md "
          unelevated
          label="提交"
          text-color="white"
          :style="{ background: themeColor }"
          @click="register"
        ></q-btn>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { colors } from "quasar";
import { checkPhone, checkEmail } from "../../utils/check.js";
import { getVerification, register } from "@/tdf/api/login";

export default {
  name: "Register",
  props: {
    emailLable: {
      type: String,
      default: "邮箱"
    },
    emailIconName: {
      type: String,
      default: "email"
    },
    emailIconSize: {
      type: String,
      default: "20px"
    },
    usernameLable: {
      type: String,
      default: "账户"
    },
    usernameIconName: {
      type: String,
      default: "person"
    },
    usernameIconSize: {
      type: String,
      default: "20px"
    },
    passwordLable: {
      type: String,
      default: "密码"
    },
    passwordIconName: {
      type: String,
      default: "lock"
    },
    passwordIconSize: {
      type: String,
      default: "20px"
    },
    phoneLable: {
      type: String,
      default: "手机号码"
    },
    phoneIconName: {
      type: String,
      default: "phone"
    },
    phoneIconSize: {
      type: String,
      default: "20px"
    },
    messageLable: {
      type: String,
      default: "验证码"
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
  data() {
    return {
      tab: "registerOne",
      myFormOne: {
        username: "",
        password: ""
      },
      myFormTwo: {
        phoneNumber: "",
        messageCode: ""
      },
      myFormThree: {
        emailNumber: "",
        messageCode: ""
      },
      isPwd: false,
      code: "获取验证码",
      disabled: false,
      time: null,
      themeColor: ""
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
  methods: {
    back() {
      this.$router.back();
    },

    getPhoneMessageCode() {
      if (this.myFormTwo.phoneNumber === "") {
        this.$q.notify({
          type: "warning",
          message: "请先输入手机号码",
          position: "top"
        });
        return;
      }
      if (
        !/^1(3|4|5|7|8)\d{9}$/.test(this.myFormTwo.phoneNumber) ||
        this.myFormTwo.phoneNumber.length !== 11
      ) {
        this.$q.notify({
          type: "warning",
          message: "请输入正确的手机号码",
          position: "top"
        });
        return;
      }
      this.getVerification();
      this.time = 60;
      this.timer();
    },
    getEmailMessageCode() {
      if (this.myFormThree.emailNumber === "") {
        this.$q.notify({
          type: "warning",
          message: "请先输入邮箱地址",
          position: "top"
        });
        return;
      }
      if (
        !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
          this.myFormThree.emailNumber
        )
      ) {
        this.$q.notify({
          type: "warning",
          message: "请输入正确的邮箱地址",
          position: "top"
        });
        return;
      }
      this.getVerification();
      this.time = 60;
      this.timer();
    },
    getVerification() {
      getVerification().then(res => {
        this.$q.notify({
          type: "info",
          message: "验证码为：" + res,
          position: "top"
        });
      });
    },
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.code = this.time + " 秒";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.code = "发送验证码";
        this.disabled = false;
      }
    },
    register() {
      switch (this.tab) {
        case "registerOne":
          this.$refs.myFormOne.validate().then(success => {
            if (success) {
              register(this.myFormOne).then(() => {
                this.$q.notify({
                  type: "info",
                  message: "注册成功",
                  position: "top"
                });
                this.$router.back();
              });
            } else {
              this.$q.notify({
                type: "warning",
                message: "请检查必填项",
                position: "top"
              });
            }
          });
        case "registerTwo":
          this.$refs.myFormTwo.validate().then(success => {
            if (success) {
              if (checkPhone(this.myFormTwo.phoneNumber)) {
                register(this.myFormTwo).then(() => {
                  this.$q.notify({
                    type: "info",
                    message: "注册成功",
                    position: "top"
                  });
                  this.$router.back();
                });
              } else {
                this.$q.notify({
                  type: "warning",
                  message: "请输入正确的手机地址",
                  position: "top"
                });
              }
            } else {
              this.$q.notify({
                type: "warning",
                message: "请检查必填项",
                position: "top"
              });
            }
          });
        case "registerThree":
          this.$refs.myFormThree.validate().then(success => {
            if (success) {
              if (checkEmail(this.myFormThree.emailNumber)) {
                register(this.myFormThree).then(() => {
                  this.$q.notify({
                    type: "info",
                    message: "注册成功",
                    position: "top"
                  });
                  this.$router.back();
                });
              } else {
                this.$q.notify({
                  type: "warning",
                  message: "请输入正确的邮箱地址",
                  position: "top"
                });
              }
            } else {
              this.$q.notify({
                type: "warning",
                message: "请检查必填项",
                position: "top"
              });
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  background-size: 100% 100%;
}
.card {
  width: 350px;
  height: 400px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%) !important;
}
</style>

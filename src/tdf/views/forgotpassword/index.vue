<template>
  <q-page class="body">
    <div class="q-pl-lg q-pt-lg flex items-center cursor-pointer" @click="back">
      <q-icon name="arrow_back_ios" style="margin-bottom: 1px;" />
      <div class="text-grey">返回登录</div>
    </div>
    <div class="flex items-center justify-center column">
      <div class="text-primary text-h4 q-mt-md">TDF Base</div>
      <q-card class="q-pa-lg bg-transparent card q-mt-lg" flat>
        <q-form ref="myForm" :model="myForm">
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            animated
            flat
            active-icon="o_edit"
            done-icon="o_check"
          >
            <q-step :name="1" prefix="1" title="" :done="step > 1">
              <div class="">
                <div class="text-subtitle1 text-grey q-mb-md">重置密码</div>
                <q-input
                  clearable
                  v-model="myForm.email"
                  :label="emailLable"
                  :rules="[val => !!val || '请输入' + emailLable]"
                >
                  <template v-slot:prepend>
                    <q-icon :size="emailIconSize" :name="emailIconName" />
                  </template>
                </q-input>
                <q-input
                  clearable
                  v-model="myForm.messageCode"
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
                      @click="getMessageCode"
                    />
                  </template>
                </q-input>
                <q-btn
                  class="full-width tdf-button-shadow q-mt-md"
                  unelevated
                  label="下一步"
                  text-color="white"
                  :style="{ background: themeColor }"
                  @click="forget"
                ></q-btn>
              </div>
            </q-step>

            <q-step :name="2" prefix="2" title="" :done="step > 2">
              <div class="row justify-center q-gutter-y-md">
                <q-input
                  clearable
                  v-model="myForm.passwordOne"
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
                <q-input
                  clearable
                  v-model="myForm.passwordTwo"
                  :label="passwordLableTwo"
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
                <q-btn
                  class="full-width tdf-button-shadow q-mt-md"
                  unelevated
                  label="重置"
                  text-color="white"
                  :style="{ background: themeColor }"
                  @click="reset"
                ></q-btn>
              </div>
            </q-step>
          </q-stepper>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { colors } from "quasar";
import {
  getVerification,
  checkVertification,
  changePassword
} from "@/tdf/api/login";

export default {
  name: "ForgetPassword",
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
    passwordLable: {
      type: String,
      default: "密码"
    },
    passwordLableTwo: {
      type: String,
      default: "再次输入密码"
    },
    passwordIconName: {
      type: String,
      default: "lock"
    },
    passwordIconSize: {
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
      step: 1,
      myForm: {
        phoneNum: "",
        passwordOne: "",
        passwordTwo: "",
        email: "",
        messageCode: ""
      },
      // newPasswordBody: {
      //   phoneNum: '',
      //   email: '',
      //   passwordOne: '',
      //   passwordTwo:''
      // },
      isPwd: true,
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
    getVerification() {
      getVerification().then(res => {
        this.$q.notify({
          type: "info",
          message: "验证码为：" + res,
          position: "top"
        });
      });
    },
    checkVertification() {
      return checkVertification(this.myForm.messageCode).then(res => {
        if (res) {
          this.$q.notify({
            type: "info",
            message: "验证通过",
            position: "top"
          });
          return true;
        } else {
          return false;
        }
      });
    },
    changePassword() {
      changePassword(this.myForm).then(() => {});
    },
    back() {
      this.$router.back();
    },
    getMessageCode() {
      if (this.myForm.email === "") {
        this.$q.notify({
          type: "negative",
          message: "请先输入邮箱",
          position: "top"
        });
        return;
      }
      if (
        !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
          this.myForm.email
        )
      ) {
        this.$q.notify({
          type: "negative",
          message: "请输入正确的邮箱",
          position: "top"
        });
        return;
      }
      this.getVerification();
      this.time = 60;
      this.timer();
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
    forget() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.checkVertification().then(res => {
            res ? this.$refs.stepper.next() : false;
          });
        } else {
          this.$q.notify({
            type: "negative",
            message: "请检查必填项",
            position: "top"
          });
        }
      });
    },
    reset() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          if (this.myForm.passwordOne === this.myForm.passwordTwo) {
            changePassword().then(() => {
              this.$q.notify({
                type: "info",
                message: "重置成功",
                position: "top"
              });
              this.$router.back();
            });
          } else {
            this.$q.notify({
              type: "negative",
              message: "请确保两次密码一致",
              position: "top"
            });
          }
        } else {
          this.$q.notify({
            type: "negative",
            message: "请检查必填项",
            position: "top"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 370px;
}
.q-stepper__header {
  display: none !important;
}
.q-stepper__header--standard-labels {
  display: none;
}
</style>

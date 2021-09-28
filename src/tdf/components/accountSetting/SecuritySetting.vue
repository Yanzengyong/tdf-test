<template>
  <div>
    <div class="row q-px-md">
      <div class="col-11">
        <p class="text-weight-light q-mb-xs">账户密码</p>
        <p class="text-grey">
          当前密码强度：{{ securitySetting.securityLevel }}
        </p>
      </div>
      <div class="col-1 flex justify-center items-center">
        <a
          class="text-light-blue-13"
          style="cursor:pointer"
          @click="showPassword = true"
          >修改
        </a>
      </div>
    </div>
    <q-separator inset />

    <q-dialog v-model="showPassword" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">修改密码</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            class="q-my-sm"
            outlined
            v-model="securityPasswordOld"
            label="输入旧密码"
            hide-bottom-space
            :type="isPwd ? 'password' : 'text'"
            placeholder="密码"
          />
          <q-input
            class="q-mb-sm q-mt-md"
            outlined
            v-model="securityPassword"
            label="输入新密码"
            hide-bottom-space
            :type="isPwd ? 'password' : 'text'"
            placeholder="密码"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确认" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="row q-px-md">
      <div class="col-11">
        <p class="text-weight-light q-mb-xs q-mt-md">密保手机</p>
        <p v-if="securitySetting.phone" class="text-grey">
          已绑定手机：{{ securitySetting.phone }}
        </p>
        <p v-else class="text-grey">
          未绑定手机
        </p>
      </div>
      <div class="col-1 flex justify-center items-center">
        <a
          class="text-light-blue-13"
          style="cursor:pointer"
          @click="showPhone = true"
          >修改</a
        >
      </div>
    </div>
    <q-separator inset />

    <q-dialog v-model="showPhone" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">设置手机号</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            class="q-my-sm"
            outlined
            :rules="[val => val.length == 11 || '请输入正确手机号码']"
            v-model="securitySetting.phone"
            label="输入手机号码"
            hide-bottom-space
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确认" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="row q-px-md">
      <div class="col-11">
        <p class="text-weight-light q-mb-xs q-mt-md">密保问题</p>
        <p v-if="securitySetting.questionNum" class="text-grey">
          已设置密保问题，设置数量：{{ securitySetting.questionNum }}
        </p>
        <p v-else class="text-grey">
          未设置密保问题，密保问题可有效保护账户安全
        </p>
      </div>
      <div class="col-1 flex justify-center items-center">
        <a class="text-light-blue-13" style="cursor:pointer">设置</a>
      </div>
    </div>
    <q-separator inset />

    <div class="row q-px-md">
      <div class="col-11">
        <p class="text-weight-light q-mb-xs q-mt-md">备用邮箱</p>
        <p v-if="securitySetting.backEmail" class="text-grey">
          已绑定邮箱：{{ securitySetting.backEmail }}
        </p>
        <p v-else class="text-grey">
          未绑定邮箱
        </p>
      </div>
      <div class="col-1 flex justify-center items-center">
        <a class="text-light-blue-13" style="cursor:pointer">修改</a>
      </div>
    </div>
    <q-separator inset />
    <div class="row q-px-md">
      <div class="col-11">
        <p class="text-weight-light q-mb-xs q-mt-md">MFA设备</p>
        <p v-if="securitySetting.otherEquipment" class="text-grey">
          已绑定MFA设备
        </p>
        <p v-else class="text-grey">未绑定MFAA设备</p>
      </div>
      <div class="col-1 flex justify-center items-center">
        <a class="text-light-blue-13" style="cursor:pointer">绑定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      securitySetting: {
        securityLevel: "弱",
        phone: "",
        questionNum: 0,
        backEmail: "",
        otherEquipment: 0
      },
      isPwd: true,
      showPassword: false,
      showPhone: false,
      securityPassword: "",
      securityPasswordOld: ""
    };
  },
  watch: {
    securityPassword() {
      if (this.securityPassword.length > 6) {
        this.securitySetting.securityLevel = "强";
      } else {
        this.securitySetting.securityLevel = "弱";
      }
    }
  }
};
</script>

<style></style>

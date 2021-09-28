<template>
  <q-form ref="myForm" class="row justify-left q-gutter-y-md">
    <div class="col-7">
      <div class="row">
        <form-lable requst lable="昵称" />
        <q-input
          class="col"
          v-model="myForm.name"
          :rules="[val => !!val || '请输入昵称']"
          hide-bottom-space
          placeholder="给自己起个名字"
          outlined
          dense
          clearable
        />
      </div>
    </div>
    <div class="col-7">
      <div class="row">
        <form-lable lable="Bio" />
        <q-input
          class="col"
          v-model="myForm.bio"
          type="textarea"
          placeholder="You are not alone"
          maxlength="255"
          outlined
          clearable
        />
      </div>
    </div>
    <div class="col-7">
      <div class="row">
        <form-lable lable="电子邮件" />
        <q-input
          class="col"
          v-model="myForm.mail"
          hide-bottom-space
          placeholder="exp@taiji.com.cn"
          outlined
          dense
          clearable
        />
      </div>
    </div>
    <div class="col-7">
      <div class="row">
        <form-lable lable="加密方式" />
        <q-select
          class="col"
          outlined
          dense
          hide-bottom-space
          v-model="myForm.passwordtype"
          :options="options"
        />
      </div>
    </div>
    <div class="col-7">
      <div class="row">
        <form-lable lable="登陆密码" />
        <q-input
          class="col"
          v-model="myForm.password"
          :type="isPwd ? 'password' : 'text'"
          placeholder="密码"
          outlined
          dense
          clearable
          hide-bottom-space
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="col-7">
      <div class="row justify-center q-mt-lg">
        <q-btn
          color="primary"
          unelevated
          :size="$btnSize"
          @click="queryHandler"
          label="提交"
        />
        <q-btn
          class="q-ml-md"
          color="info"
          unelevated
          outline
          :size="$btnSize"
          @click="queryHandler"
          label="保存"
        />
      </div>
    </div>
  </q-form>
</template>

<script>
import FormLable from "../formlable/FormLable";

export default {
  components: { FormLable },
  data() {
    return {
      isPwd: true,

      myForm: {
        title: "",
        date: "",
        describe: "",
        proportion: null,
        open: "",
        passeord: "",
        email: "",
        passwordtype: "",
        bio: "",
        name: ""
      }
    };
  },
  methods: {
    queryHandler() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$q.notify({
            type: "positive",
            message: "设置成功",
            position: "top"
          });
          console.log(JSON.stringify(this.myForm));
        } else {
          //
        }
      });
    }
  }
};
</script>

<style></style>

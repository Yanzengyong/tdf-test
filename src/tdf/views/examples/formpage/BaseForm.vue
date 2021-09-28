<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <q-form ref="myForm" class="row justify-center q-gutter-y-md">
            <div class="col-7">
              <div class="row">
                <form-lable requst lable="标题" />
                <q-input
                  class="col"
                  v-model="myForm.title"
                  :rules="[
                    val => !!val || '请输入标题',
                    val => val.length < 10 || '标题长度不能超过10'
                  ]"
                  hide-bottom-space
                  placeholder="请输入标题"
                  outlined
                  dense
                  clearable
                />
              </div>
            </div>
            <div class="col-7">
              <div class="row">
                <form-lable requst lable="手机号码" />
                <q-input
                  class="col"
                  v-model="myForm.phone"
                  :rules="[
                    val => !!val || '请输入手机号码',
                    val =>
                      (11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(val)) ||
                      '请输入正确的手机号码'
                  ]"
                  hide-bottom-space
                  placeholder="请输入手机号码"
                  outlined
                  dense
                  clearable
                />
              </div>
            </div>
            <div class="col-7">
              <div class="row">
                <form-lable requst lable="邮箱" />
                <q-input
                  class="col"
                  v-model="myForm.mail"
                  :rules="[
                    val => !!val || '请输入邮箱',
                    val =>
                      /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/.test(
                        val
                      ) || '请输入正确的邮箱'
                  ]"
                  hide-bottom-space
                  placeholder="请输入邮箱"
                  outlined
                  dense
                  clearable
                />
              </div>
            </div>
            <div class="col-7">
              <div class="row">
                <form-lable requst lable="起止日期" />
                <q-input
                  class="col"
                  v-model="myForm.date"
                  :rules="[val => !!val || '请选择起止日期']"
                  hide-bottom-space
                  placeholder="选择起止日期"
                  outlined
                  dense
                  clearable
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="dates" mask="YYYY-MM-DD" range>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="确定"
                              color="primary"
                              flat
                              @click="getDates()"
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="col-7">
              <div class="row">
                <form-lable lable="目标描述" />
                <q-input
                  class="col"
                  v-model="myForm.describe"
                  type="textarea"
                  placeholder="选择目标描述"
                  maxlength="255"
                  outlined
                  clearable
                />
              </div>
            </div>
            <div class="col-7">
              <div class="row">
                <form-lable lable="权重" />
                <q-input
                  class="col-3"
                  v-model.number="myForm.proportion"
                  :rules="[
                    val => (val >= 0.0 && val <= 100.0) || '权重在0~100之间'
                  ]"
                  hide-bottom-space
                  type="number"
                  outlined
                  dense
                  clearable
                />
                <div class="q-ml-sm flex items-center">%</div>
              </div>
            </div>
            <div class="col-7">
              <div class="row">
                <form-lable lable="目标公开" />
                <div class="flex items-center q-gutter-md">
                  <q-radio dense v-model="myForm.open" val="0" label="公开" />
                  <q-radio
                    dense
                    v-model="myForm.open"
                    val="1"
                    label="部分公开"
                  />
                  <q-radio dense v-model="myForm.open" val="2" label="不公开" />
                </div>
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
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import FormLable from "../../../components/formlable/FormLable";

export default {
  name: "BaseForm",
  components: { ScrollArea, FormLable },
  data() {
    return {
      myForm: {
        title: "",
        phone: "",
        mail: "",
        date: "",
        describe: "",
        proportion: null,
        open: "0"
      },
      dates: {}
    };
  },
  methods: {
    getDates() {
      console.log(JSON.stringify(this.dates));
      this.myForm.date = this.dates.from + "~" + this.dates.to;
    },
    queryHandler() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          console.log(JSON.stringify(this.myForm));
        } else {
          //
        }
      });
    }
  }
};
</script>

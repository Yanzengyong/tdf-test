<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            animated
            flat
            active-icon="o_edit"
            done-icon="o_check"
          >
            <q-step :name="1" prefix="1" title="填写转账信息" :done="step > 1">
              <q-form ref="myForm" class="row justify-center q-gutter-y-md">
                <div class="col-7">
                  <div class="row">
                    <form-lable requst lable="付款账户" />
                    <q-select
                      class="col"
                      v-model="myForm.receipt"
                      :rules="[val => !!val || '请选择付款账户']"
                      hide-bottom-space
                      transition-show="jump-up"
                      transition-hide="jump-up"
                      :options-dense="true"
                      outlined
                      dense
                      clearable
                      emit-value
                      map-options
                      :options="receiptOptions"
                    />
                  </div>
                </div>
                <div class="col-7">
                  <div class="row">
                    <form-lable requst lable="收款账户" />
                    <q-select
                      class="col-2"
                      v-model="myForm.payment"
                      :rules="[val => !!val || '请选择收款账户']"
                      hide-bottom-space
                      transition-show="jump-up"
                      transition-hide="jump-up"
                      :options-dense="true"
                      outlined
                      dense
                      emit-value
                      map-options
                      :options="paymentOptions"
                    />
                    <q-input
                      class="col"
                      v-model="myForm.pay"
                      :rules="[val => !!val || '请输入收款账户']"
                      hide-bottom-space
                      placeholder="请输入收款账户"
                      outlined
                      dense
                      clearable
                    />
                  </div>
                </div>
                <div class="col-7">
                  <div class="row">
                    <form-lable requst lable="收款人姓名" />
                    <q-input
                      class="col"
                      v-model="myForm.name"
                      :rules="[val => !!val || '请输入收款人姓名']"
                      hide-bottom-space
                      placeholder="请输入收款人姓名"
                      outlined
                      dense
                      clearable
                    />
                  </div>
                </div>
                <div class="col-7">
                  <div class="row">
                    <form-lable requst lable="转账金额" />
                    <q-input
                      class="col"
                      v-model.number="myForm.money"
                      type="number"
                      :rules="[val => !!val || '请输入转账金额']"
                      hide-bottom-space
                      placeholder="请输入转账金额"
                      prefix="$"
                      outlined
                      dense
                      clearable
                    />
                  </div>
                </div>
                <div class="col-7">
                  <div class="row q-mt-lg">
                    <form-lable />
                    <q-btn
                      color="primary"
                      unelevated
                      :size="$btnSize"
                      @click="queryHandler"
                      label="下一步"
                    />
                  </div>
                </div>
              </q-form>
            </q-step>

            <q-step :name="2" prefix="2" title="确认转账信息" :done="step > 2">
              <q-form ref="myForm" class="row justify-center q-gutter-y-md">
                <div class="col-7">
                  <div class="row">
                    <form-lable requst lable="付款账户" />
                    <q-input
                      class="col"
                      v-model="myForm.receipt"
                      standout
                      disable
                      dense
                    />
                  </div>
                </div>
                <div class="col-7">
                  <div class="row">
                    <form-lable requst lable="收款账户" />
                    <q-input
                      class="col"
                      v-model="myForm.pay"
                      standout
                      disable
                      dense
                    />
                  </div>
                </div>
                <div class="col-7">
                  <div class="row">
                    <form-lable requst lable="收款人姓名" />
                    <q-input
                      class="col"
                      v-model="myForm.name"
                      standout
                      disable
                      dense
                    />
                  </div>
                </div>
                <div class="col-7">
                  <div class="row">
                    <form-lable requst lable="转账金额" />
                    <q-input
                      class="col"
                      v-model="myForm.money"
                      standout
                      disable
                      dense
                    />
                  </div>
                </div>
                <div class="col-7">
                  <div class="row q-mt-lg">
                    <form-lable />
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
                      @click="$refs.stepper.previous()"
                      label="上一步"
                    />
                  </div>
                </div>
              </q-form>
            </q-step>

            <q-step :name="3" prefix="3" title="完成" :done="step === 3">
              <q-form
                ref="myForm"
                class="row justify-center column q-gutter-y-md"
              >
                <success-page />
                <div class="col-7">
                  <div class="row justify-center q-mt-lg">
                    <q-btn
                      color="primary"
                      unelevated
                      :size="$btnSize"
                      @click="resetHandler"
                      label="再转一笔"
                    />
                    <q-btn
                      class="q-ml-md"
                      color="info"
                      unelevated
                      outline
                      :size="$btnSize"
                      label="查看账单"
                    />
                  </div>
                </div>
              </q-form>
            </q-step>
          </q-stepper>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import FormLable from "../../../components/formlable/FormLable";
import SuccessPage from "../resultpage/SuccessPage";

export default {
  name: "BaseForm",
  components: { ScrollArea, FormLable, SuccessPage },
  data() {
    return {
      step: 1,
      myForm: {
        receipt: "0",
        payment: "1",
        pay: "创新研究院",
        name: "创新研究院",
        money: null
      },
      receiptOptions: [
        {
          label: "创新研究院",
          value: "0"
        }
      ],
      paymentOptions: [
        {
          label: "微信",
          value: "0"
        },
        {
          label: "微信",
          value: "1"
        }
      ],
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
          this.$refs.stepper.next();
        } else {
          //
        }
      });
    },
    resetHandler() {
      this.step = 1;
    }
  }
};
</script>

<template>
  <div>
    <q-form
      ref="myForm"
      :model="form"
      class="row justify-center q-gutter-y-md q-pa-lg"
    >
      <div class="col-12 col-md-11">
        <div class="row">
          <form-lable requst lable="课程名称"></form-lable>
          <q-input
            class="col"
            v-model="form.courseName"
            :rules="[val => !!val || '请输入课程名称']"
            hide-bottom-space
            outlined
            dense
            clearable
          ></q-input>
        </div>
      </div>
    </q-form>
    <q-separator></q-separator>
    <div class="col-12 q-pa-md">
      <div class="row justify-end items-center">
        <q-btn
          class="q-mr-lg"
          color="primary"
          unelevated
          :size="$btnSize"
          @click="save"
        >
          保存
        </q-btn>
        <q-btn color="info" unelevated outline :size="$btnSize" @click="cancel">
          取消
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import FormLable from "@componets/formlable/FormLable";

export default {
  name: "Add",
  components: { FormLable },
  data() {
    return {
      form: {
        id: null,
        courseName: "",
        state: "1",
        flag: 1,
        remark: ""
      }
    };
  },
  methods: {
    save() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit("addSave", this.form);
        } else {
          //
        }
      });
    },
    cancel() {
      this.$emit("addCancel");
    }
  }
};
</script>

<template>
  <div>
    <q-form ref="myForm" :model="form" class="row q-gutter-y-md q-pa-lg">
      <div class="col-12" v-if="datasf2c">
        <div class="row">
          <form-lable lable="上级部门"></form-lable>
          <q-input
            class="col"
            v-model="detail.parentName"
            standout
            dense
            disable
          ></q-input>
        </div>
      </div>
      <!-- <div class="col-12">
        <div class="row">
          <form-lable requst lable="部门类型"></form-lable>
          <q-select
            class="col col-md-4"
            v-model="form.deptType"
            :rules="[val => !!val || '请选择部门类型']"
            hide-bottom-space
            :options-dense="true"
            outlined
            dense
            clearable
            :options="allDeptTypes"
            option-label="name"
          ></q-select>
        </div>
      </div> -->
      <div class="col-12">
        <div class="row">
          <form-lable requst lable="部门名称"></form-lable>
          <q-input
            class="col"
            v-model="form.gradeName"
            :rules="[val => !!val || '请输入部门名称']"
            hide-bottom-space
            outlined
            dense
            clearable
          ></q-input>
        </div>
      </div>
      <!-- <div class="col-12">
        <div class="row">
          <form-lable requst lable="部门排序号"></form-lable>
          <q-input
            class="col"
            v-model="form.deptIndex"
            :rules="[
              val => !!val || '请输入部门排序号',
              val => !isNaN(val) || '排序号只能为数字',
              val => val < 1000000 || '数字长度超出限制，请输入6位以下数字'
            ]"
            hide-bottom-space
            outlined
            dense
            clearable
          ></q-input>
        </div>
      </div> -->
      <!-- <div class="col-12">
        <div class="row">
          <div class="tdf-label">部门备注</div>
          <q-input
            class="col"
            v-model="form.remark"
            maxlength="255"
            autogrow
            outlined
            clearable
          ></q-input>
        </div>
      </div> -->
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
import mixins from "./mixins.js";
import FormLable from "@componets/formlable/FormLable";

export default {
  name: "Add",
  components: { FormLable },
  mixins: [mixins],
  props: {
    datasf2c: {
      type: String,
      default: () => {}
    }
  },
  data() {
    return {
      detail: {},
      deptType: {},
      form: {
        id: null,
        gradeName: "",
        token: null,
        parentId: null,
        parentName: null,
        deptType: "",
        deptName: "",
        deptState: "1",
        flag: 1,
        deptIndex: null,
        remark: ""
      },
      allDeptTypes: []
    };
  },
  created() {
    this.queryAllDeptTypes();
  },
  methods: {
    setData(data) {
      this.detail.parentName = data.gradeName;
      if (this.datasf2c) {
        if (data.id) {
          this.form.parentId = data.id;
        }
      } else {
        this.form.parentId = null;
      }
    },
    save() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.form.deptType = this.form.deptType.name;
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

<template>
  <div>
    <q-form
      ref="myForm"
      :model="form"
      class="row justify-center q-gutter-y-md q-pa-lg"
    >
      <div class="col-12 col-md-10">
        <div class="row">
          <form-lable requst lable="员工姓名"></form-lable>
          <q-input
            class="col"
            v-model="form.studentName"
            :rules="[val => !!val || '请输入员工姓名']"
            hide-bottom-space
            outlined
            dense
            clearable
          ></q-input>
        </div>
      </div>
      <div class="col-12 col-md-10">
        <div class="row">
          <form-lable requst lable="员工部门"></form-lable>

          <q-tree
            class="col-5"
            ref="tree"
            :nodes="treeItems"
            label-key="gradeName"
            node-key="id"
            selected-color="primary"
            :selected.sync="selected"
            :disabled="disabled"
            :selectable="selectable"
          ></q-tree>

          <!-- <q-input
            class="col"
            v-model="form.studentClass"
            :rules="[(val) => !!val || '请选择学生班级']"
            hide-bottom-space
            outlined
            dense
            clearable
          ></q-input> -->
        </div>
      </div>
      <div class="col-12 col-md-10">
        <div class="row">
          <form-lable requst lable="员工性别"></form-lable>
          <q-select
            class="col"
            v-model="form.studentSex"
            transition-show="jump-up"
            transition-hide="jump-up"
            :options-dense="true"
            placeholder="请选择性别"
            outlined
            dense
            clearable
            emit-value
            map-options
            :options="allSexType"
            :rules="[val => !!val || '请选择员工性别']"
          ></q-select>
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
import * as GradeAPI from "@/demo/api/classGrade";
import * as DictionaryAPI from "tdf-ui-quasar/src/tdf-sys/api/system-management/dictionary";

import FormLable from "@componets/formlable/FormLable";

export default {
  name: "Add",
  components: { FormLable },
  data() {
    return {
      disabled: false,
      selectable: false,
      ticked: [],
      treeItems: [],
      form: {
        id: null,
        groupName: "",
        state: "1",
        flag: 1,
        groupIndex: null,
        classId: "",
        studentClass: "",
        remark: ""
      },
      options: [],
      selected: "",
      allSexType: [
        { value: "0", label: "女" },
        { value: "1", label: "男" }
      ]
    };
  },
  computed: {
    getSelect() {
      if (this.selected) {
        return this.$refs.tree.getNodeByKey(this.selected);
      } else {
        return "当前未选择年级";
      }
    }
  },
  watch: {
    ticked() {
      if (this.ticked.length > 0) {
        this.disabled = true;
        this.selectable = true;
      } else {
        this.disabled = false;
        this.selectable = false;
      }
    }
  },
  created() {
    this.queryAllTreeHandler();

    // const params = {
    //   filters: {},
    //   page: 1,
    //   pageSize: 10,
    //   sorts: []
    // };
    // params.filters["parentId"] = "c50aa804aa8000c9c474f930d794116e";
    // params.sorts = [{ fieldName: "codeIndex", direction: "desc" }];
    // DictionaryAPI.queryAllDictionaries(params).then(data => {
    //   this.allSexType = data.list;
    //   console.log(this.allSexType);
    //   this.allSexType.forEach(element => {
    //     this.options.push({
    //       label: element.name,
    //       value: element.id
    //     });
    //   });
    // });
  },
  methods: {
    save() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.form.classId = this.selected;
          this.form.studentClass = this.getSelect.gradeName;
          this.$emit("addSave", this.form);
        } else {
          //
        }
      });
    },
    queryAllTreeHandler() {
      GradeAPI.queryAllClassGrades({}).then(data => {
        this.treeItems = data;
      });
    },
    cancel() {
      this.$emit("addCancel");
    }
  }
};
</script>

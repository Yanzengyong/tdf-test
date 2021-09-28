<template>
  <div class="q-gutter-y-lg">
    <q-btn flat round icon="arrow_back" dense @click="cancel"></q-btn>
    <q-card class="tdf-box-shadow">
      <div class="tdf-title-body">
        <div class="q-ml-lg">课程信息</div>
        <q-space></q-space>
        <q-btn
          class="q-mr-lg"
          color="primary"
          unelevated
          :size="$btnSize"
          @click="save"
        >
          保存
        </q-btn>
      </div>
      <q-separator></q-separator>
      <q-card-section>
        <q-form
          ref="myForm"
          :model="form"
          class="row justify-center q-gutter-y-md q-pb-md"
        >
          <div class="col-12">
            <div class="row">
              <form-lable requst lable="课程名称"></form-lable>
              <q-input
                class="col"
                v-model="detail.courseName"
                :rules="[val => !!val || '请输入分组名称']"
                hide-bottom-space
                outlined
                dense
                clearable
              ></q-input>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import BaseEditForm from "@/tdf/views/common/mixins/BaseEditForm";
import BaseTable from "@componets/basetable/BaseTable";
import FormLable from "@componets/formlable/FormLable";

export default {
  name: "Details",
  mixins: [BaseEditForm],
  components: { FormLable, BaseTable },
  data() {
    return {
      detail: {},
      form: {
        id: null,
        courseName: "",
        state: "1",
        flag: 1,
        remark: ""
      },
      selection: "none",
      isVisibleColumns: ["courseName", "actions"],
      columns: [
        {
          name: "courseName",
          field: "courseName",
          label: "课程名字",
          align: "left",
          headerStyle: ""
        },
        {
          name: "actions",
          field: "actions",
          label: "操作",
          align: "center",
          headerStyle: "width: 100px;"
        }
      ],
      users: []
    };
  },
  methods: {
    setData(data) {
      console.log(data);
      this.detail = data;
    },
    save() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit("editSave", this.detail);
        } else {
          //
        }
      });
    },
    cancel() {
      this.$emit("editCancel");
    }
  }
};
</script>

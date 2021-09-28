<template>
  <div class="q-gutter-y-lg">
    <q-btn flat round icon="arrow_back" dense @click="cancel"></q-btn>
    <q-card class="tdf-box-shadow">
      <div class="tdf-title-body">
        <div class="q-ml-lg">课程信息</div>
        <q-space></q-space>
      </div>
      <q-separator></q-separator>
      <q-card-section>
        <q-form
          ref="myForm"
          :model="form"
          class="row justify-center q-gutter-y-md q-pb-md"
        >
          <div class="col-10">
            <div class="row">
              <form-lable lable="课程名称"></form-lable>
              <q-input
                class="col"
                v-model="detail.courseName"
                standout
                dense
                clearable
                disable
              ></q-input>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <q-table
          class="q-mt-md table"
          flat
          bordered
          separator="cell"
          hide-pagination
          row-key="id"
          :data="courses"
          :columns="columns"
          :pagination="pagination"
        >
          <template v-slot:no-data="{ message }">
            <div class="full-width flex justify-center">
              {{ message }}
            </div>
          </template>
          <template v-slot:body-cell-score="props">
            <q-td :props="props">
              <q-input
                borderless
                v-model="props.row.score"
                @blur="changeGrade(props.row)"
              >
              </q-input>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import * as courseAPI from "@/demo/api/course";
import * as studentAPI from "@/demo/api/student";

import BaseEditForm from "@/tdf/views/common/mixins/BaseEditForm";
import BaseTable from "@componets/basetable/BaseTable";
import FormLable from "@componets/formlable/FormLable";

export default {
  name: "Details",
  props: {
    detail: {
      id: "",
      courseName: ""
    }
  },
  mixins: [BaseEditForm],
  components: { FormLable, BaseTable },
  data() {
    return {
      form: {
        id: null,
        courseName: "",
        state: "1",
        flag: 1,
        remark: ""
      },
      selection: "none",
      columns: [
        {
          name: "studentName",
          field: "studentName",
          label: "学生姓名",
          align: "left",
          headerStyle: ""
        },
        {
          name: "courseName",
          field: "courseName",
          label: "课程名称",
          align: "left",
          headerStyle: ""
        },
        {
          name: "score",
          field: "score",
          label: "分数",
          align: "left",
          headerStyle: "width: 120px;"
        }
      ],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      courses: [],
      users: []
    };
  },
  methods: {
    // setData(data) {
    //   console.log('123123123', data)
    //   this.detail = data
    // },
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
    },
    changeGrade(val) {
      const params = {
        studentId: val.studentId,
        courseId: val.courseId,
        score: val.score,
        id: val.id
      };
      studentAPI.updateCourseStudent(params).then(data => {
        console.log("9999  " + data);
      });
    },
    queryAllCourseStudents() {
      const paramsCourse = {
        page: 1,
        pageSize: 100,
        filters: { courseId: this.detail.id },
        sorts: []
      };

      studentAPI.queryAllCourseStudents(paramsCourse).then(data => {
        this.courses = data.list;
        console.info("123131241234", this.detail, paramsCourse, this.courses);
      });
    }
  },
  mounted() {
    this.queryAllCourseStudents();
  }
};
</script>

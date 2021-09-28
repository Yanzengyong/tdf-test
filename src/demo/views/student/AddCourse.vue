<template>
  <div class="q-gutter-y-lg">
    <q-btn flat round icon="arrow_back" dense @click="cancel"></q-btn>
    <q-card class="tdf-box-shadow">
      <div class="tdf-title-body">
        <div class="q-ml-lg">学生选择课程</div>
        <q-space></q-space>
      </div>
      <q-separator></q-separator>
      <q-card-section>
        <q-form
          ref="myForm"
          :model="form"
          class="row justify-center q-gutter-y-md q-pb-md"
        >
          <div class="col-4">
            <div class="row">
              <form-lable lable="学生班级"></form-lable>
              <q-input
                class="col"
                v-model="detail.studentClass"
                standout
                dense
                clearable
                disable
              ></q-input>
            </div>
          </div>

          <div class="col-4">
            <div class="row">
              <form-lable lable="学生姓名"></form-lable>
              <q-input
                class="col"
                v-model="detail.studentName"
                standout
                dense
                clearable
                disable
              ></q-input>
            </div>
          </div>
          <div class="col-4">
            <div class="flex justify-center items-center">
              <q-btn outline color="primary" @click="showCourseDialog = true"
                >选择课程</q-btn
              >
            </div>
          </div>
          <q-dialog v-model="showCourseDialog" persistent>
            <q-card style="min-width: 350px">
              <q-table
                title="选择课程"
                :data="addOption.allCourses"
                :columns="courseColumns"
                :pagination="pagination"
                row-key="id"
                selection="multiple"
                :selected.sync="courseSelect"
              >
              </q-table>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="取消" v-close-popup />
                <q-btn
                  flat
                  label="确认"
                  v-close-popup
                  @click="addStudentCourseHandlerList()"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
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
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                v-if="props.row.studentId === detail.id"
                color="warning"
                :size="$btnSize"
                icon="o_delete"
                round
                dense
                flat
                @click="delHandler(props.row)"
              >
                <q-tooltip>
                  删除
                </q-tooltip>
              </q-btn>
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
import { colors } from "quasar";

export default {
  name: "Details",
  mixins: [BaseEditForm],
  components: { FormLable, BaseTable },
  props: {
    detail: {
      id: null,
      studentName: "",
      studentClass: ""
    }
  },
  created() {
    this.themeColor = colors.getBrand("primary");
  },
  activated() {
    this.themeColor = colors.getBrand("primary");
  },
  data() {
    return {
      themeColor: "",
      showCourseDialog: false,
      courseSelect: [],
      courses: [],
      addOption: {
        allCourses: [],
        courseId: null
      },
      form: {
        id: null,
        groupName: "",
        state: "1",
        flag: 1,
        groupIndex: null,
        remark: ""
      },
      selection: "none",
      isVisibleColumns: ["studentName", "courseName", "score", "actions"],
      courseColumns: [
        {
          name: "courseName",
          field: "courseName",
          label: "课程名称",
          align: "left",
          headerStyle: ""
        }
      ],
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
        },
        {
          name: "actions",
          field: "actions",
          label: "操作",
          align: "center",
          headerStyle: "width: 100px;"
        }
      ],
      users: [],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10
      }
    };
  },
  methods: {
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
    addStudentCourseHandlerList() {
      const studentCourses = [];

      this.courseSelect.forEach(element => {
        studentCourses.push({
          studentId: this.detail.id,
          courseId: element.id,
          score: 0
        });
      });
      studentAPI.addCourseStudent(studentCourses).then(data => {
        this.queryAllStudentCourses();
        this.addOption.courseId = null;
      });
    },
    addStudentCourseHandler(value) {
      if (!value && this.detail.id) return;
      const studentCourses = [];
      studentCourses.push({
        studentId: this.detail.id,
        courseId: value,
        score: 0
      });
      studentAPI.addCourseStudent(studentCourses).then(data => {
        this.queryAllStudentCourses();
        this.addOption.courseId = null;
      });
    },
    queryAllStudentCourses() {
      const paramsCourse = {
        page: 1,
        pageSize: 100,
        filters: { studentId: this.detail.id },
        sorts: []
      };
      studentAPI.queryAllCourseStudents(paramsCourse).then(data => {
        this.courseSelect = [];
        data.list.forEach(element => {
          this.courseSelect.push({ id: element.courseId });
        });
        this.courses = data.list;
      });
    },
    delHandler(row) {
      this.$q
        .dialog({
          title: "提示",
          message: "此操作将永久删除该项，并可能删除关联关系, 是否继续?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          const params = {
            studentId: row.studentId,
            courseId: row.courseId
          };
          studentAPI.delCourseStudent(params).then(data => {
            this.queryAllStudentCourses();
            this.optionSuccessHandler();
          });
        })
        .onCancel(() => {
          this.$q.notify({
            message: "已取消删除",
            type: "info",
            position: "top"
          });
        });
    }
  },
  mounted() {
    const params = {
      page: 1,
      pageSize: 100,
      filters: {},
      sorts: []
    };
    const paramsCourse = {
      page: 1,
      pageSize: 100,
      filters: { studentId: this.detail.id },
      sorts: []
    };
    courseAPI.queryPageCourses(params).then(data => {
      console.log("7777 " + data.list);
      this.addOption.allCourses = data.list;
    });
    studentAPI.queryAllCourseStudents(paramsCourse).then(data => {
      this.courseSelect = [];
      data.list.forEach(element => {
        this.courseSelect.push({ id: element.courseId });
      });
      this.courses = data.list;
    });
  }
};
</script>

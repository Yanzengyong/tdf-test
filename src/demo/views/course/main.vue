<template>
  <scroll-area>
    <q-page class="q-pa-md">
      <q-card class="q-py-sm tdf-box-shadow" v-show="page === 1">
        <q-card-section>
          <q-card class="q-pa-md tdf-box-shadow">
            <div class="row justify-between q-gutter-y-lg">
              <div class="col-12 col-md-4">
                <div class="row">
                  <div class="tdf-label">课程名字</div>
                  <q-input
                    class="col"
                    v-model="myForm.courseName"
                    placeholder="请输入登录ID"
                    outlined
                    dense
                    clearable
                  ></q-input>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="row justify-end q-mb-xs">
                  <q-btn
                    class="q-mr-md"
                    color="primary"
                    unelevated
                    :size="$btnSize"
                    @click="queryHandler"
                  >
                    <q-icon
                      :size="$btnIconSize"
                      class="q-mr-sm"
                      name="o_search"
                    ></q-icon>
                    查询
                  </q-btn>
                  <q-btn
                    class="q-mr-md"
                    color="info"
                    unelevated
                    outline
                    :size="$btnSize"
                    @click="resetHandler"
                  >
                    <q-icon
                      :size="$btnIconSize"
                      class="q-mr-sm"
                      name="o_refresh"
                    ></q-icon>
                    重置
                  </q-btn>
                </div>
              </div>
            </div>
          </q-card>
        </q-card-section>
        <q-card-section>
          <q-table
            class="q-mt-md table"
            flat
            bordered
            separator="cell"
            hide-pagination
            row-key="id"
            :data="courseList"
            :columns="columns"
            :pagination="pagination"
            :visible-columns="visibleColumns"
            selection="multiple"
            :selected.sync="selected"
          >
            <template v-slot:no-data="{ message }">
              <div class="full-width flex justify-center">
                {{ message }}
              </div>
            </template>
            <template v-slot:body-cell-studentSex="props">
              <q-td :props="props">
                {{
                  props.row.studentSex === null
                    ? ""
                    : props.row.studentSex === "0"
                    ? "女"
                    : "男"
                }}
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn
                  color="primary"
                  :size="$btnSize"
                  icon="o_class"
                  round
                  dense
                  flat
                  @click="editGrade(props)"
                >
                  <q-tooltip>
                    编辑课程
                  </q-tooltip>
                </q-btn>
                <q-btn
                  color="primary"
                  :size="$btnSize"
                  icon="o_edit"
                  round
                  dense
                  flat
                  @click="edit(props)"
                >
                  <q-tooltip>
                    编辑
                  </q-tooltip>
                </q-btn>
                <q-btn
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
            <template v-slot:top="props">
              <div v-if="userButtonShow">
                <q-btn
                  color="primary"
                  unelevated
                  :size="$btnSize"
                  @click="showAdd = true"
                >
                  <q-icon
                    :size="$btnIconSize"
                    class="q-mr-sm"
                    name="o_add"
                  ></q-icon>
                  新增
                </q-btn>
              </div>
              <q-space />
              <q-btn
                outline
                :size="$btnSize"
                color="primary"
                label="切换全屏"
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                class="q-mr-sm"
              />
              <q-btn-dropdown
                outline
                :size="$btnSize"
                color="primary"
                label="自选列"
                icon="list"
              >
                <q-list dense padding>
                  <q-item
                    style="height: 40px;"
                    v-show="showQuery"
                    tag="label"
                    v-for="item in columns"
                    :key="item.name"
                  >
                    <q-item-section avatar>
                      <q-checkbox
                        dense
                        v-model="visibleColumns"
                        :val="item.name"
                      />
                    </q-item-section>
                    <q-item-section style="margin-left: -25px;">
                      {{ item.label }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </template>
          </q-table>
          <pagination
            :pagination="pagination"
            :pages-number="pagesNumber"
            @changePage="changePage"
            @changeRowsPerPage="changeRowsPerPage"
          ></pagination>
        </q-card-section>
        <slot :item="selected" name="item"> </slot>
      </q-card>

      <q-dialog v-model="showAdd" persistent full-width>
        <q-card class="tdf-box-shadow">
          <div class="tdf-title-body">
            <div class="q-ml-lg text-subtitle1">新增</div>
            <q-space></q-space>
            <q-btn
              icon="close"
              class="q-mr-lg"
              flat
              round
              dense
              v-close-popup
            ></q-btn>
          </div>
          <q-separator></q-separator>
          <CourseAdd
            @addCancel="showAdd = false"
            @addSave="addSave"
          ></CourseAdd>
        </q-card>
      </q-dialog>

      <q-card class="q-py-sm tdf-box-shadow" v-show="page === 4">
        <q-card-section>
          <course-edit
            ref="setEdit"
            @editCancel="editCancel"
            @editSave="editSave"
          ></course-edit>
        </q-card-section>
      </q-card>
      <q-card class="q-py-sm tdf-box-shadow" v-if="page === 5">
        <q-card-section>
          <edit-grade
            :detail="gradeDetail"
            @editCancel="editCancel"
            @editSave="editSave"
          ></edit-grade>
        </q-card-section>
      </q-card>
    </q-page>
  </scroll-area>
</template>

<script>
import CourseAdd from "./Add";
import CourseEdit from "./Edit";
import EditGrade from "./EditGrade";
import * as courseApi from "@/demo/api/course";
import BaseQueryPageForm from "@/tdf/views/common/mixins/BaseQueryPageForm";
import ScrollArea from "@componets/scrollarea/ScrollArea";
import Pagination from "@componets/pagination/Pagination";

export default {
  name: "TdfUser",
  mixins: [BaseQueryPageForm],
  components: {
    Pagination,
    ScrollArea,
    CourseAdd,
    CourseEdit,
    EditGrade
  },
  props: {
    columns: {
      type: Array,
      default: () => [
        {
          name: "courseName",
          field: "courseName",
          label: "课程名称",
          align: "left",
          headerStyle: "",
          sortable: true
        },

        {
          name: "actions",
          field: "actions",
          label: "操作",
          align: "center",
          headerStyle: "width: 160px;"
        }
      ]
    }
  },
  data() {
    return {
      showQuery: true,
      myForm: {},
      gradeDetail: {},
      options: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "男",
          value: "1"
        },
        {
          label: "女",
          value: "0"
        }
      ],
      page: 1,
      pagesNumber: 100,
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      userButtonShow: true,
      visibleColumns: ["courseName", "actions"],
      selected: [],
      courseList: [],
      rowId: "",
      showAdd: false,
      courseListAll: [],
      opens: false
    };
  },
  created() {
    this.executeQueryPage();
    // 获取全部的courseList数据
  },
  methods: {
    changeRowsPerPage() {
      this.executeQueryPage();
    },
    setSelectedUser(data, userButtonShow) {
      // userButtonShow控制用户模块上方的按钮显示与否
      this.selected = data;
      this.userButtonShow = userButtonShow;
    },
    changePage() {
      this.executeQueryPage();
    },
    addSave(addData) {
      this.$q
        .dialog({
          title: "提示",
          message: "确定要保存吗?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          courseApi.add(addData).then(() => {
            this.showAdd = false;
            this.page = 1;
            this.executeQueryPage();
          });
        });
    },
    editSave(editData) {
      courseApi.update(editData).then(() => {
        this.$q.notify({
          type: "positive",
          message: "操作成功",
          position: "top"
        });
      });
    },
    addCancel() {
      this.page = 1;
    },
    editGrade(props) {
      this.gradeDetail = props.row;
      //this.$refs.setEditGrade.setData(this.selected[0])
      this.page = 5;
    },
    BatchEditCancle() {
      this.page = 1;
    },
    detail(props) {
      this.$nextTick(() => {
        this.$refs.setDetails.setData(props.row);
      });
      this.page = 3;
    },
    detailsCancel() {
      this.page = 1;
    },
    edit(props) {
      this.$refs.setEdit.setData(props.row);
      this.page = 4;
    },
    queryHandler() {
      this.executeQueryPage();
    },
    resetHandler() {
      this.myForm = {};
      this.executeQueryPage();
    },
    editCancel() {
      this.page = 1;
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
          var list = [];
          list.push(row.id);
          courseApi.deleteByIds(list).then(() => {
            this.executeQueryPage();
          });
        })
        .onCancel(() => {
          this.$q.notify({
            message: "已取消删除",
            type: "info",
            position: "top"
          });
        });
    },
    executeQueryPage() {
      const params = {
        filters: this.myForm,
        page: this.pagination.page,
        pageSize: this.pagination.rowsPerPage,
        sorts: [{ fieldName: "courseName", direction: "asc" }]
      };
      courseApi.queryPageCourses(params).then(data => {
        this.courseList = data.list;
        this.pagesNumber = data.total;
      });
    }
  }
};
</script>

<style scoped>
.table .scroll {
  overflow: hidden;
}
</style>

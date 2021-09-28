<template>
  <scroll-area>
    <q-page class="q-pa-md">
      <q-card class="q-py-sm tdf-box-shadow" v-show="page === 1">
        <q-card-section>
          <q-card class="q-pa-md tdf-box-shadow">
            <div class="row justify-between q-gutter-y-lg">
              <div class="col-12 col-md-4">
                <div class="row">
                  <div class="tdf-label">员工姓名</div>
                  <q-input
                    class="col"
                    v-model="myForm.studentName"
                    placeholder="请输入员工姓名"
                    outlined
                    dense
                    clearable
                  ></q-input>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="row">
                  <div class="tdf-label">用户部门</div>
                  <q-input
                    class="col"
                    v-model="myForm.studentClass"
                    placeholder="请输入用户部门"
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
            :data="studentList"
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
                {{ getSexsValue(props.row.studentSex) }}
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <!-- <q-btn
                  v-if="hasPerm('student/edit') || hasPerm('student/*')"
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
                </q-btn> -->
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
                <!-- <q-btn
                  v-if="hasPerm('student/delete') || hasPerm('student/*')"
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
                </q-btn> -->
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
          <student-add
            @addCancel="showAdd = false"
            @addSave="addSave"
          ></student-add>
        </q-card>
      </q-dialog>

      <q-card class="q-py-sm tdf-box-shadow" v-if="page === 4">
        <q-card-section>
          <student-edit
            :info="editInfo"
            @editCancel="editCancel"
            @editSave="editSave"
          ></student-edit>
          <!-- <student-edit
            ref="setEdit"
            @editCancel="editCancel"
            @editSave="editSave"
          ></student-edit> -->
        </q-card-section>
      </q-card>
      <q-card class="q-py-sm tdf-box-shadow" v-if="page === 5">
        <q-card-section>
          <add-course
            :detail="gradeDetail"
            @editCancel="editCancel"
          ></add-course>
        </q-card-section>
      </q-card>
    </q-page>
  </scroll-area>
</template>

<script>
import StudentAdd from "./Add";
import StudentEdit from "./Edit";
import AddCourse from "./AddCourse";
import * as studentApi from "@/demo/api/student";
import * as DictionaryAPI from "tdf-ui-quasar/src/tdf-sys/api/system-management/dictionary";

import BaseQueryPageForm from "@/tdf/views/common/mixins/BaseQueryPageForm";
import ScrollArea from "@componets/scrollarea/ScrollArea";
import Pagination from "@componets/pagination/Pagination";

export default {
  name: "TdfUser",
  mixins: [BaseQueryPageForm],
  components: {
    Pagination,
    ScrollArea,
    StudentAdd,
    AddCourse,
    StudentEdit
  },
  props: {
    columns: {
      type: Array,
      default: () => [
        {
          name: "studentName",
          field: "studentName",
          label: "员工姓名",
          align: "left",
          headerStyle: "",
          sortable: true
        },
        {
          name: "studentClass",
          field: "studentClass",
          label: "员工部门",
          align: "left",
          headerStyle: "",
          sortable: true
        },
        {
          name: "studentSex",
          field: "studentSex",
          label: "员工性别",
          align: "left",
          headerStyle: "width: 80px;",
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
      editInfo: {},
      gradeDetail: {},
      showQuery: true,
      myForm: {},
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
      sexs: [
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
      visibleColumns: ["studentName", "studentClass", "studentSex", "actions"],
      selected: [],
      studentList: [],
      rowId: "",
      showAdd: false,
      studentListAll: [],
      opens: false
    };
  },
  created() {
    this.executeQueryPage();
    // 获取全部的studentList数据

    //获取数据字典
    // const params = {
    //   filters: {},
    //   page: 1,
    //   pageSize: 10,
    //   sorts: []
    // };
    // params.filters["parentId"] = "c50aa804aa8000c9c474f930d794116e";
    // params.sorts = [{ fieldName: "codeIndex", direction: "desc" }];
    // DictionaryAPI.queryAllDictionaries(params)
    //   .then(data => {
    //     this.allSexType = data.list;
    //     console.log(this.allSexType);
    //     this.allSexType.forEach(element => {
    //       this.sexs.push({
    //         label: element.name,
    //         value: element.id
    //       });
    //     });
    //   })
    //   .then(this.executeQueryPage());
  },

  methods: {
    getSexsValue(value) {
      const sex = this.sexs.find(function(element) {
        return element.value == value;
      });
      if (sex) {
        return sex.label;
      } else {
        return "脏数据";
      }
    },
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
          studentApi.add(addData).then(() => {
            this.showAdd = false;
            this.page = 1;
            this.executeQueryPage();
          });
        });
    },
    editSave(editData) {
      studentApi.update(editData).then((data) => {
        if (data && data.code === 200) {
          this.$q.notify({
            type: "positive",
            message: "操作成功",
            position: "top"
          });
          this.page = 1
          this.executeQueryPage();
        }
      });
    },
    addCancel() {
      this.page = 1;
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
      // this.$refs.setEdit.setData(props.row);
      this.editInfo = props.row
      this.page = 4;
    },
    addCourse(props) {
      this.gradeDetail = props.row;
      this.page = 5;
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
          console.log('list', list)
          studentApi.deleteByIds(list).then((data) => {
            if (data && data.code === 200) {
              this.$q.notify({
                message: "删除成功", 
                type: "positive",
                position: "top"
              });
            }
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
        sorts: [{ fieldName: "studentName", direction: "asc" }]
      };
      studentApi.queryPageStudents(params).then(data => {
        console.log('data')
        this.studentList = data.list;
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

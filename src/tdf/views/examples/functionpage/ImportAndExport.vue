<template>
  <scroll-area>
    <q-page class="q-pa-md">
      <q-card class="q-py-sm tdf-box-shadow" v-show="page === 1">
        <q-card-section>
          <q-card class="q-pa-md tdf-box-shadow">
            <div class="row justify-between q-gutter-y-lg">
              <div class="col-12 col-md-4">
                <div class="row">
                  <div class="tdf-label">登录ID</div>
                  <q-input
                    class="col"
                    v-model="myForm.loginName"
                    placeholder="请输入登录ID"
                    outlined
                    dense
                    clearable
                  ></q-input>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="row">
                  <div class="tdf-label">姓名</div>
                  <q-input
                    class="col"
                    v-model="myForm.userName"
                    placeholder="请输入姓名"
                    outlined
                    dense
                    clearable
                  ></q-input>
                </div>
              </div>
              <div class="col-12 col-md-4" v-if="opens">
                <div class="row">
                  <div class="tdf-label">性别</div>
                  <q-select
                    class="col"
                    v-model="myForm.gender"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    :options-dense="true"
                    placeholder="请选择性别"
                    outlined
                    dense
                    clearable
                    emit-value
                    map-options
                    :options="options"
                  ></q-select>
                </div>
              </div>
              <div class="col-12 col-md-4" v-if="opens">
                <div class="row">
                  <div class="tdf-label">邮箱</div>
                  <q-input
                    class="col"
                    v-model="myForm.email"
                    placeholder="请输入邮箱"
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
                  <q-btn-dropdown
                    v-model="opens"
                    flat
                    :size="$btnSize"
                    color="primary"
                    persistent
                    :label="opens === false ? '展开' : '收起'"
                  ></q-btn-dropdown>
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
            :data="userList"
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
            <template v-slot:body-cell-gender="props">
              <q-td :props="props">
                {{
                  props.row.gender === null
                    ? ""
                    : props.row.gender === "0"
                    ? "女"
                    : "男"
                }}
              </q-td>
            </template>
            <template v-slot:body-cell-createdDate="props">
              <q-td :props="props">
                {{ props.row.createdDate | parseTime }}
              </q-td>
            </template>
            <template v-slot:top="props">
              <div>
                <q-btn
                  color="primary"
                  class="q-ml-sm"
                  unelevated
                  :size="$btnSize"
                  @click="exportExcel"
                >
                  <q-icon
                    :size="$btnIconSize"
                    class="q-mr-sm"
                    name="o_cloud_upload"
                  ></q-icon>
                  导出
                </q-btn>
                <q-btn
                  color="primary"
                  class="q-ml-sm"
                  unelevated
                  :size="$btnSize"
                  @click="showUpload = true"
                >
                  <q-icon
                    :size="$btnIconSize"
                    class="q-mr-sm"
                    name="o_cloud_download"
                  ></q-icon>
                  导入
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
      <q-dialog v-model="showUpload">
        <upload-excel> </upload-excel>
      </q-dialog>
    </q-page>
  </scroll-area>
</template>

<script>
import * as UserAPI from "../../../api/system-management/user";
import BaseQueryPageForm from "@/tdf/views/common/mixins/BaseQueryPageForm";
import { exportExcelAllField } from "@folder-outside-request/exportExcel";
import UploadExcel from "tdf-ui-quasar/src/tdf-sys/views/user/uploadExcel";
import ScrollArea from "@componets/scrollarea/ScrollArea";
import Pagination from "@componets/pagination/Pagination";

export default {
  name: "ImportAndExport",
  mixins: [BaseQueryPageForm],
  components: {
    Pagination,
    ScrollArea,
    UploadExcel
  },
  props: {
    columns: {
      type: Array,
      default: () => [
        {
          name: "loginName",
          field: "loginName",
          label: "登录ID",
          align: "left",
          headerStyle: "",
          sortable: true
        },
        {
          name: "userName",
          field: "userName",
          label: "姓名",
          align: "left",
          headerStyle: "",
          sortable: true
        },
        {
          name: "userIndex",
          field: "userIndex",
          label: "用户排序号",
          align: "left",
          headerStyle: "width: 80px;",
          sortable: true
        },
        {
          name: "gender",
          field: "gender",
          label: "性别",
          align: "left",
          headerStyle: "width: 80px;",
          sortable: true
        },
        {
          name: "email",
          field: "email",
          label: "邮箱",
          align: "left",
          headerStyle: "width: 160px;",
          sortable: true
        },
        {
          name: "phoneNum",
          field: "phoneNum",
          label: "电话",
          align: "left",
          headerStyle: "width: 160px;",
          sortable: true
        },
        {
          name: "createdDate",
          field: "createdDate",
          label: "创建时间",
          align: "left",
          headerStyle: "width: 160px;",
          sortable: true
        }
      ]
    }
  },
  data() {
    return {
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
      page: 1,
      pagesNumber: 100,
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsNumber: 10
      },
      visibleColumns: [
        "loginName",
        "userName",
        "userIndex",
        "gender",
        "email",
        "phoneNum",
        "createdDate",
        "actions"
      ],
      selected: [],
      userList: [],
      exportExcelName: "用户信息.xlsx",
      showUpload: false,
      opens: false
    };
  },
  created() {
    this.executeQueryPage();
  },
  methods: {
    changeRowsPerPage() {
      this.executeQueryPage();
    },
    changePage() {
      this.executeQueryPage();
    },
    queryHandler() {
      this.executeQueryPage();
    },
    resetHandler() {
      this.myForm = {};
      this.executeQueryPage();
    },
    executeQueryPage() {
      const params = {
        filters: this.myForm,
        page: this.pagination.page,
        pageSize: this.pagination.rowsNumber,
        sorts: [{ fieldName: "userIndex", direction: "asc" }]
      };
      UserAPI.queryPageUsers(params).then(data => {
        this.userList = data.list;
        this.pagesNumber = data.total;
      });
    },
    // 导出excel
    exportExcel() {
      if (this.selected.length === 0) {
        this.$q.notify({
          message: "未选择需要导出的用户",
          type: "negative",
          position: "top"
        });
      } else {
        var exportArr = [];
        exportArr = this.selected.map(v => {
          return {
            登陆ID: v.loginName,
            姓名: v.userName,
            性别: v.gender,
            邮箱: v.email,
            电话: v.phoneNum
          };
        });
        exportExcelAllField(this.exportExcelName, exportArr);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table .scroll {
  overflow: hidden;
}
</style>

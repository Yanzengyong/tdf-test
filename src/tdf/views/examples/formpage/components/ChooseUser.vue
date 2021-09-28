<template>
  <q-card class="tdf-box-shadow" style="width: 500px;">
    <div class="tdf-title-body">
      <div class="q-ml-lg text-subtitle1">根据部门选择用户</div>
      <q-space />
      <q-btn icon="close" class="q-mr-lg" flat round dense v-close-popup />
    </div>
    <q-separator />

    <q-splitter v-model="splitterModel" style="height: 360px">
      <template v-slot:before>
        <div class="q-pa-lg scroll">
          <q-input
            ref="filter"
            outlined
            dense
            v-model="filter"
            placeholder="输入关键字搜索"
          >
            <template v-slot:append>
              <q-icon
                v-if="filter !== ''"
                name="clear"
                class="cursor-pointer"
                @click="resetFilter"
              />
            </template>
          </q-input>
          <q-tree
            class="q-mt-md"
            ref="tree"
            :nodes="treeItems"
            :filter="filter"
            no-connectors
            default-expand-all
            label-key="deptName"
            node-key="id"
            selected-color="primary"
            :selected.sync="selected"
            @update:selected="getNode"
          />
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-lg">
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
                  />
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
                  />
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
                  />
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
                  />
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="row justify-end q-mb-xs">
                  <q-btn
                    class="q-mr-sm"
                    color="primary"
                    unelevated
                    size="12px"
                    @click="queryHandler"
                  >
                    <q-icon
                      :size="$btnIconSize"
                      class="q-mr-sm"
                      name="o_search"
                    />
                    查询
                  </q-btn>
                  <q-btn
                    class="q-mr-sm"
                    color="info"
                    unelevated
                    outline
                    size="12px"
                    @click="resetHandler"
                  >
                    <q-icon
                      :size="$btnIconSize"
                      class="q-mr-sm"
                      name="o_refresh"
                    />
                    重置
                  </q-btn>
                  <q-btn-dropdown
                    v-model="opens"
                    flat
                    size="12px"
                    color="primary"
                    persistent
                    :label="opens === false ? '展开' : '收起'"
                  />
                </div>
              </div>
            </div>
          </q-card>

          <q-table
            class="q-mt-md"
            flat
            bordered
            separator="cell"
            hide-pagination
            row-key="id"
            :data="userInfoByDept"
            :columns="columns"
            :pagination="pagination"
            selection="multiple"
            :selected.sync="selectedUser"
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
          </q-table>

          <pagination
            :pagination="pagination"
            :pages-number="pagesNumber"
            @changePage="changePage"
            @changeRowsPerPage="changeRowsPerPage"
          />
        </div>
      </template>
    </q-splitter>

    <q-separator />
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
  </q-card>
</template>

<script>
import * as DeptAPI from "../../../../api/system-management/dept";
import * as UserAPI from "../../../../api/system-management/user";
import Pagination from "../../../../components/pagination/Pagination";

export default {
  name: "ChooseDepartment",
  components: {
    Pagination
  },
  data() {
    return {
      splitterModel: 25,
      filter: "",
      treeItems: [],
      selected: "",
      page: 1,
      pagesNumber: 100,
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsNumber: 10
      },
      columns: [
        {
          name: "loginName",
          field: "loginName",
          label: "登录ID",
          align: "left",
          headerStyle: ""
        },
        {
          name: "userName",
          field: "userName",
          label: "姓名",
          align: "left",
          headerStyle: ""
        },
        {
          name: "gender",
          field: "gender",
          label: "性别",
          align: "left",
          headerStyle: ""
        },
        {
          name: "email",
          field: "email",
          label: "邮箱",
          align: "left",
          headerStyle: ""
        },
        {
          name: "phoneNum",
          field: "phoneNum",
          label: "电话",
          align: "left",
          headerStyle: ""
        }
      ],
      userInfoByDept: [],
      opens: false,
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
      selectedUser: []
    };
  },
  created() {
    // 初始化设置示例
    // 更多状态管理，可根据需求设置相关值
    const deptId = this.$q.localStorage.getItem("deptId");
    if (deptId) {
      this.selected = deptId;
      this.myForm.deptId = deptId;
      this.queryPageUsersByRole();
    }
    this.queryAllTreeHandler();
  },
  methods: {
    setData(userId) {
      this.selectedUser = userId;
    },
    queryAllTreeHandler() {
      DeptAPI.queryAllTreeDepts({}).then(data => {
        this.treeItems = data;
      });
    },
    resetFilter() {
      this.filter = "";
      this.$refs.filter.focus();
    },
    getNode(target) {
      // target是当前选中节点的id
      console.info(target);
      if (target) {
        this.myForm.deptId = target;
        this.$q.localStorage.set("deptId", target);
        this.queryPageUsersByRole();
      } else {
        this.userInfoByDept = [];
      }
    },
    queryPageUsersByRole() {
      this.userInfoByDept = [];
      const params = {
        filters: this.myForm,
        page: this.pagination.page,
        pageSize: this.pagination.rowsNumber,
        sorts: [{ fieldName: "userIndex", direction: "asc" }]
      };
      UserAPI.queryPageUsersByRole(params).then(data => {
        this.userInfoByDept = data.list;
        this.pagesNumber = data.total;
      });
    },
    queryHandler() {
      this.queryPageUsersByRole();
    },
    resetHandler() {
      this.myForm = {};
      this.queryPageUsersByRole();
    },
    changePage() {
      this.queryPageUsersByRole();
    },
    changeRowsPerPage() {
      this.queryPageUsersByRole();
    },
    save() {
      let userId = [];
      let user = [];
      if (this.selectedUser.length > 0) {
        for (let i = 0; i < this.selectedUser.length; i++) {
          userId.push(this.selectedUser[i].id);
          user.push(this.selectedUser[i].userName);
        }
      }
      this.$emit("userSave", userId, user, this.selectedUser);
    },
    cancel() {
      this.$emit("userCancel");
    }
  }
};
</script>

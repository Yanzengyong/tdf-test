<template>
  <scroll-area>
    <q-page class="q-pa-md">
      <q-card class="q-py-sm tdf-box-shadow">
        <q-card-section class="row q-gutter-y-md">
          <q-card flat class="col-12 col-md-4">
            <q-card-section>
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
              <q-btn-group flat class="q-mt-md">
                <q-btn
                  color="primary"
                  unelevated
                  :size="$btnSize"
                  @click="openDialog('add')"
                >
                  <q-icon
                    :size="$btnIconSize"
                    class="q-mr-sm"
                    name="o_add"
                  ></q-icon>
                  新增一级节点
                </q-btn>
                <q-btn
                  color="primary"
                  unelevated
                  :size="$btnSize"
                  @click="openDialog('addChils')"
                >
                  <q-icon
                    :size="$btnIconSize"
                    class="q-mr-sm"
                    name="o_add"
                  ></q-icon>
                  新增子节点
                </q-btn>
                <q-btn
                  color="primary"
                  unelevated
                  :size="$btnSize"
                  @click="delHandler"
                >
                  <q-icon
                    :size="$btnIconSize"
                    class="q-mr-sm"
                    name="o_highlight_off"
                  ></q-icon>
                  删除
                </q-btn>
              </q-btn-group>
              <q-tree
                class="q-mt-md"
                ref="tree"
                :nodes="treeItems"
                :filter="filter"
                label-key="gradeName"
                node-key="id"
                selected-color="primary"
                :selected.sync="selected"
                @update:selected="getNode"
              ></q-tree>
            </q-card-section>
          </q-card>
          <q-card flat class="col-12 col-md-8">
            <q-card-section>
              <q-card class="tdf-box-shadow">
                <div class="tdf-title-body">
                  <div class="q-ml-lg">年级信息</div>
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
                <q-form
                  ref="myForm"
                  :model="gradeInfo"
                  class="row q-gutter-y-xs q-pa-lg"
                >
                  <div class="col-12">
                    <div class="row">
                      <form-lable requst lable="ID"></form-lable>
                      <q-input
                        class="col"
                        v-model="gradeInfo.id"
                        :rules="[val => !!val]"
                        standout
                        dense
                        disable
                      ></q-input>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <form-lable requst lable="部门名称"></form-lable>
                      <q-input
                        class="col"
                        v-model="gradeInfo.gradeName"
                        :rules="[val => !!val || '请输入部门名称']"
                        outlined
                        dense
                        clearable
                      ></q-input>
                    </div>
                  </div>
                  <!-- <div class="col-12">
                    <div class="row">
                      <div class="tdf-label">备注</div>
                      <q-input
                        class="col"
                        v-model="gradeInfo.remark"
                        maxlength="255"
                        autogrow
                        outlined
                        clearable
                      ></q-input>
                    </div>
                  </div> -->
                </q-form>
              </q-card>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
      <q-dialog v-model="showAdd" persistent>
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
          <grade-add
            :datasf2c="f2cmsg4add"
            ref="setParentName"
            @addCancel="showAdd = false"
            @addSave="addSave"
          ></grade-add>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showAdd2" persistent full-width>
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
        </q-card>
      </q-dialog>
    </q-page>
  </scroll-area>
</template>

<script>
import * as GradeAPI from "@/demo/api/classGrade";
import GradeAdd from "./Add";
import mixins from "./mixins";
import BaseEditForm from "@/tdf/views/common/mixins/BaseEditForm";
import ScrollArea from "@/tdf/components/scrollarea/ScrollArea";
import FormLable from "@/tdf/components/formlable/FormLable";

export default {
  name: "TdfGrade",
  mixins: [mixins, BaseEditForm],
  components: {
    FormLable,
    ScrollArea,
    GradeAdd
  },
  data() {
    return {
      filter: "",
      selected: "",
      treeItems: [],
      gradeInfo: {},
      allGradeTypes: [],
      f2cmsg4add: null,
      showAdd: false,
      showAdd2: false,
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
        },
        {
          name: "actions",
          field: "actions",
          label: "操作",
          align: "center",
          headerStyle: ""
        }
      ],
      columnsUser: [
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
          name: "userIndex",
          field: "userIndex",
          label: "用户排序号",
          align: "left",
          headerStyle: "width: 100px;"
        },
        {
          name: "gender",
          field: "gender",
          label: "性别",
          align: "left",
          headerStyle: "width: 80px;"
        },
        {
          name: "email",
          field: "email",
          label: "邮箱",
          align: "left",
          headerStyle: "width: 160px;"
        },
        {
          name: "phoneNum",
          field: "phoneNum",
          label: "电话",
          align: "left",
          headerStyle: "width: 140px;"
        },
        {
          name: "createdDate",
          field: "createdDate",
          label: "创建时间",
          align: "left",
          headerStyle: "width: 140px;",
          sortable: true
        }
      ],
      userInfoByGrade: []
    };
  },
  created() {
    this.queryAllTreeHandler();
  },
  methods: {
    resetFilter() {
      this.filter = "";
      this.$refs.filter.focus();
    },
    getNode(target) {
      // target是当前选中节点的id
      console.info(target);
      // 获取点击节点的node值
      this.selected = target;
      console.info(this.$refs.tree.getNodeByKey(target));
      this.gradeInfo = this.$refs.tree.getNodeByKey(target);
      //  this.$nextTick(() => {
      //   this.gradeInfo = this.$refs.tree.getNodeByKey(target);
      // });
      // this.getParentGradeName(this.gradeInfo.id);
      // this.queryPageUsersByRole();
    },
    queryPageUsersByRole() {
      const params = {
        filters: { gradeId: this.selected },
        page: 1,
        pageSize: 10,
        sorts: []
      };
    },
    openDialog(type) {
      this.showAdd = true;
      if (type === "add") {
        this.f2cmsg4add = null;
      } else if (type === "addChils") {
        this.f2cmsg4add = "first";
        console.info(this.gradeInfo);
        // this.$refs.setParentName.setData(this.gradeInfo);
        this.$nextTick(() => {
          this.$refs.setParentName.setData(this.gradeInfo);
        });
      }
    },
    openUserDialog() {
      this.showAdd2 = true;
      console.info("this.userInfoByGrade");
      console.info(this.userInfoByGrade);
      if (this.userInfoByGrade.length > 0) {
        this.$nextTick(() => {
          var userButtonShow = false;
          this.$refs.userTable.setSelectedUser(
            this.userInfoByGrade,
            userButtonShow
          );
        });
      }
    },
    addSave(addData) {
      console.log('addData====', addData)
      GradeAPI.addGrade(addData).then(data => {
        this.$q.notify({
          type: "positive",
          message: "操作成功",
          position: "top"
        });
        this.showAdd = false;
        this.page = 1;
        this.queryAllTreeHandler();
      });
    },
    save() {
      this.gradeInfo.children = [];
      GradeAPI.editGrade(this.gradeInfo).then(data => {
        if (data && data.code === 200) {
          this.$q.notify({
            type: "positive",
            message: "保存成功",
            position: "top"
          });
        }
        this.queryAllTreeHandler();
      });
    },
    refresh() {},
    add() {},
    queryAllTreeHandler() {
      GradeAPI.queryAllClassGrades({}).then(data => {
        this.treeItems = data;
      });
    },
    delHandler() {
      this.$q
        .dialog({
          title: "提示",
          message: "此操作将永久删除该项，并可能删除关联关系, 是否继续?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          GradeAPI.delGrade(this.selected).then(() => {
            this.$q.notify({
              type: "positive",
              message: "删除成功",
              position: "top"
            });
            this.queryAllTreeHandler();
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
    deleteGradeUser(id) {
      console.info(id);
      var params = {
        userId: id,
        gradeId: this.selected
      };
      GradeAPI.delGrade(params).then(data => {
        // this.optionSuccessHandler()
        console.info(data);
        this.queryPageUsersByRole();
        this.optionSuccessHandler();
      });
    },
    refreshUser(data) {
      // data是用户窗口选中的值
      console.info(data);
      var userIds = [];
      data.forEach(item => {
        userIds.push(item.id);
      });
      var originUserList = [];
      this.userInfoByGrade.forEach(item => {
        originUserList.push(item.id);
      });
      var addIds = userIds.filter(v => !originUserList.includes(v));
      var delIds = originUserList.filter(v => !userIds.includes(v));
      const createDTOs = [];
      addIds.forEach(item => {
        const paramsAdd = {
          gradeId: this.selected,
          userId: item
        };
        createDTOs.push(paramsAdd);
      });
      const deleteDTOs = [];
      delIds.forEach(item => {
        const paramsDel = {
          gradeId: this.selected,
          userId: item
        };
        deleteDTOs.push(paramsDel);
      });
      const params = {
        createDTOs: createDTOs,
        deleteDTOs: deleteDTOs
      };
    }
  }
};
</script>

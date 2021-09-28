<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <q-splitter v-model="splitterModel">
            <template v-slot:before>
              <div class="q-pa-md">
                <q-form ref="myForm" class="row justify-center q-gutter-y-md">
                  <div class="col-12">
                    <div class="row">
                      <div class="tdf-label">性别</div>
                      <q-select
                        class="col"
                        v-model="myForm.gender"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        :options-dense="true"
                        outlined
                        dense
                        clearable
                        emit-value
                        map-options
                        :options="options1"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="tdf-label">地区</div>
                      <q-select
                        class="col"
                        v-model="myForm.address"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        :options-dense="true"
                        multiple
                        max-values="3"
                        outlined
                        dense
                        clearable
                        emit-value
                        map-options
                        :options="options2"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="tdf-label">省市县</div>
                      <q-select
                        class="col"
                        v-model="myForm.address2"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        :options-dense="true"
                        outlined
                        dense
                        clearable
                        emit-value
                        map-options
                      >
                        <choose-address
                          @getAddress="getAddress"
                          @resetAddress="resetAddress"
                        />
                      </q-select>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="tdf-label">爱好</div>
                      <q-select
                        class="col"
                        v-model="myForm.like"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        :options-dense="true"
                        outlined
                        dense
                        clearable
                        emit-value
                        map-options
                        :options="options3"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              暂无数据
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="tdf-label">选择部门</div>
                      <q-select
                        class="col"
                        v-model="myForm.dept"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        :options-dense="true"
                        multiple
                        hide-dropdown-icon
                        outlined
                        dense
                        clearable
                        emit-value
                        map-options
                        @click.native="chooseDepartment"
                        @clear="dept2 = []"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="tdf-label">选择用户</div>
                      <q-select
                        class="col"
                        v-model="myForm.user"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        :options-dense="true"
                        multiple
                        hide-dropdown-icon
                        outlined
                        dense
                        clearable
                        emit-value
                        map-options
                        @click.native="chooseUser"
                        @clear="user2 = []"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="tdf-label">选择用户2</div>
                      <q-select
                        class="col"
                        v-model="myForm.role"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        :options-dense="true"
                        multiple
                        hide-dropdown-icon
                        outlined
                        dense
                        clearable
                        emit-value
                        map-options
                        @click.native="chooseRole"
                        @clear="role2 = []"
                      />
                    </div>
                  </div>
                </q-form>
              </div>
            </template>

            <template v-slot:after>
              <div class="q-pa-md">
                <q-form ref="myForm" class="row justify-center q-gutter-y-md">
                  <div class="col-12">
                    <div class="row">
                      <form-lable lable="性别" />
                      <q-input
                        class="col"
                        v-model="myForm.gender"
                        standout
                        disable
                        dense
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <form-lable lable="地区（三项）" />
                      <q-input
                        class="col"
                        v-model="myForm.address"
                        standout
                        disable
                        dense
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <form-lable lable="省市县" />
                      <q-input
                        class="col"
                        v-model="myForm.address2"
                        standout
                        disable
                        dense
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <form-lable lable="爱好" />
                      <q-input
                        class="col"
                        v-model="myForm.like"
                        standout
                        disable
                        dense
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <form-lable lable="选择部门" />
                      <q-input
                        class="col"
                        v-model="dept2"
                        standout
                        disable
                        dense
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <form-lable lable="选择用户" />
                      <q-input
                        class="col"
                        v-model="user2"
                        standout
                        disable
                        dense
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <form-lable lable="选择用户2" />
                      <q-input
                        class="col"
                        v-model="role2"
                        standout
                        disable
                        dense
                      />
                    </div>
                  </div>
                </q-form>
              </div>
            </template>
          </q-splitter>
        </q-card-section>
      </q-card>
      <q-dialog v-model="showDepartment" persistent>
        <choose-dept @deptSave="deptSave" @deptCancel="deptCancel" />
      </q-dialog>
      <q-dialog v-model="showUser" persistent full-width>
        <choose-user
          ref="userDialog"
          @userSave="userSave"
          @userCancel="userCancel"
        />
      </q-dialog>
      <q-dialog v-model="showRole" persistent full-width>
        <choose-role
          ref="roleDialog"
          @roleSave="roleSave"
          @roleCancel="roleCancel"
        />
      </q-dialog>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import FormLable from "../../../components/formlable/FormLable";
import ChooseDept from "./components/ChooseDept";
import ChooseUser from "./components/ChooseUser";
import ChooseRole from "./components/ChooseRole";
import ChooseAddress from "./components/ChooseAddress";

export default {
  name: "Select",
  components: {
    ScrollArea,
    FormLable,
    ChooseDept,
    ChooseUser,
    ChooseRole,
    ChooseAddress
  },
  data() {
    return {
      splitterModel: 50,
      province: "",
      city: "",
      area: "",
      myForm: {
        gender: "",
        address: [],
        address2: [],
        like: "",
        dept: [],
        user: [],
        role: []
      },
      options1: [
        {
          label: "男",
          value: "1"
        },
        {
          label: "女",
          value: "0"
        }
      ],
      options2: ["北京", "天津", "河北", "山西", "山东"],
      options3: [],
      showDepartment: false,
      dept2: [],
      showUser: false,
      user2: [],
      selectedUser: [],
      showRole: false,
      role2: [],
      selectedRole: []
    };
  },
  methods: {
    // 选择省市县
    getAddress(v) {
      this.myForm.address2 = v;
    },
    resetAddress() {
      this.myForm.address2 = "";
    },
    // 选择部门
    chooseDepartment() {
      this.showDepartment = true;
    },
    deptSave(deptId, dept) {
      this.dept2 = deptId;
      this.myForm.dept = dept;
      this.showDepartment = false;
    },
    deptCancel() {
      this.showDepartment = false;
    },
    // 选择用户
    chooseUser() {
      this.showUser = true;
      this.$nextTick(() => {
        this.$refs.userDialog.setData(this.selectedUser);
      });
    },
    userSave(userId, user, selectedUser) {
      this.user2 = userId;
      this.myForm.user = user;
      this.selectedUser = selectedUser;
      this.showUser = false;
    },
    userCancel() {
      this.showUser = false;
    },
    // 选择角色
    chooseRole() {
      this.showRole = true;
      this.$nextTick(() => {
        this.$refs.roleDialog.setData(this.selectedRole);
      });
    },
    roleSave(roleId, role, selectedRole) {
      this.role2 = roleId;
      this.myForm.role = role;
      this.selectedRole = selectedRole;
      this.showRole = false;
    },
    roleCancel() {
      this.showRole = false;
    }
  }
};
</script>

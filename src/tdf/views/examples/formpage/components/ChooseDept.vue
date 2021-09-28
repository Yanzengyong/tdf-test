<template>
  <q-card class="tdf-box-shadow" style="width: 500px;">
    <div class="tdf-title-body">
      <div class="q-ml-lg text-subtitle1">选择部门</div>
      <q-space />
      <q-btn icon="close" class="q-mr-lg" flat round dense v-close-popup />
    </div>
    <q-separator />
    <div class="q-pa-lg scroll" style="height: 300px;">
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
        tick-strategy="strict"
        selected-color="primary"
        :ticked.sync="deptId"
      />
    </div>
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

export default {
  name: "ChooseDepartment",
  data() {
    return {
      filter: "",
      treeItems: [],
      deptId: []
    };
  },
  created() {
    this.queryAllTreeHandler();
  },
  methods: {
    queryAllTreeHandler() {
      DeptAPI.queryAllTreeDepts({}).then(data => {
        this.treeItems = data;
      });
    },
    resetFilter() {
      this.filter = "";
      this.$refs.filter.focus();
    },
    save() {
      let deptName = [];
      let tickedNodes = this.$refs.tree.getTickedNodes();
      if (tickedNodes.length > 0) {
        for (let i = 0; i < tickedNodes.length; i++) {
          deptName.push(tickedNodes[i].deptName);
        }
      }
      this.$emit("deptSave", this.deptId, deptName);
    },
    cancel() {
      this.$emit("deptCancel");
    }
  }
};
</script>

<template>
  <div class="row" style="height: 300px;">
    <div class="full-height scroll left col">
      <q-tree
        v-if="model === 'list'"
        ref="leftTree"
        :nodes="leftData"
        node-key="id"
        label-key="label"
        tick-strategy="leaf"
        :ticked.sync="leftTicked"
        @update:ticked="getLeftTicked"
      />
    </div>
    <div class="full-height row column justify-center items-center col-1">
      <q-btn
        color="primary"
        dense
        rounded
        :disable="leftTicked.length === 0"
        icon="o_chevron_right"
        @click="chooseLeft"
      />
      <q-btn
        color="primary"
        class="q-mt-md"
        dense
        rounded
        :disable="rightTicked.length === 0"
        icon="o_chevron_left"
        @click="chooseRight"
      />
    </div>
    <div class="full-height right col">
      <q-tree
        ref="rightTree"
        :nodes="rightData"
        node-key="id"
        label-key="label"
        tick-strategy="leaf"
        :ticked.sync="rightTicked"
        @update:ticked="getRightTicked"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTransfer",
  props: {
    model: {
      type: String,
      default: "list"
    },
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      leftData: [],
      leftTicked: [],

      rightData: [],
      rightTicked: []
    };
  },
  mounted() {
    if (this.model === "list") {
      if (this.value.length === 0) {
        // 右边没有传入值时
        this.leftData = JSON.parse(JSON.stringify(this.data));
      } else {
        this.rightData = this.value;
        this.getLeftData();
      }
    }
  },
  methods: {
    getLeftTicked() {
      console.log(JSON.stringify(this.leftTicked));
    },
    getRightTicked() {
      console.log(JSON.stringify(this.rightTicked));
    },
    chooseLeft() {
      if (this.leftTicked.length > 0) {
        this.leftTicked = [];
        let data = [];
        data = this.$refs.leftTree.getTickedNodes();
        // 过滤左边列表，去掉选中项
        for (let i = 0; i < data.length; i++) {
          this.rightData.push(data[i]);
          this.leftData.splice(this.leftData.indexOf(data[i]), 1);
        }

        this.$emit("getRightList", this.rightData);
      }
    },
    chooseRight() {
      if (this.rightTicked.length > 0) {
        this.rightTicked = [];
        let data = [];
        data = this.$refs.rightTree.getTickedNodes();
        // 过滤右边列表，去掉选中项
        for (let i = 0; i < data.length; i++) {
          this.rightData.splice(this.rightData.indexOf(data[i]), 1);
        }
        this.getLeftData();

        this.$emit("getRightList", this.rightData);
      }
    },
    getLeftData() {
      // 过滤左边列表，去掉右侧剩余项
      let list = JSON.parse(JSON.stringify(this.data));
      let rightList = JSON.parse(JSON.stringify(this.rightData));
      let listIndex = [];
      for (let i = 0; i < rightList.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (list[j].id === rightList[i].id) {
            listIndex.push(j);
          }
        }
      }
      for (let i = 0; i < listIndex.length; i++) {
        delete list[listIndex[i]];
      }
      let leftList = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i] !== undefined) {
          leftList.push(list[i]);
        }
      }
      console.log(JSON.stringify(leftList));
      this.leftData = [];
      this.leftData = leftList;
    }
  }
};
</script>

<style scoped>
.left {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px 20px;
}

.right {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px 20px;
}
</style>

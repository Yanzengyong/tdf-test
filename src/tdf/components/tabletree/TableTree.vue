<template>
  <q-tree
    ref="menusTree"
    :nodes="menusTree"
    :node-key="nodeKey"
    :label-key="labelKey"
    :tick-strategy="strategy"
    :disabled="disabled"
    :ticked.sync="ticked"
    :selected.sync="selected"
    :filter="filter"
    :filter-method="filterMethod"
    :no-connectors="connectors"
    selected-color="primary"
    @update:selected="getSelectedNode"
    @update:ticked="getTickedNode"
    @lazy-load="onLazyLoad"
  >
    <template slot="default-header" slot-scope="prop">
      <slot name="default-header" :prop="prop"></slot>
    </template>
  </q-tree>
</template>

<script>
export default {
  name: "TableTree",
  props: {
    menusTree: {
      type: Array,
      default: () => []
    },
    nodeKey: {
      type: String,
      default: "id"
    },
    labelKey: {
      type: String,
      default: "menuName"
    },
    strategy: {
      type: String,
      default: "leaf"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    connectors: {
      type: Boolean,
      default: true
    },
    filter: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      halfCheckedKeys: [],
      checkAllKeys: [],
      menusTreeChild: [],
      ticked: this.isTicked
    };
  },
  watch: {
    isTicked(val) {
      this.isTicked = val;
    }
  },
  methods: {
    getTickedNode(ticked) {
      this.$emit("getTickedNode", ticked);
    },
    getSelectedNode() {
      var selectedNode = this.$refs.menusTree.getNodeByKey(this.selected);
      this.$emit("getSelectedNode", this.selected, selectedNode);
    },
    filterMethod(node, filter) {
      this.$emit("filterMethod", node, filter);
    },
    setData(data) {
      console.info(data);
      this.ticked = data;
    },
    getSelected() {
      this.menusTree.forEach(item => {
        this.findChildrenSelected(item);
      });
      console.info("55555");
      // var ticked2 = [...new Set(this.ticked)];
      // var halfCheckedKeys2 = [...new Set(this.halfCheckedKeys)];
      // var checkAllKeys2 = [...new Set(this.checkAllKeys)];
      // console.info(ticked2);
      // console.info(halfCheckedKeys2);
      // console.info(checkAllKeys2);
      // const newArray = ticked2.concat(halfCheckedKeys2);
      // console.info(newArray);
      // 数组去重方法
      var tickedArr = [...new Set(this.ticked)];
      return tickedArr;
    },
    findChildrenSelected(item) {
      if (item.children && item.children.length > 0 && item.children !== null) {
        if (this.ticked.includes(item.id)) {
          this.ticked.splice(this.ticked.indexOf(item.id), 1);
        }
        item.children.forEach(item2 => {
          if (
            item2.children &&
            item2.children.length > 0 &&
            item2.children !== null
          ) {
            if (this.ticked.includes(item2.id)) {
              this.ticked.splice(this.ticked.indexOf(item2.id), 1);
            }
            item2.children.forEach(item3 => {
              if (this.ticked.includes(item3.id)) {
                this.ticked.push(item2.id);
                this.ticked.push(item.id);
              }
            });
          } else {
            if (this.ticked.includes(item2.id)) {
              this.ticked.push(item.id);
            }
          }
        });
      } else {
        if (this.ticked.includes(item.id)) {
          //
        }
      }
    },
    findChildrenSelected2(item) {
      if (this.ticked.includes(item.id)) {
        if (
          item.children &&
          item.children.length > 0 &&
          item.children !== null
        ) {
          item.children.forEach(item2 => {
            if (this.ticked.includes(item2.id)) {
              this.ticked.push(item.id);
              if (
                item2.children &&
                item2.children.length > 0 &&
                item2.children !== null
              ) {
                item2.children.forEach(item3 => {
                  if (this.ticked.includes(item3)) {
                    this.ticked.push(item2.id);
                  } else {
                    this.halfCheckedKeys.push(item2.id);
                    if (item2.children.length === 1) {
                      this.ticked.splice(this.ticked.indexOf(item2.id), 1);
                    }
                  }
                });
              }
            } else {
              this.halfCheckedKeys.push(item.id);
              if (item.children.length === 1) {
                this.ticked.splice(this.ticked.indexOf(item.id), 1);
              }
            }
          });
        } else {
          this.checkAllKeys.push(item.id);
        }
      }
    },
    // 数据字典懒加载部分
    onLazyLoad({ node, key, done }) {
      // call fail() if any error occurs
      this.$emit("onLazyLoad", { node, key, done });
    }
  }
};
</script>

<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <base-transfer
            ref="transfer"
            :data="listData"
            :value="rightList"
            @getRightList="getRightList"
          />
          <div class="q-mt-lg">右侧的值：{{ JSON.stringify(rightList) }}</div>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import BaseTransfer from "./components/BaseTransfer";

export default {
  name: "Transfer",
  components: {
    ScrollArea,
    BaseTransfer
  },
  data() {
    return {
      listData: [],
      rightList: []
    };
  },
  created() {
    this.initList();
  },
  methods: {
    initList() {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          id: `id${i}`,
          label: `示例项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      this.listData = data;

      // 右侧初始值测试
      this.rightList = [
        { id: "id1", label: "示例项 1", disabled: false },
        { id: "id2", label: "示例项 2", disabled: false },
        { id: "id4", label: "示例项 4", disabled: true }
      ];
    },
    getRightList(v) {
      this.rightList = v;
    }
  }
};
</script>

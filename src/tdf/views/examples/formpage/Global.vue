<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <div class="text-subtitle1 q-mb-lg">全局变量</div>
          <div class="row column items-start">
            <q-toggle
              v-model="allGrey"
              left-label
              label="全局灰度"
              @input="getAllGrey"
            />
            <q-toggle
              v-model="allTdf"
              left-label
              label="全局图片背景"
              @input="getAllTdf"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";

export default {
  name: "Global",
  components: {
    ScrollArea
  },
  data() {
    return {
      allGrey: this.$store.getters.getAllGrey, // 设置全局灰度，可用于灾难日、哀悼日等场景
      allTdf: this.$store.getters.getAllTdf // 设置全局Tdf图片背景示例
    };
  },
  methods: {
    getAllGrey(v) {
      console.log(v);
      this.$store.commit("SET_ALL_GREY", v);
      this.$q.sessionStorage.set("allGrey", v);
    },
    getAllTdf(v) {
      console.log(v);
      this.$store.commit("SET_ALL_TDF", v);
      this.$q.sessionStorage.set("allTdf", v);
    }
  }
};
</script>

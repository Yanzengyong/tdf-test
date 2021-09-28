<template>
  <div class="Echarts">
    <div id="small-lines" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
import * as BarEchartApi from "./data/barEcharts";
export default {
  name: "SmallLinesEcharts",

  mounted() {
    this.myEcharts();
  },
  // updated() {
  //   this.myEcharts()
  // },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      if (
        this.$mychart != null &&
        this.$mychart != "" &&
        this.$mychart != undefined
      ) {
        this.$mychart.dispose();
      }
      this.$mychart = this.$echarts.init(
        document.getElementById("small-lines")
      );
      // 使用刚指定的配置项和数据显示图表。
      // this.option = BarEchartApi.getBarEchartData()
      this.$mychart.setOption(BarEchartApi.getSmallLinesEcharts());
    }
  }
};
</script>

<style></style>

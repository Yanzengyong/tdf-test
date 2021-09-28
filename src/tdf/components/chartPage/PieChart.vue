<template>
  <div>
    <ve-pie :data="visitTrend.chartData" :settings="chartSettings" />
  </div>
</template>

<script>
import VePie from "v-charts/lib/line.common";
import chartData from "./data/barChartData";

export default {
  components: {
    VePie
  },
  props: {
    area: {
      type: Boolean,
      default: false
    },
    doubleY: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.visitTrend = chartData;
  },
  data() {
    return {
      visitTrend: {},
      chartSettings: {
        type: "pie",
        // xAxisType: 'time',
        metrics: "visitNum",
        dimension: "createDate"
      }
    };
  }
};
</script>

<style></style>

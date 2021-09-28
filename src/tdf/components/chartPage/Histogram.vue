<template>
  <div>
    <p v-show="showData">传入日期：{{ changeDate }}</p>
    <ve-line
      style="height:400px"
      :data="chartData"
      :settings="doubleY ? chartSettingsDoubleY : chartSettings"
    />
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import * as chartData from "./data/barChartData";

export default {
  components: {
    VeLine
  },
  props: {
    showData: {
      type: Boolean,
      default: true
    },
    section: {
      type: String,
      default: "2021-06-19~2021-07-19"
    },
    area: {
      type: Boolean,
      default: false
    },
    doubleY: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    changeDate() {
      if (this.section == "2021-07-12~2021-07-19") {
        this.chartData = chartData.getWeekData();
      }
      if (this.section == "2021-06-19~2021-07-19") {
        this.chartData = chartData.getMonthData();
      }
      if (this.section == "2021-04-20~2021-07-19") {
        this.chartData = chartData.getQuater();
      }
      if (this.section == "2020-07-19~2021-07-19") {
        this.chartData = chartData.getYear();
      }
      if (this.doubleY) {
        this.chartData = this.chartDataDoubleY;
      }
      return this.section;
    }
  },
  created() {
    if (this.section == "2021-07-12~2021-07-19") {
      this.chartData = chartData.getWeekData();
    }
    if (this.section == "2021-06-19~2021-07-19") {
      this.chartData = chartData.getMonthData();
    }
    if (this.section == "2021-04-20~2021-07-19") {
      this.chartData = chartData.getQuater();
    }
    if (this.section == "2020-07-19~2021-07-19") {
      this.chartData = chartData.getYear();
    }
    if (this.doubleY) {
      this.chartData = this.chartDataDoubleY;
    }
  },
  data() {
    return {
      chartData: {},
      chartSettings: {
        area: this.area,
        // xAxisType: 'time',
        metrics: ["visitNum"],
        dimension: ["createDate"]
      },
      chartSettingsDoubleY: {
        yAxisType: ["0.[00]a", "0.[00]%"],
        axisSite: {
          right: ["下单率"]
        },
        yAxisName: ["数值轴", "比率轴"]
      },
      chartDataDoubleY: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  }
};
</script>

<style></style>

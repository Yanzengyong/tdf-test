<template>
  <div class="Echarts">
    <p>当前状态：主题：{{ getDarkStatus }} {{ getBackGround }}</p>
    <div id="bar" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
import * as BarEchartApi from "./data/barEcharts";
export default {
  name: "Echarts",
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    showBackground: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "#000000"
    }
  },
  data() {
    return {
      option: {}
    };
  },
  computed: {
    getDarkStatus: {
      get() {
        this.$nextTick(() => {
          this.myEcharts();
        });
        return this.dark ? "深色" : "浅色";
      }
    },
    getBackGround: {
      get() {
        this.$nextTick(() => {
          this.myEcharts();
        });
        return this.showBackground ? "有背景" : "无背景";
      }
    }
  },
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
        document.getElementById("bar"),
        this.dark ? "dark" : ""
      );
      // 使用刚指定的配置项和数据显示图表。
      // this.option = BarEchartApi.getBarEchartData()
      this.showBackground
        ? (this.option = BarEchartApi.getBarEchartDataWithBackground(
            this.backgroundColor
          ))
        : (this.option = BarEchartApi.getBarEchartData());

      this.$mychart.setOption(this.option);
    }
  },
  mounted() {
    this.myEcharts();
  },
  destroyed() {
    if (
      this.$mychart != null &&
      this.$mychart != "" &&
      this.$mychart != undefined
    ) {
      this.$mychart.dispose();
    }
  }
};
</script>

<style></style>

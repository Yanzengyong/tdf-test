<template>
  <div class="Echarts">
    <div id="radius" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
import * as RadiusEchartApi from "./data/radiusEcharts";
export default {
  name: "RadiusEcharts",
  mounted() {
    this.myEcharts();
  },
  props: {
    api: {
      type: String,
      default: "default"
    }
  },
  methods: {
    myEcharts() {
      if (
        this.$mychart != null &&
        this.$mychart != "" &&
        this.$mychart != undefined
      ) {
        this.$mychart.dispose();
      }

      this.$mychart = this.$echarts.init(document.getElementById("radius"));
      if (this.api === "default") {
        this.$mychart.setOption(RadiusEchartApi.getRadiusEchartData());
      } else if (this.api === "archives") {
        this.$mychart.setOption(RadiusEchartApi.getArchivesRadiusEchartData());
      }
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

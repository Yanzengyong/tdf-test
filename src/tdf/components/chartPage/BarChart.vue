<template>
  <div>
    <ve-bar
      style="width:200px"
      :height="'9.5vh'"
      :extend="extend"
      :settings="chartSettings"
      :judge-height="true"
      :data="chartData"
    ></ve-bar>
  </div>
</template>

<script>
import VeBar from "v-charts/lib/line.common";

export default {
  components: {
    VeBar
  },
  data() {
    return {
      extend: {
        color: ["#FCAE00", "#2D7EFD"], //胶囊图的颜色
        legend: {
          itemWidth: 8,
          itemHeight: 8,
          show: true,
          textStyle: {
            color: "#FFFFFF"
          },
          fontSize: 8,
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 15, 0] //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
        },
        "series.0.itemStyle": {
          normal: {
            barBorderRadius: [10, 0, 0, 10] //两头扁圆形状
          }
        },
        "series.1.itemStyle": {
          normal: {
            barBorderRadius: [0, 10, 10, 0] //两头扁圆形状
          }
        },
        series: {
          barGap: 0,
          symbol: "none",
          smooth: false,
          barWidth: 16
        },

        grid: {
          top: "5%",
          bootom: "5%",
          left: "15%",
          right: "5%",
          height: "80%"
        },
        xAxis: {
          show: false, //隐藏掉横坐标
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            color: "#fff"
          },
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          axisLine: {
            show: false, //隐藏掉纵坐标
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            color: "rgba(45, 126, 253, 1)",
            fontSize: 10,
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "#FFFFFF",
              opacity: 0.2
            }
          }
        }
      },
      chartSettings: {
        stack: {
          得得得: ["男性", "女性"]
        }
      },
      chartData: {
        columns: ["类型", "男性", "女性"],
        rows: [
          {
            类型: "常住居民",
            男性: 393,
            女性: 93
          }
        ]
      }
    };
  }
};
</script>

<style></style>

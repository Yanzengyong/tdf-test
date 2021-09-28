<template>
  <div>
    <ve-ring
      :data="contract_rate.data"
      :settings="contract_rate.settings.settings"
      :extend="contract_rate.settings.extend"
      height="200px"
      :colors="['#F8777A', '#FCB954', '#3A9DFF']"
    ></ve-ring>
  </div>
</template>

<script>
import VeRing from "v-charts/lib/line.common";
import chartData from "./data/barChartData";

export default {
  components: {
    VeRing
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
      contract_rate: {
        settings: {
          settings: {
            radius: [5, 65],
            offsetY: "50%"
          },
          extend: {
            legend: {
              orient: "vertical",
              top: 100,
              left: 0
            },
            series: series => {
              series.push({
                radius: ["67%", "69%"],
                type: "pie",
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                animation: false,
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: "#3A9DFF"
                  }
                },
                data: [
                  {
                    value: 1
                  }
                ]
              });
              series.push({
                radius: ["3%", "5%"],
                type: "pie",
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                animation: false,
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: "#3A9DFF"
                  }
                },
                data: [
                  {
                    value: 1
                  }
                ]
              });
              return series;
            }
          }
        },
        data: {
          columns: ["类型", "数量"],
          rows: [
            { 类型: "资源", 数量: 54 },
            { 类型: "运维", 数量: 23 },
            { 类型: "安全", 数量: 23 }
          ],
          labelLine: {
            // 指示线状态
            show: true,
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        }
      }
    };
  }
};
</script>

<style></style>

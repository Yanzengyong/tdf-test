<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <q-tabs v-model="tab" inline-label indicator-color="primary">
            <q-tab name="barEcharts" label="柱状图" />
            <q-tab name="histogram" label="线型图" />
            <q-tab name="area" label="面积图" />
            <q-tab name="doubleY" label="双y轴" />

            <q-tab name="pieChart" label="饼图" />
            <q-tab name="schedule" label="进度条" />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="histogram">
              <div class="text-subtitle1  q-mb-md ">柱状图</div>
              <histogram />
            </q-tab-panel>

            <q-tab-panel name="area">
              <div class="text-subtitle1  q-mb-md q-px-md">面积图</div>
              <histogram area></histogram>
            </q-tab-panel>

            <q-tab-panel name="doubleY">
              <div class="text-subtitle1  q-mb-md q-px-md">双y轴</div>
              <histogram doubleY></histogram>
            </q-tab-panel>
            <q-tab-panel name="pieChart">
              <div class="text-subtitle1  q-mb-md q-px-md">饼图</div>
              <RadiusEcharts />
            </q-tab-panel>
            <q-tab-panel name="radarMap">
              <div class="text-subtitle1  q-mb-md q-px-md">雷达图</div>
              <!-- <bar-chart></bar-chart> -->
            </q-tab-panel>
            <q-tab-panel name="echarts">
              <div class="text-subtitle1  q-mb-md q-px-md">雷达图</div>
              <!-- <bar-chart></bar-chart> -->
            </q-tab-panel>
            <q-tab-panel name="barEcharts">
              <div class="text-subtitle1  q-mb-md q-px-md">柱状图</div>
              <!-- <bar-chart></bar-chart> -->
              <q-toggle v-model="barEchartDark" color="write" label="深色" />
              <q-toggle
                v-model="barEchartBackground"
                color="write"
                label="背景"
              />
              <bar-echarts
                class="darktrue"
                :dark="barEchartDark"
                :showBackground="barEchartBackground"
                backgroundColor="rgba(180, 180, 180, 0.2)"
              />
            </q-tab-panel>
            <q-tab-panel name="schedule">
              <div class="text-subtitle1  q-mb-md q-px-md">进度条</div>
              <schedule />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import Schedule from "../../../components/chartPage/Schedule";
import Histogram from "../../../components/chartPage/Histogram";
import BarEcharts from "../../../components/chartPage/BarEcharts";
import RadiusEcharts from "../../../components/chartPage/RadiusEcharts";

export default {
  name: "SettingPage",
  components: {
    ScrollArea,
    Schedule,
    Histogram,
    BarEcharts,
    RadiusEcharts
  },
  data() {
    return {
      barEchartBackground: false,
      barEchartDark: false,
      tab: "histogram",
      splitterModel: 20
    };
  }
};
</script>

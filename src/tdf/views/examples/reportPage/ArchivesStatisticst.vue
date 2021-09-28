<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <q-tabs v-model="tab" inline-label indicator-color="primary">
            <q-tab name="barEcharts" label="柱状图" />
            <q-tab name="pieChart" label="饼图" />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="pieChart">
              <div class="text-subtitle1  q-mb-md q-px-md">饼图</div>
              <radius-echarts api="archives"></radius-echarts>
              <RadiusEcharts />
            </q-tab-panel>

            <q-tab-panel name="barEcharts">
              <div class="text-subtitle1  q-mb-md">折线图</div>

              <q-btn-group outline class="q-mb-md">
                <q-btn
                  outline
                  color="primary"
                  label="上一周"
                  @click="section = '2021-07-12~2021-07-19'"
                />
                <q-btn
                  outline
                  color="primary"
                  label="上一月"
                  @click="section = '2021-06-19~2021-07-19'"
                />
                <q-btn
                  outline
                  color="primary"
                  label="上一季度"
                  @click="section = '2021-04-20~2021-07-19'"
                />
                <q-btn
                  outline
                  color="primary"
                  label="去年"
                  @click="section = '2020-07-19~2021-07-19'"
                />
              </q-btn-group>
              <Histogram :section="section" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import RadiusEcharts from "../../../components/chartPage/RadiusEcharts";
import Histogram from "../../../components/chartPage/Histogram";

export default {
  name: "SettingPage",
  components: {
    RadiusEcharts,
    ScrollArea,
    Histogram
  },
  data() {
    return {
      section: "2021-06-19~2021-07-19",
      barEchartBackground: false,
      barEchartDark: false,
      tab: "barEcharts",
      splitterModel: 20
    };
  }
};
</script>

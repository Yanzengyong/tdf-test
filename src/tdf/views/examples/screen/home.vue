<template>
  <ScrollArea>
    <q-page class="q-pb-md">
      <div class="q-pa-md">
        <div class="row q-col-gutter-x-md">
          <div class="col-3">
            <q-card flat bordered class="tdf-box-shadow" style="height:249px">
              <q-card-section style="height:190px">
                <div class="column q-pl-sm">
                  <div class="row text-grey q-pb-sm">
                    <div>总销售额</div>
                    <q-space></q-space>
                    <div><q-icon name="warning" size="xs"></q-icon></div>
                  </div>
                  <div class="text-h5">
                    ￥126，560
                  </div>
                  <span>周同比 12%</span>
                  <span>日同比 11%</span>
                </div>
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                日均销售额￥234.56
              </q-card-section>
            </q-card>
          </div>
          <div class="col-3">
            <q-card flat bordered class="tdf-box-shadow">
              <q-card-section>
                <div class="column q-pl-sm">
                  <div class="row text-grey q-pb-sm">
                    <div>订单量</div>
                    <q-space></q-space>
                    <div><q-icon name="warning" size="xs"></q-icon></div>
                  </div>
                  <div class="text-h5">
                    8，846
                  </div>
                  <small-bar-echarts></small-bar-echarts>
                </div>
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                日订单量1，234
              </q-card-section>
            </q-card>
          </div>
          <div class="col-3">
            <q-card flat bordered class="tdf-box-shadow">
              <q-card-section>
                <div class="column q-pl-sm">
                  <div class="row text-grey q-pb-sm">
                    <div>支付笔数</div>
                    <q-space></q-space>
                    <div><q-icon name="warning" size="xs"></q-icon></div>
                  </div>
                  <div class="text-h5">
                    6，560
                  </div>
                  <small-line-echarts></small-line-echarts>
                </div>
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                转化率60%
              </q-card-section>
            </q-card>
          </div>
          <div class="col-3">
            <q-card flat bordered class="tdf-box-shadow">
              <q-card-section>
                <div class="column q-pl-sm">
                  <div class="row text-grey q-pb-sm">
                    <div>运营活动效果</div>
                    <q-space></q-space>
                    <div><q-icon name="warning" size="xs"></q-icon></div>
                  </div>
                  <div class="text-h5">
                    78%
                  </div>
                  <small-lines-echarts></small-lines-echarts>
                </div>
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                同周比12%
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="q-px-md">
        <q-card class="q-py-sm tdf-box-shadow">
          <q-card-section class="q-py-none">
            <q-tabs
              v-model="tab"
              inline-label
              align="left"
              indicator-color="primary"
            >
              <q-tab name="barEcharts" label="销售额" />
              <q-tab name="pieChart" label="销售趋势" />
            </q-tabs>

            <div
              v-show="tab === 'barEcharts'"
              style="position:absolute;top:10px;right:50px"
            >
              <span
                class="q-pr-md text-primary cursor-pointer"
                @click="section = '2021-07-12~2021-07-19'"
                >本周</span
              >
              <span
                class="q-pr-md text-primary cursor-pointer"
                @click="section = '2021-06-19~2021-07-19'"
                >本月</span
              >
              <span
                class="q-pr-md text-primary cursor-pointer"
                @click="section = '2021-04-20~2021-07-19'"
                >本季度</span
              >
              <span
                class="q-pr-md text-primary cursor-pointer"
                @click="section = '2020-07-19~2021-07-19'"
                >本年</span
              >
            </div>

            <q-separator />

            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="pieChart">
                <radius-echarts api="archives"></radius-echarts>
              </q-tab-panel>

              <q-tab-panel name="barEcharts">
                <Histogram :section="section" />
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import SmallBarEcharts from "../../../components/chartPage/SmallBarEcharts";
import SmallLineEcharts from "../../../components/chartPage/SmallLineEcharts";
import SmallLinesEcharts from "../../../components/chartPage/SmallLinesEcharts";
import RadiusEcharts from "../../../components/chartPage/RadiusEcharts";
import Histogram from "../../../components/chartPage/Histogram";

export default {
  name: "WorkplacePage",
  components: {
    ScrollArea,
    SmallBarEcharts,
    SmallLineEcharts,
    SmallLinesEcharts,
    RadiusEcharts,
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
  },
  created() {}
};
</script>
<style>
.my-content {
  padding: 10px 15px;
  background: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}
.a-decoration-none {
  text-decoration: none;
}
.card-img-left {
  height: 100px;
}
.img-location-left {
  height: 70px;
  width: 70px;
  padding-top: 20px;
  padding-left: 15px;
}
.img-location-left-small {
  height: 70px;
  width: 40px;
  padding-top: 30px;
  padding-left: 3px;
}
.cut-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>

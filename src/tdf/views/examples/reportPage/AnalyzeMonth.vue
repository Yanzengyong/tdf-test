<template>
  <ScrollArea>
    <q-page ref="print" class="q-pa-md">
      <q-card class="q-py-xs tdf-box-shadow">
        <q-card-section>
          <div class="row justify-between ">
            <div class="col-4 text-subtitle1">
              日访问分析同比
            </div>
            <div class="col-1">
              <q-btn
                outline
                color="primary q-mb-sm"
                label="打印"
                :size="$btnSize"
                @click="print"
              />
            </div>
          </div>
          <q-separator />
          <div class="row">
            <div class="col">
              <Histogram showData="false" section="2021-06-19~2021-07-19" />
            </div>
            <div class="col">
              <Histogram
                showData="false"
                area
                section="2021-06-19~2021-07-19"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="q-my-md tdf-box-shadow">
        <q-card-section>
          <div>
            <p class="text-subtitle1">数据明细</p>
          </div>
          <q-separator />
          <q-btn
            color="primary q-my-sm"
            unelevated
            label="导出"
            @click="exportExcel"
          />

          <div>
            <q-table
              style="height: 400px"
              :data="analyzeData"
              :columns="columns"
              flat
              row-key="index"
              virtual-scroll
              :pagination.sync="pagination"
              :rows-per-page-options="[0]"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import Histogram from "../../../components/chartPage/Histogram";
import * as chartData from "../../../components/chartPage/data/barChartData";
import { exportExcelAllField } from "@folder-outside-request/exportExcel";

export default {
  name: "SettingPage",
  components: {
    ScrollArea,
    Histogram
  },
  created() {
    this.analyzeData = chartData.getMonthData().rows;
    this.analyzeData.forEach((row, index) => {
      row.index = index + 1;
    });
  },
  data() {
    return {
      section: "2021-06-19~2021-07-19",
      barEchartBackground: false,
      barEchartDark: false,
      tab: "barEcharts",
      splitterModel: 20,
      exportExcelName: "日访问分析同比.xlsx",
      analyzeData: {},
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {
          name: "index",
          label: "#",
          field: "index"
        },
        {
          name: "createDate",
          align: "center",
          label: "时间",
          field: "createDate",
          sortable: true
        },
        {
          name: "visitNum",
          align: "center",
          label: "访问数量",
          field: "visitNum",
          sortable: true
        }
      ]
    };
  },
  methods: {
    exportExcel() {
      var exportArr = [];
      exportArr = this.analyzeData.map(v => {
        return {
          序号: v.index,
          时间: v.createDate,
          访问数量: v.visitNum
        };
      });
      exportExcelAllField(this.exportExcelName, exportArr);
    },
    print() {
      // window.print()
      this.$print(this.$refs.print);
    }
  }
};
</script>

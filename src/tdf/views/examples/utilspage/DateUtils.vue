<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <div class="text-subtitle1">当前时间：{{ date }}</div>
        </q-card-section>
        <q-card-section class="row q-gutter-md">
          <table border="1" style="border-collapse: collapse;" cellpadding="10">
            <thead>
              <tr>
                <td colspan="2" class="text-bold">日期格式化</td>
              </tr>
            </thead>
            <tbody class="bg-grey-1">
              <tr>
                <td>YYYY-MM-DD HH:mm:ss</td>
                <td>{{ date1 }}</td>
              </tr>
              <tr>
                <td>季度</td>
                <td>{{ date2 }} 季度</td>
              </tr>
              <tr>
                <td>星期</td>
                <td>{{ date3 }}</td>
              </tr>
              <tr>
                <td>AM/PM</td>
                <td>{{ date4 }}</td>
              </tr>
              <tr>
                <td>本年的第几周</td>
                <td>{{ date5 }}</td>
              </tr>
              <tr>
                <td>本年的第几天</td>
                <td>{{ date6 }}</td>
              </tr>
            </tbody>
          </table>

          <table border="1" style="border-collapse: collapse;" cellpadding="10">
            <thead>
              <tr>
                <td colspan="2" class="text-bold">日期加/减（{{ date1 }}）</td>
              </tr>
            </thead>
            <tbody class="bg-grey-1">
              <tr>
                <td>加一天</td>
                <td>{{ date7 }}</td>
              </tr>
              <tr>
                <td>减一天</td>
                <td>{{ date8 }}</td>
              </tr>
              <tr>
                <td>加一个月</td>
                <td>{{ date9 }}</td>
              </tr>
              <tr>
                <td>减一个月</td>
                <td>{{ date10 }}</td>
              </tr>
              <tr>
                <td>加一年</td>
                <td>{{ date11 }}</td>
              </tr>
              <tr>
                <td>减一年</td>
                <td>{{ date12 }}</td>
              </tr>
            </tbody>
          </table>

          <table border="1" style="border-collapse: collapse;" cellpadding="10">
            <thead>
              <tr>
                <td colspan="2" class="text-bold">
                  日期比较（2021-05-21和2021-10-01）
                </td>
              </tr>
            </thead>
            <tbody class="bg-grey-1">
              <tr>
                <td>是否是同一天</td>
                <td>{{ date13 }}</td>
              </tr>
              <tr>
                <td>是否是同一月</td>
                <td>{{ date14 }}</td>
              </tr>
              <tr>
                <td>是否是同一年</td>
                <td>{{ date15 }}</td>
              </tr>
              <tr>
                <td>差几天</td>
                <td>{{ date16 }}</td>
              </tr>
              <tr>
                <td>差几月</td>
                <td>{{ date17 }}</td>
              </tr>
              <tr>
                <td>差几年</td>
                <td>{{ date18 }}</td>
              </tr>
            </tbody>
          </table>

          <table border="1" style="border-collapse: collapse;" cellpadding="10">
            <thead>
              <tr>
                <td colspan="2" class="text-bold">
                  日历方法
                </td>
              </tr>
            </thead>
            <tbody class="bg-grey-1">
              <tr>
                <td>本年第几周</td>
                <td>{{ date19 }}</td>
              </tr>
              <tr>
                <td>本年第几天</td>
                <td>{{ date20 }}</td>
              </tr>
              <tr>
                <td>本月第几天</td>
                <td>{{ date21 }}</td>
              </tr>
            </tbody>
          </table>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import { date } from "quasar";

export default {
  name: "DateUtils",
  components: {
    ScrollArea
  },
  data() {
    return {
      date: "",
      date1: "",
      date2: "",
      date3: "",
      date4: "",
      date5: "",
      date6: "",

      date7: "",
      date8: "",
      date9: "",
      date10: "",
      date11: "",
      date12: "",

      date13: "",
      date14: "",
      date15: "",
      date16: "",
      date17: "",
      date18: "",

      date19: "",
      date20: "",
      date21: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 动态时间
      this.timer = setInterval(() => {
        const nowDate = new Date();
        this.date = date.formatDate(nowDate, "YYYY-MM-DD HH:mm:ss");
      }, 1000);

      const timeStamp = new Date();
      // 日期格式化
      this.date1 = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss"); // YYYY-MM-DD HH:mm:ss
      this.date2 = date.formatDate(timeStamp, "Q"); // 季度
      this.date3 = date.formatDate(timeStamp, "dddd"); // 星期
      this.date4 = date.formatDate(timeStamp, "A"); // AM/PM
      this.date5 = date.formatDate(timeStamp, "w"); // 本年的第几周
      this.date6 = date.formatDate(timeStamp, "DDD"); // 本年的第几天
      // 日期加/减
      const d1 = date.addToDate(timeStamp, { days: 1 }); // 加一天
      this.date7 = date.formatDate(d1, "YYYY-MM-DD HH:mm:ss");
      const d2 = date.subtractFromDate(timeStamp, { days: 1 }); // 减一天
      this.date8 = date.formatDate(d2, "YYYY-MM-DD HH:mm:ss");
      const d3 = date.addToDate(timeStamp, { month: 1 }); // 加一个月
      this.date9 = date.formatDate(d3, "YYYY-MM-DD HH:mm:ss");
      const d4 = date.subtractFromDate(timeStamp, { month: 1 }); // 减一个月
      this.date10 = date.formatDate(d4, "YYYY-MM-DD HH:mm:ss");
      const d5 = date.addToDate(timeStamp, { year: 1 }); // 加一年
      this.date11 = date.formatDate(d5, "YYYY-MM-DD HH:mm:ss");
      const d6 = date.subtractFromDate(timeStamp, { year: 1 }); // 减一年
      this.date12 = date.formatDate(d6, "YYYY-MM-DD HH:mm:ss");
      // 日期对比
      let d7 = new Date("2021-05-21");
      let d8 = new Date("2021-10-01");
      this.date13 = date.isSameDate(d7, d8, "day"); // 是否是同一天
      this.date14 = date.isSameDate(d7, d8, "month"); // 是否是同一月
      this.date15 = date.isSameDate(d7, d8, "year"); // 是否是同一年
      this.date16 = date.getDateDiff(d8, d7, "days"); // 差几天
      this.date17 = date.getDateDiff(d8, d7, "months"); // 差几月
      this.date18 = date.getDateDiff(d8, d7, "years"); // 差几年
      // 日历
      this.date19 = date.getWeekOfYear(timeStamp); // 本年第几周
      this.date20 = date.getDayOfYear(timeStamp); // 本年第几天
      this.date21 = date.getDayOfWeek(timeStamp); // 星期数
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer); // 清除当前日期定时器
    }
  }
};
</script>

export function getRadiusEchartData() {
  const option = {
    color: ["#1890ff"],
    tooltip: {
      trigger: "item"
    },
    legend: {
      top: "5%",
      left: "center"
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2
        },
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: "搜索引擎" },
          { value: 735, name: "直接访问" },
          { value: 580, name: "邮件营销" },
          { value: 484, name: "联盟广告" },
          { value: 300, name: "视频广告" }
        ]
      }
    ]
  };
  return option;
}

export function getArchivesRadiusEchartData() {
  const option = {
    color: ["#3fb1e3", "#6be6c1", "#626c91", "#a0a7e6", "#c4ebad", "#96dee8"],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      data: [
        "直达",
        "营销广告",
        "搜索引擎",
        "邮件营销",
        "联盟广告",
        "视频广告",
        "百度",
        "谷歌",
        "必应",
        "其他"
      ]
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        selectedMode: "single",
        radius: [0, "30%"],
        label: {
          position: "inner",
          fontSize: 14
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1548, name: "搜索引擎" },
          { value: 775, name: "直达" },
          { value: 679, name: "营销广告", selected: true }
        ]
      },
      {
        name: "访问来源",
        type: "pie",
        radius: ["45%", "60%"],
        labelLine: {
          length: 30
        },
        label: {
          formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
          backgroundColor: "#F6F8FC",
          borderColor: "#8C8D8E",
          borderWidth: 1,
          borderRadius: 4,

          rich: {
            a: {
              color: "#6E7079",
              lineHeight: 22,
              align: "center"
            },
            hr: {
              borderColor: "#8C8D8E",
              width: "100%",
              borderWidth: 1,
              height: 0
            },
            b: {
              color: "#4C5058",
              fontSize: 14,
              fontWeight: "bold",
              lineHeight: 33
            },
            per: {
              color: "#fff",
              backgroundColor: "#4C5058",
              padding: [3, 4],
              borderRadius: 4
            }
          }
        },
        data: [
          { value: 1048, name: "百度" },
          { value: 335, name: "直达" },
          { value: 310, name: "邮件营销" },
          { value: 251, name: "谷歌" },
          { value: 234, name: "联盟广告" },
          { value: 147, name: "必应" },
          { value: 135, name: "视频广告" },
          { value: 102, name: "其他" }
        ]
      }
    ]
  };
  return option;
}

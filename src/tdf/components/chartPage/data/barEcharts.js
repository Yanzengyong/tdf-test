export function getBarEchartData() {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar"
      }
    ]
  };
  return option;
}

export function getBarEchartDataWithBackground(val) {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: val
        }
      }
    ]
  };
  return option;
}

export function getSmallBarEcharts() {
  const option = {
    color: ["#1890ff"],
    grid: {
      left: 0,
      right: 0,
      height: "100%",
      bottom: 0,
      top: 0
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar"
      }
    ]
  };
  return option;
}

export function getSmallLineEcharts() {
  const option = {
    color: ["#1890ff"],
    grid: {
      left: 0,
      right: 0,
      height: "100%",
      bottom: 0,
      top: 0
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {}
      }
    ]
  };
  return option;
}
export function getSmallLinesEcharts() {
  const option = {
    color: ["#1890ff"],
    grid: {
      left: 0,
      right: 0,
      height: "100%",
      bottom: 0,
      top: 0
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true
      }
    ]
  };
  return option;
}

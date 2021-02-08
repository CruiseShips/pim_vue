<template>
  <div id="echart1" style="width: 600px; height: 600px;"></div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    drawing() {
      const mychart = this.$echarts.init(document.getElementById("echart1"));
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line"
          }
        ]
      };
      mychart.setOption(option);
    }
  },
  mounted() {
    this.drawing();
  }
};
</script>

<style></style>

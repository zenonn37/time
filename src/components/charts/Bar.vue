<template>
  <div>
    <bar :chartData="chartdata" :options="options" />
  </div>
</template>

<script>
import bar from "@/components/charts/bar/bar.vue";

//import moment from "moment";
export default {
  name: "BarChart",
  props: ["chart"],
  components: { bar },

  data: () => ({
    chartdata: {
      labels: ["1/5", "1/6", "1/7", "1/8", "1/9", "1/10"],
      datasets: [
        {
          label: "Hours Per Day",
          backgroundColor: "#393857",
          borderColor: "rgb(168, 165, 235)",
          data: [1, 7, 8, 4, 7, 8]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {},
  created() {
    this.chartdata.datasets[0].data = this.chart.time;
    this.chartdata.labels = this.chart.dates;
  }
};
</script>


<template>
  <div>
    <bar :chartData="chartdata" :options="options" />
  </div>
</template>

<script>
import bar from "@/components/charts/bar/bar.vue";

export default {
  name: "BarChartClock",
  props: ["chart"],
  components: { bar },

  data: () => ({
    chartdata: {
      labels: ["2021-01-25", "2021-01-28", "2021-01-29"],
      datasets: [
        {
          label: "Daily Hours",
          backgroundColor: "rgb(2, 149, 168)",
          borderColor: "rgb(168, 165, 235)",
          data: []
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              max: 24,
              min: 0,
              stepSize: 2
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {},
  created() {
    this.chartdata.datasets[0].data = this.chart.time;
    // this.chartdata.datasets[0].label = this.chart.label;
    this.chartdata.labels = this.chart.dates;
  }
};
</script>

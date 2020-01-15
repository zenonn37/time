<template>
  <div>
    <bar :chartData="chartdata" :options="options" />
  </div>
</template>

<script>
import bar from "@/components/charts/bar/bar.vue";

export default {
  name: "BarChart",
  props: ["chart"],
  components: { bar },

  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Completed Tasks for Six Days",
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
              max: 30,
              min: 0,
              stepSize: 1
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
    this.chartdata.datasets[0].data = this.chart.tasks;
    this.chartdata.datasets[0].label = this.chart.label;
    this.chartdata.labels = this.chart.dates;
  }
};
</script>


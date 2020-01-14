<template>
  <div class="main-report-parent">
    <div v-if="!loading">
      <div class="report-filter-parent">
        <i @click="onSetRange()" class="fas fa-search"></i>
        <div>
          <datetime
            placeholder="Start Date"
            v-model="start_clock"
            value-zone="America/New_York"
            :format="{ year: 'numeric', month: 'long', day: 'numeric'}"
          ></datetime>
        </div>
        <div>
          <datetime
            placeholder="End Date"
            v-model="end_clock"
            value-zone="America/New_York"
            :format="{ year: 'numeric', month: 'long', day: 'numeric'}"
          ></datetime>
        </div>
      </div>
      <div class="main-clock-chart">
        <BarClockReports :chart="clock" />
      </div>

      <div class="report-filter-parent">
        <i class="fas fa-search"></i>
        <div>
          <datetime
            placeholder="Start Date"
            v-model="start_task"
            value-zone="America/New_York"
            :format="{ year: 'numeric', month: 'long', day: 'numeric'}"
          ></datetime>
        </div>
        <div>
          <datetime
            placeholder="End Date"
            v-model="end_task"
            value-zone="America/New_York"
            :format="{ year: 'numeric', month: 'long', day: 'numeric'}"
          ></datetime>
        </div>
      </div>

      <div class="main-task-chart">
        <BarTaskReports />
      </div>
    </div>
  </div>
</template>

<script>
import BarClockReports from "@/components/charts/BarClockReports";
import BarTaskReports from "@/components/charts/BarTaskReports";

export default {
  name: "MainReports",

  components: {
    BarClockReports,
    BarTaskReports
  },
  data() {
    return {
      loading: false,
      start_clock: "",
      end_clock: "",
      start_task: "",
      end_task: ""
    };
  },
  computed: {
    clock() {
      const data = this.$store.getters["time/get_time"];
      //int arrrays to split data from DB
      const dates = [];
      const time = [];

      //use foreach to clean up dates and push result
      data.forEach(el => {
        dates.push(el.date.slice(0, 10));
      });
      //use foreach to convert seconds to hours and push result
      data.forEach(el => {
        if (parseInt(el.seconds) < 3600) {
          time.push(0);
        } else {
          time.push(parseInt(el.seconds) / 3600);
        }
      });

      return {
        dates,
        time
      };
    },
    task() {
      return [];
    }
  },
  methods: {
    onSetRange() {
      if (this.start_clock === "" || this.end_clock === "") {
        this.$toast.open({
          message: "Date Range fields cannot be empty.",
          type: "info",
          position: "top"
        });

        return;
      }

      this.loading = true;
      this.$store
        .dispatch("time/filter_clock_chart", {
          start: this.start_clock.slice(0, 19).replace("T", " "),
          end: this.end_clock.slice(0, 19).replace("T", " ")
        })
        .then(() => {
          console.log("done");
          this.loading = false;
        });
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("time/clock_chart").then(() => {
      this.loading = false;
    });
  }
};
</script>


<template>
  <div>
    <div
      class="report-filter-parent"
      v-if="!loading && clock.dates.length >= 1"
    >
      <i class="fas fa-sync" @click="onResetClock()"></i>
      <i @click="onSetRange()" class="fas fa-search"></i>

      <div>
        <datetime
          placeholder="Start Date"
          v-model="start_clock"
          value-zone="America/New_York"
          :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
        ></datetime>
      </div>
      <div>
        <datetime
          placeholder="End Date"
          v-model="end_clock"
          value-zone="America/New_York"
          :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
        ></datetime>
      </div>
    </div>
    <div class="main-clock-chart" v-if="!loading && clock.dates.length >= 1">
      <BarClockReports :chart="clock" />
    </div>
    <div class="empty-chart" v-else>
      <div>No Clock Data</div>
      <img src="@/assets/images/charts.svg" alt="Charts" />
    </div>

    <div
      class="report-filter-parent"
      v-if="!loading2 && task.dates.length >= 1"
    >
      <i class="fas fa-sync" @click="onResetTask()"></i>
      <i @click="onSetRangeTask()" class="fas fa-search"></i>
      <div>
        <datetime
          placeholder="Start Date"
          v-model="start_task"
          value-zone="America/New_York"
          :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
        ></datetime>
      </div>
      <div>
        <datetime
          placeholder="End Date"
          v-model="end_task"
          value-zone="America/New_York"
          :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
        ></datetime>
      </div>
    </div>

    <div class="main-task-chart" v-if="!loading2 && task.dates.length >= 1">
      <BarTaskReports :chart="task" />
    </div>
    <div class="empty-chart" v-else>
      <div>No Task Data</div>
      <img src="@/assets/images/charts.svg" alt="Charts" />
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
      loading2: false,
      start_clock: "",
      end_clock: "",
      start_task: "",
      end_task: ""
    };
  },
  computed: {
    clock() {
      const data = this.$store.getters["time/get_chart"];
      //int arrrays to split data from DB
      const dates = [];
      const time = [];

      //use foreach to clean up dates and push result
      data.forEach(el => {
        dates.push(el.new_entry);
      });

      //use foreach to convert seconds to hours and push result
      data.forEach(el => {
        if (parseInt(el.seconds) < 3600) {
          time.push(0);
        } else {
          time.push(Math.round(parseInt(el.seconds) / 3600));
        }
      });

      return {
        dates,
        time
      };
    },
    task() {
      const data = this.$store.getters["task/get_tasks"];
      //int arrrays to split data from DB
      const dates = [];
      const tasks = [];

      //use foreach to clean up dates and push result
      data.forEach(el => {
        dates.push(el.date.slice(5, 10));
      });
      //use foreach to convert seconds to hours and push result
      data.forEach(el => {
        tasks.push(el.tasks);
      });

      return {
        dates,
        tasks
      };
    }
  },
  methods: {
    warningToast() {
      this.$toast.open({
        message: "Date Range fields cannot be empty.",
        type: "info",
        position: "top"
      });
    },
    onResetClock() {
      this.loadChartDataClock();
    },
    onResetTask() {
      this.loadChartDataTask();
    },
    onSetRangeTask() {
      if (this.start_task === "" || this.end_task === "") {
        this.warningToast();
        return;
      }
      this.loading2 = true;
      this.$store
        .dispatch("task/filter_task_chart", {
          start: this.start_task.slice(0, 19).replace("T", " "),
          end: this.end_task.slice(0, 19).replace("T", " ")
        })
        .then(() => {
          this.loading2 = false;
        });
    },
    onSetRange() {
      if (this.start_clock === "" || this.end_clock === "") {
        this.warningToast();
        return;
      }

      this.loading = true;

      this.$store
        .dispatch("time/filter_clock_chart", {
          start: this.start_clock.slice(0, 19).replace("T", " "),
          end: this.end_clock.slice(0, 19).replace("T", " ")
        })
        .then(() => {
          this.loading = false;
        });
    },
    loadChartDataClock() {
      this.loading = true;

      this.$store.dispatch("time/entryReport").then(() => {
        //loaded
      });

      this.$store.dispatch("time/clock_chart").then(() => {
        this.loading = false;
      });
    },
    loadChartDataTask() {
      this.loading2 = true;

      this.$store.dispatch("task/global_task_chart").then(() => {
        this.loading2 = false;
      });
    }
  },

  created() {
    this.loadChartDataClock();
    this.loadChartDataTask();
  }
};
</script>

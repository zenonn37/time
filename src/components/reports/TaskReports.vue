<template>
  <div v-if="!loading">
    <div
      class="report-filter-parent"
      v-if="!loading && charts.tasks.length >= 1"
    >
      <i class="fas fa-sync" @click="onResetTask()"></i>
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
    <div v-if="charts.tasks.length >= 1">
      <Bar :chart="charts" />
    </div>
    <div class="time-entry-empty" v-else>
      <div>
        <div>No Chart Data Yet.</div>
        <img src="@/assets/images/charts.svg" alt />
      </div>
    </div>
  </div>
</template>

<script>
import Bar from "@/components/charts/BarTasks";
export default {
  props: ["proj_name"],
  components: {
    Bar
  },
  data() {
    return {
      loading: false,
      start_clock: "",
      end_clock: ""
    };
  },

  computed: {
    charts() {
      const charts = this.$store.getters["task/get_tasks"];

      let tasks = [];
      let dates = [];

      // //get dates
      charts.forEach(el => {
        dates.push(el.date.slice(0, 10));
      });
      charts.forEach(el => {
        tasks.push(el.tasks);
      });

      const label = `${this.proj_name.project.name} Six Days Task's`;
      return {
        tasks,
        dates,
        label
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
    onSetRange() {
      if (this.start_clock === "" || this.end_clock === "") {
        this.warningToast();
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("task/filter_task_chart_project", {
          id: this.$route.params.id,
          start: this.start_clock.slice(0, 19).replace(" T ", " "),
          end: this.end_clock.slice(0, 19).replace(" T ", " ")
        })
        .then(() => {
          this.loading = false;
        });
    },
    onResetTask() {
      this.taskCall();
    },
    taskCall() {
      this.loading = true;
      this.$store.dispatch("task/past_week", this.$route.params.id).then(() => {
        this.loading = false;
      });
    }
  },
  created() {
    //get all project tasks from server
    this.taskCall();
  }
};
</script>

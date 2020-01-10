<template>
  <div>
    <div class="back-btn">
      <router-link :to="`/projects/${$route.params.id}/task`">
        <i class="fas fa-angle-left"></i>
      </router-link>
    </div>
    <div class="report-sub-nav">
      <div>
        <div v-if="reports">
          <ul>
            <li @click="toggleReports()">
              <i class="fas fa-toggle-on"></i>
              Time
            </li>
            <li @click="toggleTask()">
              <i class="fas fa-tasks"></i>
              Task Charts
            </li>
          </ul>
        </div>

        <div v-else>
          <ul>
            <li @click="toggleReports()">
              <i class="fas fa-toggle-on"></i>
              Task
            </li>
            <li @click="toggleTimer()">
              <i class="far fa-clock"></i>
              Time Charts
            </li>
          </ul>
        </div>
      </div>
    </div>

    <transition name="fade" mode="in-out">
      <ClockReport v-if="!reports" :nav="timer" />
    </transition>
    <transition name="fade" mode="out-in">
      <TaskReport v-if="reports" />
    </transition>
  </div>
</template>
    

<script>
import TaskReport from "@/components/reports/TaskReports";
import ClockReport from "@/components/reports/ClockReports";
export default {
  name: "Reports",
  data() {
    return {
      reports: false,
      timer: false,
      task: false
    };
  },
  components: {
    TaskReport,
    ClockReport
  },
  methods: {
    toggleReports() {
      this.reports = !this.reports;
    },
    toggleTimer() {
      this.timer = !this.timer;
      console.log("timer");
    },
    toggleTask() {
      this.task = !this.task;
    }
  }
};
</script>


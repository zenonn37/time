<template>
  <div>
    <div class="back-btn">
      <router-link :to="`/projects/${$route.params.id}/task`">back</router-link>
    </div>
    <div class="report-sub-nav">
      <button @click="toggleReports()">Toggle</button>
    </div>

    <transition name="fade" mode="in-out">
      <ClockReport v-if="!reports" />
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
  data() {
    return {
      reports: false
    };
  },
  components: {
    TaskReport,
    ClockReport
  },
  methods: {
    toggleReports() {
      this.reports = !this.reports;
    }
  }
};
</script>


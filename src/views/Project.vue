<template>
  <div>
    <div class="clock-header">
      <div class="project-timer">
        <CountUp />
      </div>
    </div>
    <div v-if="!loading">
      <div>Project: {{project.name}}</div>
      <div>
        Status:
        <span v-if="project.completed">Completed</span>
        <span v-else>On Going</span>
      </div>
      <router-view :project="project"></router-view>
    </div>
  </div>
</template>

<script>
import CountUp from "@/components/timers/CountUp";
export default {
  components: {
    CountUp
  },
  data() {
    return {
      name: "Project",
      loading: false
    };
  },
  computed: {
    project() {
      const ids = parseInt(this.$route.params.id);
      return this.$store.getters["projects/show_projects"](ids);
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("projects/get_projects").then(() => {
      this.loading = false;
    });
  }
};
</script>


<template>
  <header class="header-parent">
    <div class="header-container">
      <div class="header-content">
        <div class="task">
          <input type="text" placeholder="Enter Task" />
        </div>
        <div class="project">
          <i class="fas fa-project-diagram"></i>
          Timer
          <!-- <vSelect :options="projects" /> -->
        </div>

        <div class="timer">
          <CountUp @new="saveCurrentCount" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import CountUp from "@/components/timers/CountUp";
// import vSelect from "vue-select";

export default {
  components: {
    CountUp
    // vSelect
  },
  data() {
    return {
      projects: ["Timers", "Weather", "Money-Tracker", "Portfolio"]
    };
  },
  methods: {
    saveCurrentCount(value) {
      console.log("called");

      console.log(value);
      this.$store.dispatch("time/new_time", value);
    }
  }
};
</script>


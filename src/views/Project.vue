<template>
  <div>
    <div class="clock-header">
      <transition name="slide-fade" mode="out-in">
        <div class="cancel cursor" v-if="!check" @click="onCancel()">
          <i class="fas fa-times"></i>
        </div>
        <div class="cancel" v-else>To Exit Cancel Timer</div>
      </transition>
      <div class="project-timer">
        <CountUp />
      </div>
    </div>
    <div v-if="!loading">
      <div class="project-head">
        <div>Project: {{ project.name }}</div>
        <div>
          Status:
          <span v-if="project.completed">Completed</span>
          <span v-else>On Going</span>
        </div>
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
    //get clock active state
    check() {
      return this.$store.getters["time/get_clock_active"];
    },
    project() {
      const ids = parseInt(this.$route.params.id);
      return this.$store.getters["projects/show_projects"](ids);
    }
  },
  methods: {
    onCancel() {
      this.$router.push("/home");
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

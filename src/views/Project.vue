<template>
  <div>
    <div class="exit-header">
      <transition name="slide-fade">
        <div class="cancel cursor" v-if="!check" @click="onCancel()">
          <i class="fas fa-times"></i>
        </div>
        <div class="cancel" v-else>
          <h4>To Exit Stop Timer</h4>
        </div>
      </transition>
    </div>
    <div class="clock-header">
      <div class="project-timer">
        <CountUp />
      </div>
    </div>
    <div v-if="!loading">
      <div class="project-head">
        <div class="title">
          <i class="far fa-clock"></i>
          <h2>{{ project.name }}</h2>
        </div>
        <h5>
          Status:
          <span v-if="project.completed">Completed</span>
          <span v-else>In Progress</span>
        </h5>
      </div>
      <router-view :project="project"></router-view>
    </div>
  </div>
</template>

<script>
import CountUp from "@/components/timers/CountUp";
export default {
  components: {
    CountUp,
  },
  data() {
    return {
      name: "Project",
      loading: false,
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
    },
  },
  methods: {
    onCancel() {
      this.$router.push("/home");
    },
  },

  created() {
    this.loading = true;
    this.$store.dispatch("projects/get_projects").then(() => {
      this.loading = false;
    });
  },
};
</script>

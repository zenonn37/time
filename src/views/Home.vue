<template>
  <div class="home-parent" :class="[projects.length < 1 ?  'full-screen': '']">
    <template v-if="projects.length < 1">
      <div class="no-projects">Please Create a Project</div>
    </template>
    <template v-else>
      <div>
        <ProjectList :project="proj" v-for="proj in projects" :key="proj.id" />
      </div>
    </template>
  </div>
</template>

<script>
// import NewEntry from "@/components/NewEntry";
// import moment from "moment";
// import Countdown from "@/components/timers/CountDown";
import ProjectList from "@/components/ProjectList";
export default {
  name: "home",
  components: {
    // Countdown
    ProjectList
  },
  data() {
    return {};
  },

  computed: {
    projects() {
      const data = this.$store.getters["projects/get_projects"];

      return data !== null ? data : [];
    }
  },
  methods: {
    //timer function starts clock countup
    // saveTime() {
    //   this.end = moment();
    //   this.result = this.end.diff(this.start, "minutes");
    //   let time = [];
    //   const save = this.total;
    //   time.push(save);
    //   this.current.push({
    //     entry: this.entry,
    //     time: save
    //   });
    // }
  }
};
</script>

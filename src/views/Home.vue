<template>
  <div>
    <div class="home-subheader">
      <div :class="[!active ? 'new-project' : 'new-project-full' ]">
        <div class="new-button" @click="onToggleActive()">
          <i class="fas fa-project-diagram"></i>
        </div>
        <div class="forms">
          <NewProject v-if="active" @cancel="onToggleActive" />
        </div>
      </div>
    </div>

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
  </div>
</template>

<script>
// import NewEntry from "@/components/NewEntry";
// import moment from "moment";
// import Countdown from "@/components/timers/CountDown";
import ProjectList from "@/components/ProjectList";
import NewProject from "@/components/forms/NewProject";
export default {
  name: "home",
  components: {
    // Countdown
    ProjectList,
    NewProject
  },
  data() {
    return {
      active: false
    };
  },

  computed: {
    projects() {
      const data = this.$store.getters["projects/get_projects"];

      return data !== null ? data : [];
    }
  },
  methods: {
    onToggleActive() {
      this.active = !this.active;
    }
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
  },
  created() {
    this.loading = true;
    this.$store.dispatch("projects/get_projects").then(() => {
      this.loading = false;
    });
  }
};
</script>

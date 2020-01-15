<template>
  <div>
    <div class="home-subheader">
      <div :class="[!active ? 'hide-form' : 'show-form' ]">
        <transition name="slide-fade">
          <div class="project-btn cursor" v-if="!active">
            <div class="new-button" @click="onToggleActive()">
              <i class="fas fa-project-diagram"></i>
            </div>
          </div>
        </transition>
        <div class="forms">
          <transition name="slide-fade">
            <NewProject v-if="active" @cancel="onToggleActive" />
          </transition>
        </div>
      </div>
    </div>

    <div class="home-parent">
      <template v-if="projects.length < 1">
        <div class="no-projects">
          Please Create a Project
          <div class="empty">
            <img src="@/assets/images/empty.svg" alt="Empty Project" />
          </div>
        </div>
      </template>
      <template v-else>
        <div>
          <transition-group name="fade" mode="out-in">
            <ProjectList :project="proj" v-for="proj in projects" :key="proj.id" />
          </transition-group>
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
      return this.$store.getters["projects/get_projects"];
    }
  },
  methods: {
    onToggleActive() {
      this.active = !this.active;
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

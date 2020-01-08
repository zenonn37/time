<template>
  <div>
    <div class="sub-header">
      <div class="project-header">
        <div class="project-title" v-if="!loading">
          <h3 class="title">{{project.name}}</h3>
          <span>Reports</span>
          <router-link :to="`/projects/${$route.params.id}/report`" tag="div">Reports</router-link>
        </div>
      </div>
      <div class="clock-header">
        <div class="project-timer">
          <CountUp @hook:beforeDestroy="checkClock()" @save="saveTime()" />
        </div>
      </div>

      <div class="filter-bar" v-if="!tasks.length <= 0">
        <div class="cursor" @click="onFilterDays(0)">Today</div>
        <div class="cursor" @click="onFilterDays(7)">7d</div>
        <div class="cursor" @click="onFilterDays(14)">14d</div>
        <div class="cursor" @click="onFilterDays(30)">30d</div>
        <div class="cursor" @click="onAll()">All</div>
      </div>
    </div>
    <!-- <div class="tasks">
      <TimeList :hour="task" v-for="task in tasks" :key="task.id" />
    </div>-->
    <div class="project-parent" :class="[tasks.length <= 0  ? 'full-screen': '']">
      <ActiveTask />
      <template v-if="tasks.length <= 0 && !active">
        <div class="no-task">
          <h3 class="title">No Tasks for today, Start and save a task to create one.</h3>
        </div>
      </template>
      <template v-if="project.tasks >= 1 && tasks.length <= 0">
        <div class="no-task">
          <h3 class="title cursor" @click="onAll()">You have older task's, click to load.</h3>
        </div>
      </template>

      <template v-if="!loading">
        <div class="tasks" v-if="!active">
          <transition-group name="list">
            <TimeList :hour="task" v-for="task in tasks" :key="task.id" />
          </transition-group>
        </div>
      </template>

      <template v-else>
        <div class="loader">
          <half-circle-spinner :animation-duration="1000" :size="50" color="#000000" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import TimeList from "@/components/TimeList";
import ActiveTask from "@/components/ActiveTask";
import CountUp from "@/components/timers/CountUp";
import { HalfCircleSpinner } from "epic-spinners";
export default {
  name: "Project",
  props: ["id"],
  components: {
    TimeList,
    ActiveTask,
    CountUp,
    HalfCircleSpinner
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    project() {
      const id = parseInt(this.$route.params.id);
      const data = this.$store.getters["projects/show_projects"](id);
      console.log(data);

      if (data !== null || data !== undefined) {
        return data;
      } else {
        return "";
      }
    },
    tasks() {
      return this.$store.getters["task/get_tasks"];
    },
    active() {
      return this.$store.getters["task/active_status"];
    }
  },
  methods: {
    saveTime(value) {
      console.log("called");

      console.log(value);
    },
    checkClock(value) {
      console.log("child destroyed " + value);
    },
    audio() {
      var audio = new Audio(require("@/assets/bells-tibetan-daniel_simon.mp3"));
      audio.play();
    },
    onFilterDays(days) {
      this.audio();
      this.loading = true;
      const payload = {
        days: days,
        id: this.$route.params.id
      };
      this.$store.dispatch("task/filter_day_range", payload).then(() => {
        this.loading = false;
      });
    },
    onAll() {
      this.loading = true;

      this.$store.dispatch("task/all_tasks", this.$route.params.id).then(() => {
        this.loading = false;
      });
    }
  },
  created() {
    this.loading = true;
    const id = parseInt(this.$route.params.id);
    if (this.$store.getters["projects/show_projects"](id) === undefined) {
      console.log("no data");
      this.$store.dispatch("projects/get_projects").then(() => {
        console.log("reload");
        this.$store
          .dispatch("task/set_tasks", this.$route.params.id)
          .then(() => {
            this.loading = false;
          });
      });
    } else {
      this.$store.dispatch("task/set_tasks", this.$route.params.id).then(() => {
        this.loading = false;
      });
    }
  },
  beforeDestroy() {
    console.log("destroy");
  }
};
</script>


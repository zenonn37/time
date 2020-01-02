<template>
  <div>
    <div class="sub-header">
      <div class="project-header">
        <div class="project-title" v-if="!loading">
          <h3 class="title">{{project.name}}</h3>
        </div>
      </div>
      <div class="clock-header">
        <div class="project-timer">
          <CountUp />
        </div>
      </div>

      <div class="filter-bar">
        <div @click="onFilterDays(0)">Today</div>
        <div @click="onFilterDays(7)">7</div>
        <div @click="onFilterDays(14)">14</div>
        <div @click="onFilterDays(30)">30</div>
        <div @click="onAll()">All</div>
      </div>
    </div>
    <!-- <div class="tasks">
      <TimeList :hour="task" v-for="task in tasks" :key="task.id" />
    </div>-->
    <div class="project-parent" :class="[tasks === null  ? 'full-screen': '']">
      <ActiveTask />
      <template v-if="tasks === null">
        <div class="no-task">
          <h3 class="title">No Tasks yet, complete a task to create one.</h3>
        </div>
      </template>

      <template v-else>
        <div class="tasks" v-if="!active">
          <TimeList :hour="task" v-for="task in tasks" :key="task.id" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import TimeList from "@/components/TimeList";
import ActiveTask from "@/components/ActiveTask";
import CountUp from "@/components/timers/CountUp";
export default {
  name: "Project",
  props: ["id"],
  components: {
    TimeList,
    ActiveTask,
    CountUp
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
    onFilterDays(days) {
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
  }
};
</script>


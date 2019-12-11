<template>
  <div>
    <div class="sub-header">
      <div class="project-header">
        <div class="project-title">
          <h3 class="title">{{project.name}}</h3>
        </div>
      </div>
      <div class="clock-header">
        <div class="project-timer">
          <CountUp />
        </div>
      </div>
    </div>
    <div class="project-parent" :class="[tasks.length < 1  ? 'full-screen': '']">
      <ActiveTask />
      <template v-if="tasks.length < 1">
        <div class="no-task">
          <h3 class="title">No Tasks yet, complete a task to create one.</h3>
        </div>
      </template>

      <template v-else>
        <div class="tasks">
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
  computed: {
    project() {
      const id = parseInt(this.$route.params.id);
      const data = this.$store.getters["projects/show_projects"](id);
      return data;
    },
    tasks() {
      const data = this.$store.getters["time/get_time"];
      return data !== null ? data : [];
    }
  }
};
</script>


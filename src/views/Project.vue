<template>
  <div class="project-parent" :class="[tasks.length < 1  ? 'full-screen': '']">
    <div class="project-title">
      <h3 class="title">{{project.name}}</h3>
    </div>

    <template v-if="tasks.length < 1">
      <div class="no-task">
        <h3 class="title">No Tasks yet, you should create one.</h3>
      </div>
    </template>

    <template v-else>
      <ActiveTask />
      <div class="tasks">
        <TimeList :hour="task" v-for="task in tasks" :key="task.id" />
      </div>
    </template>
  </div>
</template>

<script>
import TimeList from "@/components/TimeList";
import ActiveTask from "@/components/ActiveTask";
export default {
  name: "Project",
  props: ["id"],
  components: {
    TimeList,
    ActiveTask
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


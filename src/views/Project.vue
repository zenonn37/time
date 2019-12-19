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
  created() {
    this.loading = true;
    this.$store.dispatch("task/set_tasks", this.$route.params.id).then(() => {
      this.loading = false;
    });
  }
};
</script>


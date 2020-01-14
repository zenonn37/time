<template>
  <div v-if="!loading">
    <Bar :chart="charts" />
  </div>
</template>

<script>
import Bar from "@/components/charts/BarTasks";
export default {
  props: ["proj_name"],
  components: {
    Bar
  },
  data() {
    return {
      loading: false
    };
  },

  computed: {
    charts() {
      const charts = this.$store.getters["task/get_tasks"];

      let tasks = [];
      let dates = [];

      // //get dates
      charts.forEach(el => {
        dates.push(el.date.slice(0, 10));
      });
      charts.forEach(el => {
        tasks.push(el.tasks);
      });

      const label = `${this.proj_name.project.name} Project Six Days Task's`;
      return {
        tasks,
        dates,
        label
      };
    }
  },
  created() {
    //get all project tasks from server
    this.loading = true;
    this.$store.dispatch("task/past_week", this.$route.params.id).then(() => {
      this.loading = false;
    });
  }
};
</script>


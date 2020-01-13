<template>
  <div v-if="!loading">
    <Bar :chart="charts" />
  </div>
</template>

<script>
import Bar from "@/components/charts/BarTasks";
export default {
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
      // let chartDate = [];

      // let count = 0;

      // //get dates
      charts.forEach(el => {
        dates.push(el.date.slice(0, 10));
      });
      charts.forEach(el => {
        tasks.push(el.tasks);
      });

      console.log(dates);
      console.log(tasks);

      // //get total completed task per day last 6 days

      // //dates[i]

      // for (let x = 0; x < charts.length; x++) {
      //   // console.log(dates[x]);
      //   // console.log(charts[x].complete.slice(0, 10));
      //   // console.log(charts[x].completed);
      //   if (!chartDate.includes(dates[x])) {
      //     chartDate.push(dates[x]);
      //   }

      //   if (
      //     dates[x] === charts[x].complete.slice(0, 10) &&
      //     charts[x].completed
      //   ) {
      //     // console.log("yes dup");
      //     // console.log(dates[x]);

      //     count++;
      //     console.log(count);

      //     tasks.push(count);

      //     //count++;
      //     //console.log(count);
      //   } else {
      //     tasks.push(1);
      //     count = 0;
      //     console.log("no");
      //   }
      // }
      // console.log(chartDate);
      // console.log(tasks);

      // //const element = array[i];

      return {
        tasks,
        dates
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


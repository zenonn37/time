<template>
  <div>
    <!-- <h1>Clock Reports</h1> -->

    <div v-if="!loading">
      <transition name="fade">
        <div v-if="!toggle">
          <ClockList :clocks="clock" v-for="clock in clocks" :key="clock.id" />
        </div>
        <div v-else>
          <Bar :chart="charts" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ClockList from "@/components/reports/ClockList";
import Bar from "@/components/charts/Bar";
export default {
  props: ["nav"],
  components: {
    ClockList,
    Bar
  },

  data() {
    return {
      loading: false
      //toggle: this.nav
    };
  },
  computed: {
    clocks() {
      return this.$store.getters["time/get_time"];
    },
    charts() {
      const charts = this.clocks;

      let time = [];
      let dates = [];

      charts.forEach(el => {
        time.push(el.entries_sum / 3600);
        dates.push(el.date.slice(0, 10));
      });

      return {
        time,
        dates
      };
    },
    toggle() {
      return this.nav;
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("time/get_time", this.$route.params.id).then(() => {
      this.loading = false;
      console.log("loaded");
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
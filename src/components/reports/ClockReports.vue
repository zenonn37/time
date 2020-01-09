<template>
  <div>
    <!-- <h1>Clock Reports</h1> -->

    <div v-if="!loading">
      <ClockList :clocks="clock" v-for="clock in clocks" :key="clock.id" />
    </div>
  </div>
</template>

<script>
import ClockList from "@/components/reports/ClockList";
export default {
  components: {
    ClockList
  },

  data() {
    return {
      loading: false
    };
  },
  computed: {
    clocks() {
      return this.$store.getters["time/get_time"];
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
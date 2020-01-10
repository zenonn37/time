<template>
  <div>
    <!-- <h1>Clock Reports</h1> -->

    <div v-if="!loading">
      <transition mode="fade">
        <div v-if="!toggle">
          <ClockList :clocks="clock" v-for="clock in clocks" :key="clock.id" />
        </div>
        <div v-else>Charts</div>
      </transition>
    </div>
  </div>
</template>

<script>
import ClockList from "@/components/reports/ClockList";
export default {
  props: ["nav"],
  components: {
    ClockList
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
<template>
  <div>
    User Reports
    <div>
      <ClockList :clocks="clock" v-for="clock in clocks" :key="clock.id" />
    </div>
  </div>
</template>

<script>
import ClockList from "@/components/reports/ClockList";
export default {
  name: "User_Reports",
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
    this.$store.dispatch("time/get_all_time").then(() => {
      this.loading = false;
    });
  }
};
</script>

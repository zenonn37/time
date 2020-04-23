<template>
  <div>
    User Reports
    <div>
      <div>
        <FilterControl @filter="clockFilter" />
      </div>

      <ClockList :clocks="clock" v-for="clock in clocks" :key="clock.id" />
    </div>
  </div>
</template>

<script>
import ClockList from "@/components/reports/ClockList";
import FilterControl from "@/components/reports/reportsFilter";
export default {
  name: "User_Reports",
  components: {
    ClockList,
    FilterControl
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
  methods: {
    clockFilter(filter) {
      // console.log(filter);

      this.$store.dispatch("time/clockFilter", filter);
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

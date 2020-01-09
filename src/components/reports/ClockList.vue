<template>
  <div class="reports-parent">
    <div class="clock-panel">
      <div class="clock-header">
        <div class="date">{{ today }}</div>

        <div class="time">{{clocks.entries_sum | hours}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["clocks"],
  components: {},
  computed: {
    today() {
      //slice off time of date
      const date = this.clocks.created_at.slice(0, 10);
      //slice off time of date
      const today = moment()
        .format()
        .slice(0, 10);
      //compare DB date with current date
      const bool = moment(date).isSame(today);
      //if true return today else return past formatted date
      if (!bool) {
        return moment(date).format("ddd, D MMM");
      } else {
        return "Today";
      }
    }
  }
};
</script>


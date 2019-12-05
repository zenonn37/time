<template>
  <div class="home">
    <!-- <Countdown /> -->

    <ul>
      <li v-for="hour in hours" :key="hour.id">
        <h3>{{hour.date | date}}</h3>
        {{hour.time | hours}}
      </li>
    </ul>
  </div>
</template>

<script>
// import NewEntry from "@/components/NewEntry";
import moment from "moment";
// import Countdown from "@/components/timers/CountDown";

export default {
  name: "home",
  components: {
    // Countdown
  },
  data() {
    return {
      d_seconds: 0,
      d_minutes: 0,
      d_hours: 0,

      time: "",
      start: "",
      end: "",
      result: "",

      current: []
    };
  },

  computed: {
    hours() {
      return this.$store.getters["time/get_time"];
    }
  },
  methods: {
    //timer function starts clock countup

    saveTime() {
      this.end = moment();
      this.result = this.end.diff(this.start, "minutes");
      let time = [];
      const save = this.total;
      time.push(save);
      this.current.push({
        entry: this.entry,
        time: save
      });
    }
  }
};
</script>

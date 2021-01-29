<template>
  <div class="count-up-parent">
    <div class="edit">
      <i class="far fa-history"></i>
    </div>
    <div class="count-down">
      <div>
        <span>{{ d_hours }}</span
        >: <span>{{ d_minutes }}</span
        >:
        <span>{{ d_seconds }}</span>
      </div>
    </div>
    <div class="clock-controls">
      <transition name="fade" mode="out-in">
        <div v-if="!status" class="play cursor">
          <i class="far fa-play-circle play" @click="timer()"></i>
        </div>

        <div v-else class="stop cursor">
          <i class="far fa-stop-circle" @click="onStopTimer()"></i>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  components: {},

  data() {
    return {
      d_seconds: 0,
      d_minutes: 0,
      d_hours: 0,
      status: false,
      //memory total
      total: 0,
      d_total: 0,
      stop: false,
      stopCountDown: false,
      entry: 0,
      pause: 0,
      save: false,
      interval: "",
      today: "",
      start: "",
      end: "",
    };
  },

  computed: {
    check() {
      //get clock state
      return this.$store.getters["time/get_clock_active"];
    },
  },
  methods: {
    saveMoment() {
      let id = this.$route.params.id;
      //we will check if a daily clock is setup for the project_id and for one per 24hrs
      //refactor move to server
      this.$store.dispatch("time/check_clock_parent", id).then((res) => {
        if (!res.bool) {
          const data = {
            time: this.entry,
            project_id: id,
            start: this.start,
            end: this.end,
            clock_id: res.id,
          };
          this.$store.dispatch("time/entry", data);
        } else {
          const data = {
            time: this.entry,
            project_id: id,
            start: this.start,
            end: this.end,
          };

          this.$store.dispatch("time/new_time", data);
        }
      });
    },
    bosTimer() {
      this.displayTimer();
      this.interval = setInterval(() => {
        ++this.entry;

        if (this.stopCountDown === true) {
          clearInterval(this.interval);
        }

        this.displayTimer();
      }, 1000);
    },
    displayTimer() {
      let entry = this.entry;
      const hour = Math.floor(entry / 3600);
      const minute = Math.floor(entry / 60) % 60;
      const r_seconds = entry % 60;

      this.d_hours = hour < 10 ? `0${hour}` : hour;
      this.d_seconds = r_seconds < 10 ? `0${r_seconds}` : r_seconds;

      this.d_minutes = minute < 10 ? `0${minute}` : minute;

      return `${hour} : ${minute} : 00`;
    },

    onStopTimer() {
      //console.log("stop");
      this.setEnd();
      this.saveMoment();
      if (this.check) {
        this.$store.dispatch("time/clock_active", false);
      }

      this.status = false;
      this.stopCountDown = true;
    },
    onResetTimer() {
      this.d_seconds = 0;
      this.d_minutes = 0;
      this.d_hours = 0;
    },

    setStart() {
      this.start = moment().format("h:mm a");
    },
    setEnd() {
      this.end = moment().format("h:mm a");
    },
    timer() {
      this.entry = 0;
      this.bosTimer();
      this.status = true;
      this.stopCountDown = false;
      // console.log("start");
      if (!this.check) {
        this.$store.dispatch("time/clock_active", true);
      }

      this.setStart();
    },
  },
  created() {
    this.$store.dispatch("time/clock_active", true);
  },
  beforeCreate() {},
  mounted() {
    this.timer();
  },
  beforeDestroy() {
    // this.$emit("save", this.entry);
    // console.log("called");
    // if (this.entry > 0) {
    //   console.log("save time " + this.entry);
    //   this.saveMoment();
    // } else {
    //   console.log("clock not running " + this.entry);
    // }
  },
};
</script>

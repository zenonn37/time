<template>
  <div class="count-up-parent">
    <div class="edit">
      <i class="far fa-edit"></i>
    </div>
    <div class="count-down">
      <div>
        <span>{{d_hours}}</span>:
        <span>{{d_minutes}}</span>:
        <span>{{d_seconds}}</span>
      </div>
    </div>
    <div class="clock-controls">
      <transition name="fade" mode="out-in">
        <div v-if="!status" class="play">
          <i class="far fa-play-circle play" @click="timer()"></i>
        </div>

        <div v-else class="stop">
          <i class="far fa-stop-circle" @click="onStopTimer()"></i>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
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
      today: ""
    };
  },

  computed: {},
  methods: {
    saveMoment() {
      let id = this.$route.params.id;
      const data = {
        time: this.entry,
        project_id: id
      };
      this.$store.dispatch("time/new_time", data);
    },
    bosTimer() {
      //let seconds = this.save === true ? this.pause : this.entry;

      //const now = Date.now();
      //const then = now + seconds * 1000;
      //console.log({ now, then });
      this.displayTimer();
      this.interval = setInterval(() => {
        //const secondsLeft = Math.round((then - Date.now()) / 1000);
        ++this.entry;

        //console.log(this.entry);

        //check to stop
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

    // setTime() {
    //   let min = parseInt(this.count.d_minutes);
    //   let hour = parseInt(this.count.d_hours);
    //   let hours = hour > 0 ? hour * 3600 : 0;
    //   let minutes = min > 0 ? min * 60 : 0;

    //   this.sec_h = hours;
    //   this.sec_m = minutes;

    //   let total = hours + minutes;
    //   // console.log(total);

    //   this.entry = total;
    // },

    onStopTimer() {
      //this.stopCountDown = true;
      console.log("stop");
      this.saveMoment();

      this.status = false;
      this.stopCountDown = true;
    },
    onResetTimer() {
      //this.stopCountDown = true;

      this.d_seconds = 0;
      this.d_minutes = 0;
      this.d_hours = 0;
      // this.save = false;
      // this.pause = 0;
    },
    // onPause() {
    //   let current = this.entry;
    //   this.pause = current;
    //   this.save = false;
    //   this.stopCountDown = true;
    // },
    // onResume() {
    //   this.save = true;
    //   this.bosTimer();
    // },

    timer() {
      //this.onResetTimer();
      this.entry = 0;
      this.bosTimer();
      this.status = true;
      this.stopCountDown = false;
      console.log("start");
    }
  }
};
</script>


<template>
  <div class="count-down-parent">
    <div class="count-down">
      <div>
        <span>{{d_hours}}0:</span>
        <span>{{d_minutes}}0:</span>
        <span>{{d_seconds}}0</span>
      </div>

      <div class="count-start" @click="timer()">
        <i class="far fa-play-circle play"></i>
      </div>

      <div class="time">
        <form @submit.prevent="onCountDown()">
          <!-- 
          <input type="submit" value="Set Time" />
          <input type="button" value="Start" @click="timer()" />
          <input type="button" value="Stop" @click="onStopTimer()" />
          <input type="button" value="Reset" @click="onResetTimer()" />
          <input type="button" value="Pause" @click="onPause()" />
          <input type="button" value="Resume" @click="onResume()" />-->
        </form>
        <!-- <div>{{userTime}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["seconds"],
  components: {},

  data() {
    return {
      d_seconds: 0,
      d_minutes: 0,
      d_hours: 0,
      count: {
        d_minutes: "",
        d_hours: ""
      },

      time: "",
      start: "",
      end: "",
      result: "",
      interval: "",
      //memory total
      total: 0,
      d_total: 0,
      stop: false,
      stopCountDown: false,

      entry: this.seconds,
      pause: 0,
      save: false,
      today: ""
    };
  },

  computed: {
    userTime() {
      return this.displayTimer(this.entry);
    }
  },
  methods: {
    onCountDown() {
      this.setTime();
      this.hour = parseInt(this.count.d_hours);
      this.minutes = parseInt(this.count.d_minutes);
    },

    bosTimer() {
      let seconds = this.save === true ? this.pause : this.entry;
      this.stopCountDown = false;
      const now = Date.now();
      const then = now + seconds * 1000;
      console.log({ now, then });
      this.displayTimer();
      this.interval = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        --this.entry;

        console.log(this.entry);

        //check to stop
        if (secondsLeft < 1 || this.stopCountDown === true) {
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

    setTime() {
      let min = parseInt(this.count.d_minutes);
      let hour = parseInt(this.count.d_hours);
      let hours = hour > 0 ? hour * 3600 : 0;
      let minutes = min > 0 ? min * 60 : 0;

      this.sec_h = hours;
      this.sec_m = minutes;

      let total = hours + minutes;
      console.log(total);

      this.entry = total;
    },

    onStopTimer() {
      this.stopCountDown = true;
    },
    onResetTimer() {
      this.stopCountDown = true;
      this.count.d_hours = 0;
      this.count.d_minutes = 0;
      this.d_seconds = 0;
      this.d_minutes = 0;
      this.d_hours = 0;
      this.save = false;
      this.pause = 0;
    },
    onPause() {
      let current = this.entry;
      this.pause = current;
      this.save = false;
      this.stopCountDown = true;
    },
    onResume() {
      this.save = true;
      this.bosTimer();
    },

    timer() {
      this.onResetTimer();
      this.bosTimer();
    }
  }
};
</script>


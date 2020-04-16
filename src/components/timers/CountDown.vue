<template>
  <div class="count-down-parent">
    <div class="count-down">
      <div class="clock-down">
        <span>
          {{ d_hours }}
          <span class="time-dots">:</span>
        </span>
        <span>
          {{ d_minutes }}
          <span class="time-dots">:</span>
        </span>
        <span>{{ d_seconds }}</span>
      </div>

      <div class="count-start cursor" @click="timer()">
        <img src="/images/play.png" alt="Play Icon" />
      </div>

      <!-- <div class="button-group"> -->
      <!-- <div class="pause cursor" @click="onPause">
          <i class="fas fa-pause"></i>
      </div>-->
      <!-- <div class="resume cursor" @click="onResume">
          <img src="/images/play.png" alt="Play Icon" />
      </div>-->
      <!-- <div class="stop cursor" @click="onStopTimer">
          <i class="fas fa-stop"></i>
      </div>-->
      <!-- </div> -->

      <div class="time">
        <form @submit.prevent="onCountDown()"></form>
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
      //timer toggle
      on: false,
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
    },
    store_time() {
      return this.$store.getters["task/get_seconds"];
    },
    store_stop() {
      return this.$store.getters["task/get_stop"];
    }
  },
  methods: {
    onCountDown() {
      this.setTime();
      this.hour = parseInt(this.count.d_hours);
      this.minutes = parseInt(this.count.d_minutes);
    },

    bosTimer() {
      //needs refactor to use pause functions, next release
      // const sec = this.seconds;
      // let seconds = this.save === true ? this.pause : sec;
      this.stopCountDown = false;
      // const now = Date.now();
      // const then = now + seconds * 1000;
      //console.log({ now, then });
      this.displayTimer();
      this.interval = setInterval(() => {
        // let secondsLeft = Math.round((then - Date.now()) / 1000);
        --this.entry;
        this.$store.dispatch("task/count_seconds");
        // --this.store_time;

        // console.log(this.entry + " state entry");
        // console.log(secondsLeft + " seconds left");

        //check to stop
        if (
          this.entry === 0 ||
          this.stopCountDown === true ||
          this.store_stop === true
        ) {
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
      this.on = true;
      this.onResetTimer();
      this.bosTimer();
      this.$store.dispatch("task/set_seconds", this.seconds);
    },
    audio() {
      var audio = new Audio(
        require("../../assets/bells-tibetan-daniel_simon.mp3")
      );
      audio.play();
    }
  },
  watch: {
    store_time(value) {
      if (value <= 0) {
        this.$emit("save");
        this.audio();
      }
    }
  },
  created() {
    this.timer();
  },
  beforeDestroy() {
    this.stopCountDown = true;
  }
};
</script>

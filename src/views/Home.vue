<template>
  <div class="home">
    <h1>Timer</h1>

    <!-- <h2>
      <span>{{hour}}</span>:
      <span>{{minutes}}</span>:
      <span>{{seconds}}</span>
    </h2>-->
    <h1>Countdown</h1>

    <h2 v-if="d_seconds < 1">
      <span>00</span> :
      <span>00</span> :
      <span>00</span>
    </h2>

    <h2 v-else>
      <span>{{d_hours}}</span>:
      <span>{{d_minutes}}</span>:
      <span>{{d_seconds}}</span>
    </h2>

    <div class="time">
      <form @submit.prevent="onCountDown()">
        <input type="text" v-model.trim="count.d_hours" />
        <input type="text" v-model.trim="count.d_minutes" />

        <input type="submit" value="Set Time" />
        <input type="button" value="Stop Time" @click="onStopTimer()" />
        <input type="button" value="Reset" @click="onResetTimer()" />
        <input type="button" value="Pause" @click="onPause()" />
        <input type="button" value="Resume" @click="onResume()" />
      </form>
    </div>
    <h6>Today:{{ today }}</h6>
    <button @click="timer()">Start</button>
    <p>
      <!-- <NewEntry @entry="newTimer" /> -->
    </p>
    <p>{{current}}</p>
    <button @click="saveTime()">Stop/Save</button>
  </div>
</template>

<script>
// import NewEntry from "@/components/NewEntry";
import moment from "moment";

//import numeral from "numeral";

export default {
  name: "home",
  components: {
    // NewEntry
  },
  data() {
    return {
      d_seconds: 0,
      d_minutes: 0,
      d_hours: 0,
      count: {
        d_minutes: 0,
        d_hours: 0
      },

      hour: 0,
      minutes: 0,
      seconds: 0,
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
      current: [],
      entry: "",
      pause: 0,
      save: false,
      today: ""
    };
  },

  computed: {},
  methods: {
    onCountDown() {
      this.setTime();
    },

    bosTimer() {
      let seconds = this.save === true ? this.pause : this.entry;
      this.stopCountDown = false;
      const now = Date.now();
      const then = now + seconds * 1000;
      console.log({ now, then });
      this.displayTimer(seconds);
      this.interval = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        this.entry--;
        //check to stop
        if (secondsLeft < 1 || this.stopCountDown === true) {
          clearInterval(this.interval);
        }

        this.displayTimer(secondsLeft);
      }, 1000);
    },
    displayTimer(seconds) {
      let minutes = Math.floor(seconds / 60);
      const hour = Math.floor(seconds / 3600);
      const min = minutes > 59 ? 59 : minutes;
      const r_seconds = seconds % 60;

      this.d_hours = hour < 10 ? `0${hour}` : hour;
      this.d_seconds = r_seconds < 10 ? `0${r_seconds}` : r_seconds;

      this.d_minutes = min < 10 ? `0${min}` : min;
    },

    setTime() {
      let min = parseInt(this.count.d_minutes);
      let hour = parseInt(this.count.d_hours);
      let hours = hour > 0 ? hour * 3600 : 0;
      let minutes = min > 0 ? min * 60 : 0;

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
      console.log("pressed");
    },

    //timer function starts clock countup
    timer() {
      this.onResetTimer();
      this.bosTimer();

      // this.countDown();
      // this.runClock();
      this.start = moment();
      this.stop = false;
      this.total = 0;
      let seconds = 0;
      let minutes = 0;
      let hours = 0;

      let timer = setInterval(() => {
        seconds++;
        this.total++;
        if (seconds == 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes == 60) {
          hours++;
          minutes = 0;
        }

        this.seconds = seconds;
        this.minutes = minutes;
        this.hours = hours;

        hours++;
        if (this.stop === true) {
          clearInterval(timer);
          this.seconds = 0;
          this.minutes = 0;
          this.hours = 0;
        }
      }, 1000);
    },
    totalTime() {
      const seconds = [];
      this.current.map(t => {
        // console.log(t.time);
        seconds.push(t.time);
      });
      let total = seconds.reduce((curr, acc) => {
        return curr + acc;
      }, 0);

      // console.log(total);

      let sec = 0;
      let minutes = 0;
      let hours = 0;

      if (total >= 3600) {
        hours = total / 60 / 60;
      } else if (total < 3600 && total >= 59) {
        minutes = total / 60;
      } else {
        sec = total;
      }
      // console.log(minutes);

      this.today = hours + ":" + Math.round(minutes) + ":" + sec;
    },
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
      this.total = 0;

      // console.log(time);
      this.stop = true;
      this.totalTime();
    }
  }
};
</script>

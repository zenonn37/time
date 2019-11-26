<template>
  <div class="home">
    <h1>Timer</h1>

    <h2>
      <span>{{hour}}</span>:
      <span>{{minutes}}</span>:
      <span>{{seconds}}</span>
    </h2>
    <h1>Countdown</h1>

    <h2>
      <span>{{uid_hours}}</span>:
      <span>{{uid_minutes}}</span>:
      <span>{{uid_seconds}}</span>
    </h2>
    <div class="time">
      <form @submit.prevent="onCountDown()">
        <input type="number" v-model.trim="count.d_hours" />
        <input type="number" v-model.trim="count.d_minutes" />

        <input type="submit" value="Set Time" />
        <input type="button" value="Stop Time" @click="onStopTimer()" />
        <input type="button" value="Reset" @click="onResetTimer()" />
      </form>
    </div>
    <h6>Today:{{ today }}</h6>
    <button @click="timer()">Start</button>
    <p>
      <NewEntry @entry="newTimer" />
    </p>
    <p>{{current}}</p>
    <button @click="saveTime()">Stop/Save</button>
  </div>
</template>

<script>
import NewEntry from "@/components/NewEntry";
import moment from "moment";

export default {
  name: "home",
  components: {
    NewEntry
  },
  data() {
    return {
      count: {
        d_seconds: 0,
        d_minutes: 0,
        d_hours: 0
      },
      uid_seconds: 0,
      uid_minutes: 0,
      uid_hours: 0,
      countD: false,
      hour: 0,
      minutes: 0,
      seconds: 0,
      time: "",
      start: "",
      end: "",
      result: "",
      //memory total
      total: 0,
      d_total: 0,
      stop: false,
      current: [],
      entry: "",
      today: ""
    };
  },

  computed: {},
  methods: {
    onCountDown() {
      //set user time to doTimeMath()
      this.doTimeMath(this.count.d_hours, this.count.d_minutes);
    },
    onStopTimer() {
      this.countD = true;
    },
    onResetTimer() {
      this.uid_hours = 0;
      this.uid_minutes = 0;
      this.uid_seconds = 0;
    },
    //parse user time to seconds
    doTimeMath(hou, min) {
      let hours = parseInt(hou);
      let minute = parseInt(min);

      let hour = hours > 0 ? hours * 3600 : 0;
      let minutes = minute > 0 ? minute * 60 : 0;

      let seconds = hour + minutes;

      this.countDown(seconds);

      console.log(seconds);
    },
    newTimer(value) {
      this.entry = value;
      this.timer();
    },
    //timer function countdown
    countDown(sec) {
      let user = sec;
      let seconds = 60;
      let hours = sec >= 3600 ? sec / 3600 : 0;
      let minutes = sec / 60;

      // seconds = sec;
      this.uid_seconds = seconds;
      this.uid_minutes = minutes >= 60 ? 60 : minutes;
      this.uid_hours = hours;
      let timer = setInterval(() => {
        seconds--;

        console.log(seconds);
        this.uid_seconds = seconds;
        if (seconds === 0) {
          seconds = 60;
          minutes--;
          this.uid_minutes = minutes;
        }
        if (minutes === 0) {
          hours--;
          minutes = 60;
          this.uid_hours = hours;
        }

        if (user === 0 || this.countD === true) {
          clearInterval(timer);
        }
      }, 1000);
    },
    //timer function starts clock countup
    timer() {
      this.countDown();
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
        console.log(t.time);
        seconds.push(t.time);
      });
      let total = seconds.reduce((curr, acc) => {
        return curr + acc;
      }, 0);

      console.log(total);

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
      console.log(minutes);

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

      console.log(time);
      this.stop = true;
      this.totalTime();
    }
  }
};
</script>

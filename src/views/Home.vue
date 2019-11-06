<template>
  <div class="home">
    <h1>Timer</h1>

    <h4>{{hour}}:{{minutes}}:{{seconds}}</h4>
    <h6>Today:{{ today}}</h6>
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
export default {
  name: "home",
  components: {
    NewEntry
  },
  data() {
    return {
      hour: 0,
      minutes: 0,
      seconds: 0,
      time: "",
      //memory total
      total: 0,
      stop: false,
      current: [],
      entry: "",
      today: ""
    };
  },

  computed: {},
  methods: {
    newTimer(value) {
      this.entry = value;
      this.timer();
    },
    timer() {
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
      }, 500);
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
      } else if (total < 3600 && total >= 60) {
        minutes = total / 60;
      } else {
        sec = total;
      }
      this.today = hours + ":" + Math.round(minutes) + ":" + sec;
    },
    saveTime() {
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

<template>
  <div class="reports-parent">
    <div class="clock-panel">
      <div class="clock-header">
        <div class="date">{{ today }}</div>

        <div class="time">{{clocks.entries_sum | hours}}</div>
      </div>
      <div class="clock-footer">
        <div class="clock-entries">
          <div class="clock-btn cursor" @click="onShowEntry()">{{clocks.entries_count}}</div>
          <p>Clock Entries</p>
        </div>

        <div class="clock-icon"></div>
      </div>
      <div class="entry-container">
        <div :class="[entry ?  'expands': 'entries']">
          <transition name="fade">
            <div class="grouped-entries" v-if="entry">
              <EntryList :entrys="clocks.entries" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
//import GSAP from "gsap";
import EntryList from "@/components/reports/EntryList";
export default {
  props: ["clocks"],
  name: "ClockList",
  components: {
    EntryList
  },
  data() {
    return {
      entry: false
    };
  },
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
  },
  methods: {
    onShowEntry() {
      this.entry = !this.entry;
      // GSAP.to(".clock-panel", {
      //   height: 100,
      //   duration: 1
      // });
    }
  }
};
</script>


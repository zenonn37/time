<template>
  <div>
    <!-- <h1>Clock Reports</h1> -->

    <div v-if="!loading">
      <transition name="fade">
        <div v-if="!toggle">
          <div v-if="clocks.length >= 1">
            <ClockList
              :clocks="clock"
              v-for="clock in clocks"
              :key="clock.id"
            />
          </div>
          <div class="time-entry-empty" v-else>
            <div>
              <div>No Time Entries Yet</div>
              <img src="@/assets/images/empty.svg" alt />
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="report-filter-parent"
            v-if="!loading && charts.time.length >= 1"
          >
            <i class="fas fa-sync cursor" @click="onResetTask()"></i>
            <i @click="onSetRange()" class="fas fa-search cursor"></i>

            <div>
              <datetime
                placeholder="Start Date"
                v-model="start_clock"
                value-zone="America/New_York"
                :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
              ></datetime>
            </div>
            <div>
              <datetime
                placeholder="End Date"
                v-model="end_clock"
                value-zone="America/New_York"
                :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
              ></datetime>
            </div>
          </div>
          <div v-if="charts.time.length >= 1">
            <Bar :chart="charts" />
          </div>
          <div class="time-entry-empty" v-else>
            <div>
              <div>No Chart Data Yet.</div>
              <img src="@/assets/images/charts.svg" alt />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ClockList from "@/components/reports/ClockList";
import Bar from "@/components/charts/Bar";
import moment from "moment";
export default {
  name: "ClockReports",
  props: ["nav"],
  components: {
    ClockList,
    Bar,
  },

  data() {
    return {
      loading: false,
      start_clock: "",
      end_clock: "",
      //toggle: this.nav
    };
  },
  computed: {
    clocks() {
      return this.$store.getters["time/get_time"];
    },

    charts() {
      const data = this.$store.getters["time/get_chart"];
      //int arrrays to split data from DB
      const dates = [];
      const time = [];

      //use foreach to clean up dates and push result
      data.forEach((el) => {
        dates.push(moment(el.new_entry).format("MM-DD-YY"));
      });

      //use foreach to convert seconds to hours and push result
      data.forEach((el) => {
        if (parseInt(el.seconds) < 3600) {
          time.push(0);
        } else {
          time.push(Math.round(parseInt(el.seconds) / 3600));
        }
      });

      return {
        dates,
        time,
      };
    },

    toggle() {
      return this.nav;
    },
  },
  methods: {
    warningToast() {
      this.$toast.open({
        message: "Date Range fields cannot be empty.",
        type: "info",
        position: "top",
      });
    },

    onSetRange() {
      if (this.start_clock === "" || this.end_clock === "") {
        this.warningToast();
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("time/filter_clock_chart_project", {
          id: this.$route.params.id,
          start: this.start_clock.slice(0, 19).replace(" T ", " "),
          end: this.end_clock.slice(0, 19).replace(" T ", " "),
        })
        .then(() => {
          this.loading = false;
        });
    },
    onResetTask() {
      this.taskCall();
    },
    taskCall() {
      this.loading = true;
      this.$store
        .dispatch("time/clock_chart_project", this.$route.params.id)
        .then(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.taskCall();
    this.$store.dispatch("time/get_time", this.$route.params.id).then(() => {
      this.loading = false;
    });
  },
};
</script>

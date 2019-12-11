<template>
  <header class="header-parent">
    <div class="header-container">
      <div class="header-content">
        <template v-if="!active_task">
          <form @submit.prevent="setTask()">
            <div class="task">
              <input type="text" v-model.trim="task" placeholder="Enter Task" />
            </div>
            <div class="new-time">
              <input type="text" v-model.trim="hour" placeholder="Hours" />
              <!-- <span>:</span> -->
              <input type="text" v-model.trim="min" placeholder="Mins" />
              <input type="submit" value="GO" />
            </div>
          </form>
        </template>

        <template v-else>
          <i class="fas fa-tasks"></i>

          Task in Progress
        </template>
        <!-- <div class="timer">
          <CountUp @new="saveCurrentCount" />
        </div>-->
      </div>
    </div>
  </header>
</template>

<script>
// import CountUp from "@/components/timers/CountUp";
// import vSelect from "vue-select";

export default {
  components: {
    // CountUp
    // vSelect
  },
  data() {
    return {
      task: "",
      hour: "",
      min: ""
    };
  },
  computed: {
    active_task() {
      return this.$store.getters["task/active_status"];
    }
  },
  methods: {
    saveCurrentCount(value) {
      console.log("called");

      console.log(value);
      this.$store.dispatch("time/new_time", value);
    },
    setTask() {
      if (this.active_task) {
        return false;
      }
      const hour = this.hour !== "" || this.hour !== 0 ? this.hour * 3600 : 0;
      const min = this.min !== "" || this.min !== 0 ? this.min * 60 : 0;
      console.log(hour);

      const data = {
        task: this.task,
        seconds: hour + min,
        project_id: this.$route.params.id
      };

      if (data.seconds < 300) {
        //console.log("Task requires at least five minutes to start tracking");
        this.$toast.open({
          message: "Task requires at least five minutes to start tracking",
          type: "warning",
          position: "top"
        });
        return false;
      }

      console.log(data);

      this.$store.dispatch("task/active_task", data);
      this.task = "";
      this.hour = "";
      this.min = "";
    }
  }
};
</script>


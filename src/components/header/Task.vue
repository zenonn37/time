<template>
  <div>
    <template v-if="!active_task">
      <form @submit.prevent="setTask()">
        <div class="back-btn cursor" @click="onBack()">
          <i class="fas fa-chevron-left"></i>
        </div>
        <div class="task">
          <input type="text" v-model.trim="name" placeholder="Enter Task" />
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
  </div>
</template>

<script>
export default {
  components: {
    // CountUp
    // vSelect
  },
  data() {
    return {
      name: "",
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
    onBack() {
      this.$router.push("/home");
    },
    saveCurrentCount(value) {
      this.$store.dispatch("time/new_time", value);
    },
    setTask() {
      if (this.active_task) {
        return false;
      }
      const hour = this.hour !== "" || this.hour !== 0 ? this.hour * 3600 : 0;
      const min = this.min !== "" || this.min !== 0 ? this.min * 60 : 0;

      const data = {
        name: this.name,
        seconds: hour + min,
        project_id: this.$route.params.id
      };

      if (data.seconds < 60) {
        //console.log("Task requires at least five minutes to start tracking");
        this.$toast.open({
          message:
            "Task's require at least a two minute duration to start tracking",
          type: "warning",
          position: "top"
        });
        return false;
      }

      this.$store.dispatch("task/active_task", data);
      this.name = "";
      this.hour = "";
      this.min = "";
    }
  }
};
</script>


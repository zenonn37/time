<template>
  <div class="new-task-parent">
    <template v-if="!active_task">
      <form @submit.prevent="setTask()">
        <div class="new-task-container">
          <div>
            <ValidationProvider
              name="Task Name"
              rules="required|min:2|max:40|alpha_spaces"
              v-slot="{errors}"
            >
              <input type="text" v-model.trim="name" placeholder="Enter Task" />
              <span class="errors">{{errors[0]}}</span>
            </ValidationProvider>
          </div>
          <div>
            <select v-model="hour" name="hour">
              <option value="0" selected>0</option>
              <option v-for="hour in time" :key="hour" :value="hour">{{hour}}</option>
            </select>
          </div>
          <div>
            <select v-model="min" name="min">
              <option value="0" selected>0</option>
              <option v-for="m in mins" :key="m" :value="m">{{m}}</option>
            </select>
          </div>
        </div>
        <div class="new-task-submit">
          <input type="submit" value="Start Task" />
          <input type="button" @click="onCancel()" value="Cancel" />
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
import { hours, minutes } from "@/models/hours";
export default {
  components: {
    // CountUp
    // vSelect
  },
  data() {
    return {
      name: "",
      hour: 0,
      min: 0,
      time: hours,
      mins: minutes
    };
  },
  computed: {
    active_task() {
      return this.$store.getters["task/active_status"];
    }
  },
  methods: {
    onCancel() {
      this.$emit("cancel");
    },
    onBack() {
      this.$router.push("/home");
    },
    saveCurrentCount(value) {
      this.$store.dispatch("time/new_time", value);
    },
    setTask() {
      //cannot start another task, while another task is active end function!
      if (this.active_task) return false;

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
      this.$emit("cancel");

      this.name = "";
      this.hour = "";
      this.min = "";
    }
  }
};
</script>


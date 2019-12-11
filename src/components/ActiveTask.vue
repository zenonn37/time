<template>
  <div>
    <transition name="fade" mode="out-in">
      <template v-if="!active">No Task</template>

      <template v-else>
        <div class="task-parent">
          <div class="task-container">
            <div class="task-top">
              <div class="activity-name">
                <h6>Active Task</h6>
                <span>{{task.task}}</span>
              </div>
            </div>
            <div class="activity-mid">
              <CountDown :seconds="task.seconds" />
            </div>

            <div class="activity-end">
              <div @click="onDelete()">Delete</div>

              <div>
                <div @click="onComplete()">Save</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </transition>
  </div>
</template>


<script>
import CountDown from "@/components/timers/CountDown";
export default {
  components: {
    CountDown
  },

  computed: {
    task() {
      return this.$store.getters["task/get_active_tasks"];
    },
    active() {
      return this.$store.getters["task/active_status"];
    }
  },
  methods: {
    onComplete() {
      //this.$store.dispatch("task/set_active_task", false);
      this.$store.dispatch("task/save_active_task");
    },
    onDelete() {
      this.$store.dispatch("task/delete_active_task");
    }
  }
};
</script>


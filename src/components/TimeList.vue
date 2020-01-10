<template>
  <div class="task-list-parent">
    <transition name="fade" mode="out-in">
      <div v-if="edit" class="edit-task">
        <EditTask :task="hour" @close="close" @save="save" />
      </div>
    </transition>

    <div class="task-top">
      <div class="task-title">
        <div class="task-title-sub cursor" @click="onDelete(hour.id)">
          <h6>Task</h6>
          <i class="fas fa-trash"></i>
        </div>

        <span @click="edit = !edit" class="cursor">
          {{hour.name}}
          <i class="fas fa-edit"></i>
        </span>
      </div>
      <div class="task-dates">
        <h6>Ended</h6>
        <span class="from-now">{{hour.complete | current}}</span>
      </div>
    </div>
    <div class="task-mid">
      <div class="not-complete" v-if="!hour.completed">
        <i class="far fa-sad-tear"></i>
      </div>

      <div v-else-if="hour.completed && hour.actual > 0" class="complete-early">
        <i class="fas fa-running"></i>

        <i class="far fa-check-circle"></i>
      </div>

      <div v-else class="complete">
        <i class="far fa-check-circle"></i>
      </div>
    </div>
    <div class="task-bottom">
      <div class="task-details">
        <h6>Goal</h6>
        <span :class="[hour.actual !== 0  ? 'not-complete':'complete' ]">{{hour.goal | hours}}</span>
      </div>
      <div class="task-details">
        <h6>Status</h6>
        <span v-if="hour.completed && hour.actual < 1" class="success">Complete</span>
        <span v-else-if="hour.completed && hour.actual > 0" class="success">Early</span>
        <span v-else class="warning">Incomplete</span>
      </div>
      <div class="task-details">
        <h6>Remaining</h6>
        <span :class="[hour.actual !== 0  ? 'warning':'success' ]">{{hour.actual | hours}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import EditTask from "@/components/forms/EditTask";
export default {
  props: ["hour"],
  components: {
    EditTask
  },
  data() {
    return {
      edit: false
    };
  },
  methods: {
    close() {
      this.edit = false;
    },
    onDelete(id) {
      console.log("delete");
      const ids = parseInt(id);
      this.$store.dispatch("task/delete_task", ids).then(() => {
        console.log("deleted");
      });
    },
    save(value) {
      console.log(value);
      this.$store.dispatch("task/edit_task", value).then(() => {
        this.edit = false;
        //refactor to call this function within module!!
        this.$store.dispatch("task/set_tasks", this.$route.params.id);
      });
    }
  }
};
</script>

 
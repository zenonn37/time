<template>
  <div class="task-list-parent">
    <div v-if="edit" class="edit-task">
      <EditTask :task="hour.name" />
    </div>

    <div class="task-top">
      <div class="task-title">
        <h6>Completed Task</h6>
        <span @click="edit = !edit">
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
      <div class="not-complete" v-if="hour.actual !== 0">{{hour.actual | hours}}</div>

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
        <span v-if="hour.completed" class="success">Complete</span>
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
  }
};
</script>

 
<template>
  <div class="panel-parent">
    <div class="panel-container">
      <div class="panel-top">
        <div class="panel-date">
          <h6>Project</h6>
          <h3 class="title">{{project.name}}</h3>
          <h6>
            Status:
            <span class="complete" v-if="project.completed">Completed</span>
            <span class="incomplete" v-else>On Going</span>
          </h6>
        </div>
        <div class="panel-time">
          <h6>Total Hours</h6>
          <span class="hours">{{project.total | hours}}</span>
        </div>
      </div>
      <div class="panel-bottom">
        <div class="panel-task">
          <h6>Project Tasks</h6>
          <div class="box-task">{{project.tasks}}</div>
        </div>
        <div class="panel-goal">
          <h6>Time Goal</h6>
          <span>{{project.goal | hours}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["project"]
};
</script>

 
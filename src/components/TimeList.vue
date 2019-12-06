<template>
  <div class="panel-parent">
    <div class="panel-container">
      <div class="panel-top">
        <div class="panel-date">
          <h6>Task</h6>
          <h3>{{hour.name}}</h3>
        </div>
        <div class="panel-dates">
          <h6>Date</h6>
          <span class="from-now">{{hour.date | current}}</span>
        </div>
      </div>
      <div class="panel-bottom">
        <div class="panel-task"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hour"]
};
</script>

 
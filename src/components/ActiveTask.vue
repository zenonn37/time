<template>
  <div class="panel-parent">
    <div class="panel-container">
      <div class="panel-top">
        <div class="activity-name">
          <h6>Active Task</h6>
          <span>Cover Page</span>
        </div>
        <div class="panel-time">
          <h6>Total Hours</h6>
          <span class="hours">05:56:12</span>
        </div>
      </div>
      <div class="activity-bottom">
        <CountDown />
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from "@/components/timers/CountDown";
export default {
  components: {
    CountDown
  }
};
</script>


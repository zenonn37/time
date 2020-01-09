<template>
  <div>
    <div class="clock-header">
      <div class="project-timer">
        <CountUp />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import CountUp from "@/components/timers/CountUp";
export default {
  components: {
    CountUp
  }
};
</script>


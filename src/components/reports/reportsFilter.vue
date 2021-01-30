<template>
  <div class="user-report-filter">
    <ul>
      <li @click="filter(0)">1d</li>
      <li @click="filter(7)">7d</li>
      <li @click="filter(30)">30d</li>
      <li @click="filter(90)">3m</li>
      <li @click="filter(183)">6m</li>
      <li @click="filter(365)">Year</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    filter(num) {
      this.$emit("filter", num);
    }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="user-report-filter">
    <ul>
      <li @click="filter(0)">24hrs</li>
      <li @click="filter(3)">3d</li>
      <li @click="filter(7)">7d</li>
      <li @click="filter(14)">14d</li>
      <li @click="filter(30)">30d</li>
      <li @click="filter(52)">All</li>
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

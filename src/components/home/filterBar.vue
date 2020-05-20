<template>
  <div>
    <ul>
      <li class="cursor" v-if="!complete" @click="toggleStatus()">Complete</li>
      <li class="cursor" v-if="complete" @click="toggleStatus()">On Going</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      complete: false
    };
  },
  methods: {
    toggleStatus() {
      this.complete = !this.complete;
      this.$emit("status", this.complete);
    }
  }
};
</script>


<template>
  <form @submit.prevent="editTask()">
    <!-- <div class="back-btn cursor" @click="onBack()">
      <i class="fas fa-chevron-left"></i>
    </div>-->
    <div class="task">
      <input type="text" v-model.trim="name" placeholder="Enter Task" />
    </div>
    <div class="new-time">
      <input type="submit" value="GO" />
    </div>
  </form>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      name: this.task
    };
  }
};
</script>

<style scoped>
</style>
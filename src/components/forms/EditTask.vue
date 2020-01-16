<template>
  <form @submit.prevent="editName()">
    <div class="back-btn cursor" @click="closeTask()">
      <i class="fas fa-times-circle"></i>
    </div>
    <div class="task">
      <input type="text" v-model.trim="edit.name" placeholder="Edit Task" />
    </div>
    <div class="new-time">
      <input type="submit" value="Complete" />
    </div>
  </form>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      edit: {
        name: this.task.name,
        id: this.task.id
      }
    };
  },
  methods: {
    closeTask() {
      this.$emit("close", false);
    },
    editName() {
      this.$emit("save", this.edit);
    }
  }
};
</script>

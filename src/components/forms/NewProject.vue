<template>
  <div class="mini-forms">
    <form @submit.prevent="onSubmit()">
      <div class="form-input">
        <input type="text" v-model.trim="projects.name" placeholder="Project Title" />
      </div>

      <div class="form-input">
        <input type="text" v-model.trim="projects.goal" placeholder="Duration Goal" />
      </div>

      <div class="form-btns form-input">
        <input type="submit" value="Complete" />
        <input type="button" value="Cancel" @click="onCancel()" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: {
        name: "",
        goal: ""
      }
    };
  },

  methods: {
    onSubmit() {
      this.$store.dispatch("projects/new_projects", this.projects);
    },
    onCancel() {
      this.$emit("cancel", false);
    }
  }
};
</script>

<style scoped>
</style>
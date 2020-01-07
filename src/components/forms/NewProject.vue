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
      //set conditions for goal, needs to be in seconds
      const userSeconds = this.projects.goal;
      if (userSeconds < 1) {
        this.$toast.open({
          message: "Project Goal require's at least a one hour duration.",
          type: "warning",
          position: "top"
        });

        return false;
      }

      const seconds = userSeconds * 3600;

      const data = {
        name: this.projects.name,
        goal: seconds
      };

      this.$store.dispatch("projects/new_projects", data).then(() => {
        this.$emit("cancel", false);

        this.name = "";
        this.goal = "";
      });
    },
    onCancel() {
      this.$emit("cancel", false);
    }
  }
};
</script>

<style scoped>
</style>
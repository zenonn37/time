<template>
  <div class="mini-forms">
    <form @submit.prevent="onSubmit()">
      <div class="form-input">
        <input type="text" v-model.trim="edit.name" placeholder="Project Title" />
      </div>

      <div class="form-input">
        <input type="text" v-model.trim="edit.goal" placeholder="Duration Goal" />
      </div>

      <div class="form-btns form-input">
        <input class="cursor" type="submit" value="Complete" />
        <input class="cursor" type="button" value="Cancel" @click="onCancel()" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      edit: {
        name: this.data.name,
        goal: this.data.goal / 3600
      }
    };
  },

  methods: {
    onSubmit() {
      //set conditions for goal, needs to be in seconds
      const userSeconds = this.edit.goal;
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
        name: this.edit.name,
        goal: seconds,
        id: this.data.id
      };

      this.$store.dispatch("projects/edit_projects", data).then(() => {
        this.$emit("cancel", false);
      });
    },
    onCancel() {
      this.$emit("cancel", false);
    }
  }
};
</script>


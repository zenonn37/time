<template>
  <div class="mini-forms">
    <ValidationObserver
      ref="observer"
      tag="form"
      v-slot="{ valid }"
      @submit.prevent="onSubmit()"
    >
      <div class="form-input">
        <ValidationProvider
          name="Name"
          rules="required|min:3|max:40|alpha_spaces"
          v-slot="{ errors }"
        >
          <input
            type="text"
            v-model.trim="projects.name"
            placeholder="Project Title"
          />
          <span class="errors">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-input">
        <ValidationProvider
          name="Goal"
          rules="required|min:1|max:3|numeric"
          v-slot="{ errors }"
        >
          <input
            type="text"
            v-model.trim="projects.goal"
            placeholder="Duration Goal"
          />
          <span class="errors">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-btns form-input">
        <button v-if="!valid" class="div-btn cursor">Disabled</button>

        <button v-else class="div-btn cursor" type="submit">Complete</button>

        <button class="cursor cancel" type="button" @click="onCancel()">
          Cancel
        </button>
      </div>
    </ValidationObserver>
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

  computed: {},

  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      //this.$emit("login", this.login);
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });

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

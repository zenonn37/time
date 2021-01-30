<template>
  <ValidationObserver
    ref="observer"
    tag="form"
    v-slot="{ valid }"
    @submit.prevent="onSubmit()"
  >
    <div class="form-field">
      <ValidationProvider
        name="Email"
        rules="required|email"
        v-slot="{ errors }"
      >
        <input type="email" v-model="login.username" placeholder="Email" />
        <span class="errors">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="form-field">
      <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
        <input
          type="password"
          v-model="login.password"
          placeholder="Password"
        />
        <span class="errors">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>

    <div class="form-field">
      <button class="login-btn" :disabled="!valid" type="submit">
        {{ !valid ? "Disabled" : "LOGIN" }}
      </button>
    </div>
  </ValidationObserver>
</template>

<script>
export default {
  props: ["error"],
  data() {
    return {
      login: {
        password: "",
        username: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      this.$emit("login", this.login);
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    }
  }
};
</script>

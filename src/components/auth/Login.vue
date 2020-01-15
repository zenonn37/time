<template>
  <ValidationObserver ref="observer" tag="form" v-slot="{ valid }" @submit.prevent="onSubmit()">
    <div class="form-field">
      <ValidationProvider name="Email" rules="required|email|min:5|max:40" v-slot="{errors}">
        <input type="email" v-model=" login.username" placeholder="Email" />
        <span class="errors">{{errors[0]}}</span>
      </ValidationProvider>
    </div>
    <div class="form-field">
      <ValidationProvider name="Password" rules="required|min:6|max:40|alpha" v-slot="{errors}">
        <input type="password" v-model=" login.password" placeholder="Password" />
        <span class="errors">{{errors[0]}}</span>
      </ValidationProvider>
    </div>

    <div class="form-field">
      <input :disabled="!valid" type="submit" :value="!valid ? 'Disabled' : 'Login'" />
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
        console.log("error on form");
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

<style lang="scss" scoped>
</style>
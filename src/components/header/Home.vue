<template>
  <div class="home-head-parent">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Task Zero Logo" />
    </div>
    <nav class="navigation">
      <router-link to="/home" tag="div">
        <i class="fas fa-project-diagram"></i>
      </router-link>
      <router-link to="/reports" tag="div">
        <i class="far fa-chart-bar"></i>
      </router-link>
      <router-link to="/about" tag="div">
        <i class="fas fa-info-circle"></i>
      </router-link>
      <div @click="onLogout()">
        <i class="fas fa-sign-out-alt"></i>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    onLogout() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/auth");
      });
    }
  }
};
</script>


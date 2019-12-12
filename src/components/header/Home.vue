<template>
  <div class="home-head-parent">
    <div class="logo">TP</div>
    <nav>
      <ul>
        <router-link to="/home" tag="li">Home</router-link>
        <router-link to="/reports" tag="li">Reports</router-link>
        <router-link to="/about" tag="li">About</router-link>
        <li @click="onLogout()">Logout</li>
      </ul>
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


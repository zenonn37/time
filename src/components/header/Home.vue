<template>
  <div class="home-head-parent">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Task Zero Logo" />
    </div>
    <transition name="slide-fade" mode="out-in">
      <nav class="navigation" v-if="!check">
        <router-link to="/home" tag="div">
          <i class="far fa-tasks"></i>
        </router-link>
        <router-link to="/reports" tag="div">
          <i class="far fa-chart-pie"></i>
        </router-link>
        <router-link to="/about" tag="div">
          <i class="far fa-user-circle"></i>
        </router-link>
        <div @click="onLogout()">
          <i class="far fa-portal-exit"></i>
        </div>
      </nav>
      <div class="task-active" v-else>Active Clock Enabled</div>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    //get clock active state
    check() {
      return this.$store.getters["time/get_clock_active"];
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/auth");
      });
    }
  }
};
</script>

<template>
  <component :is="layout">
    <transition
      name="router-anim"
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view />
    </transition>
  </component>
</template>

<script>
import Header from "@/components/header/Header";
const default_layout = "no-user";
export default {
  components: {
    Header
  },
  computed: {
    layout() {
      return this.$route.meta.layout || default_layout;
    }
  }
};
</script>

<style>
/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>

<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/header/Header";
export default {
  components: {
    Header
  }
};
</script>

<style>
/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>

<template>
  <div>
    <Header />
    <div class="container">
      <slot />
    </div>
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

<style scoped>
</style>
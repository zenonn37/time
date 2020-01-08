<template>
  <header class="header-parent">
    <div class="header-container">
      <Home />
      <!-- <template
        v-if="$route.name === 'home' || 
      $route.name === 'reports' || $route.name === 'about'"
      >
        <Home />
      </template>

      <template v-if="$route.name === 'project'">
        <div class="header-content">
          <Task />
        </div>
      </template>-->
    </div>
  </header>
</template>

<script>
//import Task from "@/components/header/Task";
import Home from "@/components/header/Home";
export default {
  components: {
    // Task,
    Home
  },
  data() {
    return {};
  }
};
</script>


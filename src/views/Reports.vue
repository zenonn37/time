<template>
  <div class="main-report-parent">
    <div class="sub-header">
      <ul>
        <router-link :to="{ name: 'user-reports' }" tag="li" class="cursor">
          <i class="far fa-list"></i>
          Reports
        </router-link>
        <router-link :to="{ name: 'user-charts' }" tag="li" class="cursor">
          <i class="fas fa-chart-pie"></i>
          Charts
        </router-link>
      </ul>
    </div>
    <div v-if="$route.name === 'user-reports'" class="total-hours">
      <div class="hours">
        {{ hours | hours }}
        <span>hrs</span>
      </div>
    </div>

    <div>
      <transition
        name="router-anim"
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hours() {
      return this.$store.getters["time/getTotal"];
    }
  }
};
</script>

<template>
  <div class="main-report-parent">
    <div class="sub-header">
      <ul>
        <router-link :to="{ name: 'user-reports' }" tag="li" class="cursor">
          <i class="fab fa-cloudscale"></i>
          Reports
        </router-link>
        <router-link :to="{ name: 'user-charts' }" tag="li" class="cursor">
          <i class="fas fa-chart-pie"></i>
          Charts
        </router-link>
      </ul>
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
export default {};
</script>

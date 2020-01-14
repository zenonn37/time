import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Guest from './layouts/Guest'
import User from './layouts/User'
import "./style/main.css";
import "./plugs/v-select"
import "./filters/dates"
import "./plugs/vee-validate";
import "./plugs/vue-filters";
import "./plugs/toast";
import "./plugs/vue-datetime";

import interceptor from './interceptors/interceptors'



interceptor()

Vue.component('user', User);
Vue.component('no-user', Guest);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogged) {
      // console.log("not logged");

      next({
        name: "auth"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogged) {
      // console.log("logged");

      next({
        name: "home"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

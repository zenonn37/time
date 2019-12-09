import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/main.css";
import "./plugs/v-select"
import "./filters/dates"
import "./plugs/vee-validate";
import "./plugs/vue-filters";
import "./plugs/toast";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

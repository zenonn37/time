import Vue from "vue";
import Vuex from "vuex";
import time from "./modules/time"
import projects from "./modules/projects"
import task from "./modules/task"

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,

  modules: {
    time,
    projects,
    task


  }
});

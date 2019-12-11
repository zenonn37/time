import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Project from '../views/Project.vue';
import Reports from '../views/Reports.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/projects/:id",
    name: "project",
    component: Project
  },
  {
    path: "/reports",
    name: "reports",
    component: Reports
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Project from '../views/Project.vue';
import Reports from '../views/Reports.vue';
import Auth from '../views/Auth.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    meta: {
      layout: "user",
      requiresAuth: true

    },
    component: Home
  },
  {
    path: "/auth",
    name: "auth",
    meta: {
      layout: "no-user",
      requireVisitor: true

    },
    component: Auth
  },
  {
    path: "/",
    name: "cover",
    meta: {
      layout: "no-user",
      requireVisitor: true

    },
    component: Auth
  },
  {
    path: "/projects/:id",
    name: "project",
    meta: {
      layout: "user",
      requiresAuth: true

    },
    component: Project
  },
  {
    path: "/reports",
    name: "reports",
    meta: {
      layout: "user",
      requiresAuth: true

    },
    component: Reports
  },
  {
    path: "/about",
    name: "about",
    meta: {
      layout: "user",
      requiresAuth: true

    },
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

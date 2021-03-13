import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import FuelCalculator from "../components/FuelCalculator.vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/FuelCalculator",
    name: "Kütusekalkulaator",
    component: FuelCalculator
  },
  {
    path: "/about",
    name: "About",
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

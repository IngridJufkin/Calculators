import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import FuelCalculator from '../views/FuelCalculator.vue';
import SalaryCalculator from '../views/SalaryCalculator.vue';
import BodyMass from '../views/BodyMass.vue';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'Esileht',
    component: Home,
  },
  {
    path: '/fuelcalculator',
    name: 'Kütusekalkulaator',
    component: FuelCalculator,
  },
  {
    path: '/salarycalculator',
    name: 'Palgakalkulaator',
    component: SalaryCalculator,
  },
  {
    path: '/kmi',
    name: 'Kehamassiindeks',
    component: BodyMass,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

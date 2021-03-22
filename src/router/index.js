import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import FuelCalculator from '../views/FuelCalculator.vue';
import SalaryCalculator from '../views/SalaryCalculator.vue';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/fuelcalculator',
    name: 'FuelCalculator',
    component: FuelCalculator,
  },
  {
    path: '/salarycalculator',
    name: 'Salary Calculator',
    component: SalaryCalculator,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

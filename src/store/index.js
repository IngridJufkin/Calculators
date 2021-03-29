import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    resultOfCalculator3: 0
  },
  mutations: {
    setResultOfCalculator3(state, value) {
      state.resultOfCalculator3 = value;
    }
  },
  actions: {
    setCalculatorResultValue({ commit }, { result }) {
      commit("setResultOfCalculator3", result);
    }
  },
  modules: {}
});

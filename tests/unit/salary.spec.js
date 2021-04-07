import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SalaryCalculator from "@/components/SalaryCalculator.vue";
import results from "./../helpers/results.json";

const localVue = createLocalVue();
localVue.use(Vuex);
let store = new Vuex.Store({});

describe("SalaryCalculator.vue", () => {
  it("should calculate salary correctly with default data", () => {
    const wrapper = shallowMount(SalaryCalculator, { store, localVue });
    expect(wrapper.vm.results).toEqual(results.initial);
  });

  it("should set tax free 0 when salary is 2100", () => {
    const wrapper = shallowMount(SalaryCalculator, { store, localVue });

    wrapper.vm.mainInput = 2100;
    wrapper.vm.testCalc();

    expect(wrapper.vm.taxFreeMin).toBe("0.00");
  });
});

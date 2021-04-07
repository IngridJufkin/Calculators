import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import SalaryCalculator from "@/components/SalaryCalculator.vue";
import results from "./../helpers/results.json";

const localVue = createLocalVue();
localVue.use(Vuex);
let store = new Vuex.Store({});

const stubs = [
  "v-radio-group",
  "v-radio",
  "v-list",
  "v-list-item",
  "v-checkbox",
  "pie-chart"
];

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

  it("should set tax free 0 when salary is 2100 v2", () => {
    const wrapper = mount(SalaryCalculator, {
      store,
      localVue,
      stubs
    });

    const mainInput = wrapper.find('input[name="mainInput"]');
    mainInput.setValue(2100);

    expect(wrapper.vm.taxFreeMin).toBe("0.00");
  });

  it("should set tax free 55,56 when salary is 2000", () => {
    const wrapper = mount(SalaryCalculator, {
      store,
      localVue,
      stubs
    });

    const mainInput = wrapper.find('input[name="mainInput"]');
    mainInput.setValue(2000);

    expect(wrapper.vm.taxFreeMin).toBe("55.56");
  });

  it("should calculate correctly when bruto salary is 1500", () => {
    const wrapper = mount(SalaryCalculator, {
      store,
      localVue,
      stubs
    });

    const mainInput = wrapper.find('input[name="mainInput"]');
    mainInput.setValue(1500);

    expect(wrapper.vm.taxFreeMin).toBe("333.33");
    // console.log(JSON.stringify(wrapper.vm.results, null, 2));
    expect(wrapper.vm.results).toEqual(results.result1500);
  });

  it("should calculate correctly when employee cost salary is 2000", async () => {
    const wrapper = mount(SalaryCalculator, {
      store,
      localVue,
      stubs
    });

    wrapper.vm.picked = "1";

    await wrapper.vm.$nextTick();

    const costInput = wrapper.find('input[name="costInput"]');
    costInput.setValue(2000);

    expect(wrapper.vm.taxFreeMin).toBe("336.22");
    // console.log(JSON.stringify(wrapper.vm.results, null, 2));
    expect(wrapper.vm.results).toEqual(results.result2000);
  });
});

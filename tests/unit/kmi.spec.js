import { shallowMount } from "@vue/test-utils";
import BodyMass from "@/components/BodyMass.vue";

describe("BodyMass.vue", () => {
  const wrapper = shallowMount(BodyMass);

  it("calculates BMI correctly", () => {
    const result = wrapper.vm.calculateBMI(170, 65);

    expect(result).toBe("22.49");
  });
});

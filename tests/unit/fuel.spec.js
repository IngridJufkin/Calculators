import { shallowMount } from "@vue/test-utils";
import Fuel from "@/components/FuelCalculator.vue";

describe("FuelCalculator.vue", () => {
  const wrapper = shallowMount(Fuel);

  it("calculates fuel cost", () => {
    const result = wrapper.vm.calculateNumbers(400, 5, 1.3);

    expect(result).toBe("26.00");
  });
  it("calculates distance", () => {
    const result = wrapper.vm.calculateDistance(10, 50);

    expect(result).toBe("500.00");
    expect(result).not.toBe("555.00");
  });
  it("calculates average fuel consumption", () => {
    const result = wrapper.vm.calculateAVG(456, 10, 20);

    expect(result).toBe("4.39");
    expect(result).not.toBe("3.00");
  });
  it("calculates total amount of fuel", () => {
    const result = wrapper.vm.calculateAmount(400, 5);

    expect(result).toBe("20.00");
    expect(result).not.toBe("3.00");
  });
});

<template>
  <div class="salary text-center">
    <SalaryCalculator />
  </div>
</template>

<script>
import SalaryCalculator from "@/components/SalaryCalculator.vue";

export default {
  name: "Salary",
  components: {
    SalaryCalculator
  }
};
</script>

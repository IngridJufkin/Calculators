<template>
  <div class="salary text-center">
    <SalaryCalculator msg="Salary calculator" />
  </div>
</template>

<script>
// @ is an alias to /src

import SalaryCalculator from "@/components/SalaryCalculator.vue";

export default {
  name: "Salary",
  components: {
    SalaryCalculator,
  },
};
</script>

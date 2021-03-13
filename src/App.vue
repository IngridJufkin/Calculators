<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn href="http://localhost:8080/" target="_blank" text>
        <span class="mr-2">Avaleht</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn href="/FuelCalculator" target="_blank" text>
        <span class="mr-2">Kalkulaator</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <FuelCalculator msg="Tere tulemast kalkuleerima!" />
    </v-main>
  </v-app>
</template>

<script>
import FuelCalculator from "./components/FuelCalculator";

export default {
  name: "App",

  components: {
    FuelCalculator,
  },

  data: () => ({
    //
  }),
};
</script>

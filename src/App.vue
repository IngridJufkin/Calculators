<template>
  <v-app>
    <v-app-bar app color="primary lighten-1" dark>
      <v-btn href="http://localhost:8080/" target="_blank" text>
        <span class="mr-2">Avaleht</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn href="/FuelCalculator" text>
        <span class="mr-2">Kalkulaator</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main><br />
      <FuelCalculator msg="Kütusekalkulaator" />
    </v-main>

    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
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

<template>
  <!-- Calculator name-->

  <v-container>
    <v-row justify="center">
      <v-col
        class="spacing-playground pa-12 text-center"
        cols="12"
        xl="5"
        lg="7"
        md="9"
        sm="8"
      >
        <v-row class="font-weight-medium text-center">
          <v-col>
            <h1 class="display-1 font-weight-bold mb-3">
              {{ msg }}
            </h1>
          </v-col>
        </v-row>

        <span> Vali arvutatav näitaja</span>

        <v-radio-group v-model="picked">
          <v-radio
            id="btn1"
            name="Choice"
            label="Teekonna pikkus"
            value="1"
          ></v-radio>
          <v-radio
            id="btn2"
            name="Choice"
            label="Keskmine kütusekulu"
            value="2"
          ></v-radio>
          <v-radio
            id="btn3"
            name="Choice"
            label="Kütuse kogus"
            value="3"
          ></v-radio>
        </v-radio-group>

        <!-- Distance covered-->
        <v-col class="mb-3">
          <v-row>
            <v-text-field
              v-if="picked != 1"
              v-model.number="variablea"
              label="Teekonna pikkus"
              hide-details="auto"
              type="number"
              min="0"
              step=".1"
              oninput="validity.valid||(value='');"
              suffix="km"
            ></v-text-field>

            <v-text-field
              v-else
              v-model.number="distanceResult"
              :disabled="picked == 1"
              label="Teekonna pikkus"
              hide-details="auto"
              type="number"
              min="0"
              step=".1"
              oninput="validity.valid||(value='');"
              suffix="km"
            ></v-text-field>
          </v-row>
          <br /><br />

          <!-- Average fuel consumption l/100km -->
          <v-row>
            <v-text-field
              v-if="picked != 2"
              v-model.number="variableb"
              label="Keskmine kütusekulu"
              hide-details="auto"
              type="number"
              min="0"
              step=".1"
              oninput="validity.valid||(value='');"
              suffix="l/100km"
            ></v-text-field>

            <v-text-field
              v-else
              v-model.number="averageConsumptionResult"
              :disabled="picked == 2"
              label="Keskmine kütusekulu"
              hide-details="auto"
              type="number"
              min="0"
              step=".1"
              oninput="validity.valid||(value='');"
              suffix="l/100km"
            ></v-text-field> </v-row
          ><br /><br />

          <!-- Fuel required-->
          <v-row>
            <v-text-field
              v-if="picked != 3"
              v-model.number="variablec"
              label="Kütuse kogus"
              hide-details="auto"
              type="number"
              min="0"
              step=".1"
              oninput="validity.valid||(value='');"
              suffix="l"
            ></v-text-field>

            <v-text-field
              v-else
              v-model.number="fuelAmountResult"
              :disabled="picked == 3"
              label="Kütuse kogus"
              hide-details="auto"
              type="number"
              min="0"
              step=".1"
              oninput="validity.valid||(value='');"
              suffix="l"
            ></v-text-field> </v-row
          ><br /><br />

          <!-- Fuel price-->
          <v-row>
            <v-text-field
              v-model.number="fuelPriceInput"
              label="Kütuse hind"
              hide-details="auto"
              type="number"
              min="0"
              step=".001"
              oninput="validity.valid||(value='');"
              suffix="€"
            ></v-text-field>
          </v-row>
        </v-col>
        <br />

        <v-row>
          <v-col>
            <h3 v-if="picked == 3">Kütuse maksumus: {{ fuelCost }} €</h3>
            <h3 v-else>
              Kütuse maksumus:
              {{ (variablec * fuelPriceInput).toFixed(2) }} €
            </h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FuelCalculator",
  props: {
    msg: String
  },
  data() {
    return {
      variablea: 400,
      variableb: 5,
      variablec: 20,
      fuelPriceInput: 1.3,

      picked: "1"
    };
  },
  computed: {
    fuelCost() {
      return this.calculateNumbers(
        this.variablea,
        this.variableb,
        this.fuelPriceInput
      );
    },
    averageConsumptionResult() {
      return this.calculateAVG(this.variablea, this.variableb, this.variablec);
    },
    distanceResult() {
      return this.calculateDistance(this.variableb, this.variablec);
    },
    fuelAmountResult() {
      return this.calculateAmount(this.variablea, this.variableb);
    }
  },

  methods: {
    calculateNumbers(variablea, variableb, fuelPriceInput) {
      let fuelCost = (variablea / 100) * variableb;
      if (isNaN(fuelCost) || !Number.isFinite(fuelCost)) {
        return 0;
      } else {
        return (+fuelCost * +fuelPriceInput).toFixed(2);
      }
    },

    calculateDistance(variableb, variablec) {
      let distance = (variablec / variableb) * 100;
      if (isNaN(distance) || !Number.isFinite(distance)) {
        return 0;
      } else {
        return distance.toFixed(2);
      }
    },

    calculateAVG(variablea, variableb, variablec) {
      let averageFuelConsumption = (+variablec / +variablea) * 100;
      if (
        isNaN(averageFuelConsumption) ||
        !Number.isFinite(averageFuelConsumption)
      ) {
        return variableb;
      } else {
        return ((+variablec / +variablea) * 100).toFixed(2);
      }
    },

    calculateAmount(variablea, variableb) {
      let fuelAmount = (variablea / 100) * variableb;
      if (isNaN(fuelAmount) || !Number.isFinite(fuelAmount)) {
        return 0;
      } else {
        return fuelAmount.toFixed(2);
      }
    }
  }
};
</script>

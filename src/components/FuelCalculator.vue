<template>
  <!-- Calculator name-->
  <v-container>
    <div class="spacing-playground pa-16">
    <v-row class="font-weight-medium text-left">
      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3 ">
          {{ msg }}
        </h1>
      </v-col>
    </v-row>

    <span> Vali arvutatav näitaja:</span>

    <v-radio-group v-model="picked" defrow>
      <v-radio
        id="btn1"
        name="Choice"
        label="Teekonna pikkus (km)"
        value="1"
      ></v-radio>
      <v-radio
        id="btn2"
        name="Choice"
        label="Keskmine kütusekulu (l/100km)"
        value="2"
      ></v-radio>
      <v-radio
        id="btn3"
        name="Choice"
        label="Kütuse kogus (l)"
        value="3"
      ></v-radio>
    </v-radio-group>

    <!-- Distance covered-->
    <v-col class="mb-3">
      <v-row align="center" >
        <v-text-field
          v-if="picked != 1"
          v-model.number="variablea"
          :disabled="picked == 1"
          label="Teekonna pikkus (km)"
          hide-details="auto"
          type="number"
          min="0"
          step=".1"
          oninput="validity.valid||(value='');"
        ></v-text-field>

        <v-text-field
          v-else
          v-model.number="distanceResult"
          :disabled="picked == 1"
          label="Teekonna pikkus (km)"
          hide-details="auto"
          type="number"
          min="0"
          step=".1"
          oninput="validity.valid||(value='');"
        ></v-text-field>
      </v-row> <br><br>

      <!-- Average fuel consumption l/100km -->
      <v-row align="center">
        <v-text-field
          v-if="picked != 2"
          v-model.number="variableb"
          :disabled="picked == 2"
          label="Keskmine kütusekulu (l/100km)"
          hide-details="auto"
          type="number"
          min="0"
          step=".1"
          oninput="validity.valid||(value='');"
        ></v-text-field>

        <v-text-field
          v-else
          v-model.number="averageConsumptionResult"
          :disabled="picked == 2"
          label="Keskmine kütusekulu (l/100km)"
          hide-details="auto"
          type="number"
          min="0"
          step=".1"
          oninput="validity.valid||(value='');"
        ></v-text-field>
      </v-row><br><br>

      <!-- Fuel required-->
      <v-row align="center">
        <v-text-field
          v-if="picked != 3"
          v-model.number="variablec"
          :disabled="picked == 3"
          label="Kütuse kogus (l)"
          hide-details="auto"
          type="number"
          min="0"
          step=".1"
          oninput="validity.valid||(value='');"
        ></v-text-field>

        <v-text-field
          v-else
          v-model.number="fuelAmountResult"
          :disabled="picked == 3"
          label="Kütuse kogus (l)"
          hide-details="auto"
          type="number"
          min="0"
          step=".1"
          oninput="validity.valid||(value='');"
        ></v-text-field> </v-row
      ><br><br>

      <!-- Fuel price-->
      <v-row align="center">
        <v-text-field
          v-model.number="fuelPriceInput"
          label="Kütuse hind (eur/l)"
          hide-details="auto"
          type="number"
          min="0"
          step=".001"
          oninput="validity.valid||(value='');"
        ></v-text-field>
      </v-row>
    </v-col> <br>

    <v-row class="mb-3">
      <v-col class="mb-9">
        <!-- kasutame vastuse real resulti kui muutujat või kui arvutust-->
        <h2 v-if="picked ==3">Kütuse maksumus: {{ fuelCost }} eurot</h2>
        <h2 v-else>Kütuse maksumus: {{ (variablec*fuelPriceInput).toFixed(2)}} eurot</h2>
      </v-col>
    </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "FuelCalculator",
  props: {
    msg: String, //anname väärtuse parent comonetist sisse, parent on app.vuee
  },
  data() {
    return {
      variablea: 400,
      variableb: 5,
      variablec: 20,
      fuelPriceInput: 1.3,

      picked: "1",
    };
  },
  computed: {
    //neid ei saa settida ja väärtust anda, sest neil on juba väärtus
    fuelCost() {
      //kui mingi muutuja väärtus muutub, käivitub result uuesti iga kord
      //if (!this.picked == 3) {
        return this.calculateNumbers(
          this.variablea,
          this.variableb,
          this.fuelPriceInput
        );
     /* } else {
        return this.calculateFuelCost(this.variablec, this.fuelPriceInput);
      } */
    },
    averageConsumptionResult() {
      //kui mingi muutuja väärtus muutub, käivitub averageConsumptionResult uuesti iga kord
      return this.calculateAVG(this.variablea, this.variableb, this.variablec);
    },
    distanceResult() {
      //kui mingi muutuja väärtus muutub, käivitub distanceResult uuesti iga kord
      return this.calculateDistance(this.variableb, this.variablec);
    },
    fuelAmountResult() {
      //kui mingi muutuja väärtus muutub, käivitub distanceResult uuesti iga kord
      return this.calculateAmount(this.variablea, this.variableb);
    },
  },

  methods: {
    //seda meetodit peab muutma nii, et arvutakse ka arvutusliku väljaga
    calculateNumbers(variablea, variableb, fuelPriceInput) {
      let fuelCost = (variablea / 100) * variableb;
      if (isNaN(fuelCost) || !Number.isFinite(fuelCost)) {
        return 0;
      } else {
        return (+fuelCost * +fuelPriceInput).toFixed(2);
      }
    },

   /* calculateFuelCost(variablec, fuelPriceInput) {
      let fuelCost = +variablec * +fuelPriceInput;
      if (isNaN(fuelCost) || !Number.isFinite(fuelCost)) {
        return 0;
      } else {
        return fuelCost.toFixed(2);
      }
    },*/

    calculateDistance(variableb, variablec) {
      let distance = ((variablec / variableb) * 100);
      if (isNaN(distance) || !Number.isFinite(distance)) {
        return 0;
      } else {
        return distance.toFixed(2);
      }
    },

    calculateAVG(variablea, variableb, variablec) {
      let averageFuelConsumption = (+variablec / +variablea) * 100;
      if (
        isNaN(averageFuelConsumption) || !Number.isFinite(averageFuelConsumption)
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
    },
  },
};
</script>

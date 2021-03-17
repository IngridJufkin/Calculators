<template>
  <!-- Calculator name-->
  <v-container>
    <v-row class="text-left">
      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3">
          {{ msg }}
        </h1>
      </v-col>
    </v-row>
    <!-- Distance covered-->
    <v-col class="mb-3">
      <v-row align="center">
        <v-text-field
          v-model.number="variablea"
          label="Teekonna pikkus (km)"
          hide-details="auto"
          type="number"
          min="0"
        ></v-text-field>
        <v-col class="mb-3" align="left">
          <h2>Teekonna pikkus: {{ distanceResult }} km</h2>
        </v-col>
      </v-row>
      <!-- Average fuel consumption l/100km -->
      <v-row align="center">
        <v-text-field
          v-model.number="averageConsumptionResult"
          label="Keskmine kütusekulu (l/100km)"
          hide-details="auto"
          type="number"
          min="0"
          oninput="validity.valid||(value='');"
        ></v-text-field>

        <v-col class="mb-2" align="left">
          <h2>Keskmine kütusekulu: {{ averageConsumptionResult }} l/100km</h2>
        </v-col>
      </v-row>

      <!-- Fuel required-->
      <v-row align="center">
        <v-text-field
          v-model.number="fuelAmountResult"
          label="Kütuse kogus (l)"
          hide-details="auto"
          type="number"
        ></v-text-field>

        <v-col class="mb-3" align="left">
          <h2>Kütuse kogus: {{ fuelAmountResult }}</h2>
        </v-col> </v-row
      ><br />

      <!-- Fuel price-->
      <v-row align="center">
        <v-text-field
          v-model.number="variabled"
          label="Kütuse hind (eur)"
          hide-details="auto"
          type="number"
        ></v-text-field>

        <v-col class="mb-2" align="left">
          <h2>Kütuse hind: {{ variabled }}</h2>
        </v-col>
      </v-row>
    </v-col>
    <v-row class="mb-3">
      <!--       <v-col>
        <v-btn
          @click="calculateNumbers(variablea, variableb, variablec, variabled)"
          elevation="2"
          >Arvuta summa</v-btn
        >
      </v-col>
 -->
      <v-col class="mb-9">
        <!-- kasutame vastuse real resulti kui muutujat -->
        <h2>Kütuse maksumus: {{ result }}</h2>
      </v-col>
    </v-row>
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
      variabled: 1.3,
      averageFuelConsumption: 0,
      distance: 0,
      fuelAmount: 0,
      //result: 0, -->watcheri jaoks
    };
  },
  computed: {
    //neid ei saa settida ja väärtust anda, sest neil on juba väärtus
    result() {
      //kui mingi muutuja väärtus muutub, käivitub result uuesti iga kord
      return this.calculateNumbers(
        this.variablea,
        this.variableb,
        this.variablec,
        this.variabled,
        this.averageFuelConsumption,
        this.distance,
        this.fuelAmount
      );
    },
    averageConsumptionResult() {
      //kui mingi muutuja väärtus muutub, käivitub averageConsumptionResult uuesti iga kord
      return this.calculateAVG(
        this.variablea,
        this.variableb,
        this.variablec,
        this.variabled,
        this.averageFuelConsumption,
        this.distance,
        this.fuelAmount
      );
    },
    distanceResult() {
      //kui mingi muutuja väärtus muutub, käivitub distanceResult uuesti iga kord
      return this.calculateDistance(
        this.variablea,
        this.variableb,
        this.variablec,
        this.variabled,
        this.averageFuelConsumption,
        this.distance,
        this.fuelAmount
      );
    },
    fuelAmountResult() {
      //kui mingi muutuja väärtus muutub, käivitub distanceResult uuesti iga kord
      return this.calculateAmount(
        this.variablea,
        this.variableb,
        this.variablec,
        this.variabled,
        this.averageFuelConsumption,
        this.distance,
        this.fuelAmount
      );
    },
  },
  /*watch: {
    //Watcherid - saame muutumist jälgida
    variablea(val) {
      console.log(val);
      this.calculateNumbers(val, this.variableb) 
    },
    variableb(val) {
      console.log(val);
      this.calculateNumbers(this.variablea, val) //
    }
  }, */
  methods: {
    calculateNumbers(variablea, variableb, variablec, variabled) {
      let fuelPrice = +variablec * +variabled;
      let averageFuelConsumption = (+variablec / +variablea) * 100;
      let distance = (variablec / variableb) * 100;
      let fuelAmount = (variablea / 100) * variableb;

      if (
        Number.isFinite(fuelPrice, averageFuelConsumption, distance, fuelAmount)
      ) {
        return +fuelAmount * +variabled;
        //this.result = +variablea + +variableb; --> kasutaksime watcheriga
      } else {
        console.error("Method CalculateNumbers takes only numbers");
        //this.result = 0;  --> kasutaksime watcheriga
        return 0;
      }
    },

    calculateAVG(variablea, variableb, variablec) {
      let averageFuelConsumption = (+variablec / +variablea) * 100;
      let distance = (variablec / variableb) * 100;
      let fuelAmount = (variablea / 100) * variableb;
      if (isNaN(averageFuelConsumption, distance, fuelAmount)) {
        return variableb;
      } else {
        if (Number.isFinite(averageFuelConsumption, distance, fuelAmount)) {
          return (+variablec / +variablea) * 100;
        } else {
          if (averageFuelConsumption == false) {
            return 0;
          } else {
            console.error("Method CalculateAVG takes only numbers");
            return 0;
          }
        }
      }
    },

    calculateDistance(variablea, variableb, variablec) {
      let averageFuelConsumption = (+variablec / +variablea) * 100;
      let distance = (variablec / variableb) * 100;
      let fuelAmount = (variablea / 100) * variableb;
      if (isNaN(distance)) {
        return 0;
      } else {
        if (Number.isFinite(averageFuelConsumption, distance, fuelAmount)) {
          return (+variablec / averageFuelConsumption) * 100;
        } else {
          console.error("Method calculateDistance takes only numbers");
          return 0;
        }
      }
    },

    calculateAmount(variablea, variableb, variablec) {
      let averageFuelConsumption = (+variablec / +variablea) * 100;
      let distance = (variablec / variableb) * 100;
      let fuelAmount = (variablea / 100) * variableb;
      if (isNaN(fuelAmount)) {
        return 0;
      } else {
        if (Number.isFinite(averageFuelConsumption, distance, fuelAmount)) {
          return (variablea / 100) * variableb;
        } else {
          console.error("Method calculateAmount takes only numbers");
          return 0;
        }
      }
    },

    setResult(value) {
      this.result = value;
      this.calculateAVG = value;
      this.calculateDistance = value;
      this.calculateAmount = value;
      this.averageFuelConsumption = value;
      this.fuelAmount = value;
    },
  },
};
</script>

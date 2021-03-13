<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3">
          {{ msg }}
        </h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-text-field
          v-model.number="variablea"
          label="Number a"
          hide-details="auto"
          type="number"

        ></v-text-field>
      </v-col>
      <v-col class="mb-4">
        <v-text-field
          v-model.number="variableb"
          label="Number b"
          hide-details="auto"
          type="number"
  
        ></v-text-field>
        <!-- <p>{{ add(5, 10) }}</p> -->
      </v-col>
      <v-col>
        <v-btn @click="sumNumbers(variablea, variableb)" elevation="2"
          >Arvuta summa</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col class="mb-4">
        <!-- kasutame vastuse real resulti kui muutujat -->
        <h2>Vastus: {{ result }}</h2>
      </v-col>
      <v-col class="mb-4">
        <h2>Muutuja a väärtus: {{ variablea }}</h2>
      </v-col>
      <v-col class="mb-4">
        <h2>Muutuja b väärtus: {{ variableb }}</h2>
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
      variablea: 0,
      variableb: 0,
      //result: 0, -->watcheri jaoks
    };
  },
  computed: {
    //neid ei saa settida ja väärtust anda, sest neil on juba väärtus
    result() {
      //kui mingi muutuja väärtus muutub, käivitub result uuesti iga kord
      return this.sumNumbers(this.variablea, this.variableb);
    },
  },
  /*watch: {
    //Watcherid - saame muutumist jälgida
    variablea(val) {
      console.log(val);
      this.sumNumbers(val, this.variableb) 
    },
    variableb(val) {
      console.log(val);
      this.sumNumbers(this.variablea, val) //
    }
  }, */
  methods: {
    sumNumbers(variablea, variableb) {
      const answer = +variablea + +variableb;
      if (Number.isFinite(answer)) {
        return +variablea + +variableb;
        //this.result = +variablea + +variableb; --> kasutaksime watcheriga
      } else {
        console.error("Method SumNumbers takes only numbers");
        //this.result = 0;  --> kasutaksime watcheriga
        return 0;
      }
    },
    setResult(value) {
      this.result = value;
    },
  },
};
</script>

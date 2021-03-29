<template>
  <v-container fluid class="spacing-playground pa-6">
    <v-row justify="center" class="pt-16">

        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <v-subheader> Kaal (kg)</v-subheader>
            <v-slider
              v-model="slider"
              height="20px"
              max="240"
              min="1"
              step=".1"
              thumb-label="always"
              v-model.number="weightInKilograms"
            ></v-slider>
          </v-col>

          <v-col cols="12" class="d-flex align-center">
            <v-subheader class="pl-0"> Pikkus (cm) </v-subheader>
            <v-slider
              v-model="slider"
              max="250"
              min="0"
              step=".1"
              thumb-label="always"
              v-model.number="heightInCm"
            ></v-slider>
          </v-col>
        </v-row>
    </v-row>

    <v-row class="mb-4">
      <v-col class="mb-4">
        <h2 align="center" >Sinu KMI on: {{ BMIResult }}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Bodymass",
  data() {
    return {
      heightInCm: 170,
      weightInKilograms: 65,
    };
  },
  computed: {
    BMIResult() {
      return this.calculateBMI(this.heightInCm, this.weightInKilograms);
    },
  },
  methods: {
    calculateBMI(heightInCm, weightInKilograms) {
      const heightInMeters = heightInCm / 100;
      const Square = Math.pow(heightInMeters, 2);
      const BMI = weightInKilograms / Square;
      return BMI.toFixed(2);
    },

    setResult(value) {
      this.BMIResult = value;
    },
  },
};
</script>
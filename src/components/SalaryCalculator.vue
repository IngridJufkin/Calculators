<template>
  <!-- Calculator name-->
  <v-container>
    <v-row
      ><v-col cols="6" class="left"
        >Lähteandmed

        <v-text-field
          v-model.number="testInput"
          @input="testCalc()"
          label="Test input"
          hide-details="auto"
          type="number"
          min="0"
        ></v-text-field> </v-col
      ><v-col cols="6" class="right"
        >Mahaarvamised

        <v-list>
          <v-list-item v-for="item in items" :key="item.id">
            <v-checkbox
              class="checkbox"
              v-model="checkbox"
              :label="item.name"
              :value="item"
              hide-details
            ></v-checkbox>
          </v-list-item>
        </v-list> </v-col
    ></v-row>
    <v-row justify="center"
      ><v-col class="kast" align="left">
        <v-card
          v-for="item in results"
          :key="item.name"
          class="results"
          outlined
          tile
        >
          <v-row
            ><v-col>{{ item.name }}</v-col
            ><v-col cols="3">{{ item.numVal }}</v-col
            ><v-col cols="2">{{ item.percentVal }}</v-col></v-row
          >
        </v-card></v-col
      ></v-row
    >
  </v-container>
</template>

<script>
export default {
  name: "Salary",
  props: {
    msg: String,
  },
  data() {
    return {
      testInput: null,
      testResult: null,
      checkbox: [],
      items: [
        {
          id: 0,
          name: "Arvesta sotsiaalmaksu min. kuumäära alusel",
        },
        {
          id: 1,
          name: "Arvesta maksuvaba tulu",
        },
        {
          id: 2,
          name: "Tööandja töötuskindlustusmakse",
        },
        {
          id: 3,
          name: "Töötaja (kindlustatu) töötuskindlustusmakse",
        },
        {
          id: 4,
          name: "Kogumispension (II sammas)",
        },
      ],
      results: [
        {
          id: 0,
          name: "Tööandja kulu kokku (palgafond)",
          numVal: "500 €",
          percentVal: "25%",
        },
        {
          id: 1,
          name: "Sotsiaalmaks",
          numVal: null,
          percentVal: "25%",
        },
        {
          id: 2,
          name: "Töötuskindlustusmakse",
          numVal: "456 €",
          percentVal: "25%",
        },
        { id: 3, name: "Brutopalk", numVal: "907 €", percentVal: "25%" },
        {
          id: 4,
          name: "Kogumispension (II sammas)",
          numVal: "345 €",
          percentVal: "25%",
        },
        {
          id: 5,
          name: "Töötuskindlustusmakse (töötaja)",
          numVal: "6786 €",
          percentVal: "25%",
        },
        { id: 6, name: "Tulumaks", numVal: "3455.44 €", percentVal: "25%" },
        { id: 7, name: "Netopalk", numVal: "4576 €", percentVal: "25%" },
      ],
    };
  },

  methods: {
    testCalc() {
      this.results[1].numVal = this.testInput * 100;
    },
  },
};
</script>

<style scoped>
::v-deep .checkbox .v-label {
  font-size: 0.8em;
}

::v-deep .kast,
.right {
  border-style: solid;
  border-color: blue;
}
::v-deep .left,
.chart {
  border-style: solid;
  border-color: red;
}

::v-deep .results {
  font-size: 0.8em;
}
</style>
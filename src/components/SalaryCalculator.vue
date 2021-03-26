<template>
  <!-- Calculator name-->
  <v-container class="font-weight-medium text-left">
    <v-row>
      <v-col cols="6" class="left"
        >Lähteandmed

        <v-text-field
          v-model.number="mainInput"
          @input="testCalc()"
          label="Gross Salary (€)"
          hide-details="auto"
          type="number"
          min="0"
        ></v-text-field>

        <v-text-field
          v-if="this.checkboxIdList.includes(1)"
          v-model.number="taxFreeMin"
          @change="testCalc()"
          label="Tax Free Minimum Amount (€)"
          hide-details="auto"
          type="number"
          min="0"
          max="500"
        ></v-text-field>

        <div v-else></div>

        <v-row class="annual"
          >Aastane brutotulu: {{ estimatedAnnualSalary }}</v-row
        >
      </v-col>

      <v-col cols="6" class="right"
        >Mahaarvamised

        <v-list>
          <v-list-item v-for="item in items" :key="item.id">
            <v-checkbox
              class="checkbox"
              v-model="checkbox"
              :label="item.name"
              :value="item"
              hide-details
              @change="checkboxCheck()"
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
    msg: String
  },
  data() {
    return {
      mainInput: null,
      testResult: null,
      taxFreeMin: null,
      checkbox: [],
      checkboxIdList: "",

      items: [
        {
          id: 0,
          name: "Arvesta sotsiaalmaksu min. kuumäära alusel"
        },
        {
          id: 1,
          name: "Arvesta maksuvaba tulu",
          value: null
        },
        {
          id: 2,
          name: "Tööandja töötuskindlustusmakse"
        },
        {
          id: 3,
          name: "Töötaja (kindlustatu) töötuskindlustusmakse"
        },
        {
          id: 4,
          name: "Kogumispension (II sammas)"
        }
      ],
      results: [
        {
          id: 0,
          name: "Tööandja kulu kokku (palgafond)",
          numVal: 1338,
          percentVal: 133.8
        },
        {
          id: 1,
          name: "Sotsiaalmaks",
          numVal: 330,
          percentVal: 33
        },
        {
          id: 2,
          name: "Töötuskindlustusmakse (tööandja)",
          numVal: 8,
          percentVal: 0.8
        },
        { id: 3, name: "Brutopalk", numVal: 1000, percentVal: 100 },
        {
          id: 4,
          name: "Kogumispension (II sammas)",
          numVal: 0,
          percentVal: 0
        },
        {
          id: 5,
          name: "Töötuskindlustusmakse (töötaja)",
          numVal: 16,
          percentVal: 1.6
        },
        { id: 6, name: "Tulumaks", numVal: 92.8, percentVal: 20 },

        { id: 7, name: "Netopalk", numVal: "4576 €", percentVal: "25%" }
      ]
    };
  },

  computed: {
    estimatedAnnualSalary() {
      return (this.mainInput * 12).toFixed(2);
    }
  },

  methods: {
    checkboxCheck() {
      let checkboxId = this.checkbox.map(item => item.id);
      this.checkboxIdList = checkboxId;
    },
    testCalc() {
      const socialTax = this.mainInput * 0.33;
      const totalCostEmp = this.mainInput + socialTax;
      const unemploymentInsuranceEmployer = this.mainInput * 0.008;
      const grossSalary = this.mainInput;
      const fundedPensionIIPilar = this.mainInput * 0.02;
      const unemploymentInsuranceEmployee = this.mainInput * 0.016;
      const taxFreeMinInput = this.taxFreeMin;
      const underIncomeTax =
        grossSalary -
        taxFreeMinInput -
        fundedPensionIIPilar -
        unemploymentInsuranceEmployee;
      const incomeTax = underIncomeTax * 0.2;
      const netSalary =
        grossSalary -
        fundedPensionIIPilar -
        unemploymentInsuranceEmployee -
        incomeTax;

      //tööandja kulu (eur) ja osakaal brutotulust %
      this.results[0].numVal = totalCostEmp.toFixed(2);
      this.results[0].percentVal = ((totalCostEmp / grossSalary) * 100).toFixed(
        2
      );

      //sotsiaalmaks eur ja sotsiaalmaksu osakaal brutotulust %
      this.results[1].numVal = socialTax.toFixed(2);
      this.results[1].percentVal = ((socialTax / grossSalary) * 100).toFixed(2);

      //tööandja töötuskindlustus ja osakaal brutotulust %
      this.results[2].numVal = unemploymentInsuranceEmployer.toFixed(2);
      this.results[2].percentVal = (
        (unemploymentInsuranceEmployer / grossSalary) *
        100
      ).toFixed(2);

      //brutopalk (eur) ja osakaal brutopalgast %
      this.results[3].numVal = grossSalary.toFixed(2);
      this.results[3].percentVal = ((grossSalary / grossSalary) * 100).toFixed(
        2
      );

      //kogumispension II sammas (eur) ja osakaal brutopalgast %
      if (this.checkboxIdList.includes(4)) {
        this.results[4].numVal = fundedPensionIIPilar.toFixed(2);
      } else {
        this.results[4].nuMVal = 0;
      }
      // this.results[4].numVal = fundedPensionIIPilar.toFixed(2);
      // this.results[4].percentVal = (
      //   (fundedPensionIIPilar / grossSalary) *
      //   100
      // ).toFixed(2);

      //tööandja töötuskindlustus ja osakaal brutotulust %
      this.results[5].numVal = unemploymentInsuranceEmployee.toFixed(2);
      this.results[5].percentVal = (
        (unemploymentInsuranceEmployee / grossSalary) *
        100
      ).toFixed(2);

      //tulumaks (eur) ja osakaal brutotulust %
      this.results[6].numVal = incomeTax.toFixed(2);
      this.results[6].percentVal = ((incomeTax / grossSalary) * 100).toFixed(2);

      //netopalk (eur) ja osakaal brutopalgast %
      this.results[7].numVal = netSalary.toFixed(2);
      this.results[7].percentVal = ((netSalary / grossSalary) * 100).toFixed(2);
    }
  }
};
</script>

<style scoped>
::v-deep .checkbox .v-label {
  font-size: 0.8em;
}

/*
::v-deep .kast,
.right {
  border-style: solid;
  border-color: rgb(0, 0, 0);
}
::v-deep .left,
.chart {
  border-style: solid;
  border-color: rgb(0, 0, 0);
}
*/
::v-deep .results {
  font-size: 0.8em;
}
::v-deep .annual {
  padding-top: 25px;
  padding-left: 12px;
}
</style>

<template>
  <v-container class="font-weight-medium text-left">
    <v-row>
      <v-col cols="12" md="6" xs="6" class="left"
        >Lähteandmed

        <v-radio-group v-model="picked" row>
          <v-radio label="Tööandja kulu" value="1"></v-radio>
          <v-radio label="Brutotulu" value="2"></v-radio>
        </v-radio-group>

        <v-text-field
          v-if="picked === '1'"
          v-model.number="costInput"
          name="costInput"
          @input="testCalc()"
          label="Tööandja kulu(€)"
          hide-details="auto"
          type="number"
          min="0"
          step=".001"
          suffix="eur"
        ></v-text-field>

        <v-text-field
          v-if="picked === '2'"
          v-model.number="mainInput"
          name="mainInput"
          @input="testCalc()"
          label="Bruto tulu (€)"
          hide-details="auto"
          type="number"
          min="0"
          step=".001"
          suffix="eur"
        ></v-text-field>

        <v-text-field
          v-if="checkbox.includes(1)"
          v-model.number="taxFreeMin"
          name="taxFreeMin"
          @input="testCalc()"
          label="Maksuvaba tulu (€)"
          hide-details="auto"
          type="number"
          min="0"
          step=".001"
          suffix="eur"
        ></v-text-field>

        <v-row class="annual"
          >Maksimaalne maksuvaba tulu: {{ taxFreeMin }}</v-row
        >

        <v-row class="annual"
          >Aastane brutotulu: {{ estimatedAnnualSalary }}</v-row
        >
      </v-col>

      <v-col cols="12" md="6" xs="6" class="right"
        >Mahaarvamised

        <v-list>
          <v-list-item v-for="item in items" :key="item.id">
            <v-checkbox
              class="checkbox"
              v-model="checkbox"
              :label="item.name"
              :value="item.id"
              hide-details
              @change="testCalc()"
            ></v-checkbox>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col>Tulemused</v-col>
          <v-col align="right" cols="3">EUR</v-col>
          <v-col align="right" cols="3">%</v-col></v-row
        >

        <v-row
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
                ><v-col align="right" cols="3">{{ item.numVal }}</v-col
                ><v-col align="right" cols="3">{{
                  item.percentVal
                }}</v-col></v-row
              >
            </v-card></v-col
          ></v-row
        ></v-col
      ><v-col>
        <pie-chart
          :value1="+this.results[7].percentVal"
          :value2="+this.results[4].percentVal"
          :value3="+this.results[5].percentVal"
          :value4="+this.results[6].percentVal"
          :value5="this.resultOfCalculator3"
        /> </v-col
    ></v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import PieChart from "./PieChart";
export default {
  name: "Salary",
  components: {
    PieChart
  },
  data() {
    return {
      mainInput: 1000.0,
      costInput: 1338.0,
      testResult: 0,
      taxFreeMin: 500.0,
      checkbox: [0, 1, 2, 3, 4],
      picked: "2",

      items: [
        {
          id: 0,
          name: "Arvesta sotsiaalmaksu min. kuumäära alusel"
        },
        {
          id: 1,
          name: "Arvesta maksuvaba tulu ",
          value: 0
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
          numVal: 0,
          percentVal: 0
        },
        {
          id: 1,
          name: "Sotsiaalmaks",
          numVal: 0,
          percentVal: 0
        },
        {
          id: 2,
          name: "Töötuskindlustusmakse (tööandja)",
          numVal: 0,
          percentVal: 0
        },
        {
          id: 3,
          name: "Brutopalk",
          numVal: 0,
          percentVal: 0
        },
        {
          id: 4,
          name: "Kogumispension (II sammas)",
          numVal: 0,
          percentVal: 0
        },
        {
          id: 5,
          name: "Töötuskindlustusmakse (töötaja)",
          numVal: 0,
          percentVal: 0
        },
        {
          id: 6,
          name: "Tulumaks",
          numVal: 0,
          percentVal: 0
        },
        {
          id: 7,
          name: "Netopalk",
          numVal: 0,
          percentVal: 0
        }
      ]
    };
  },
  created() {
    this.testCalc();
  },

  computed: {
    ...mapState(["resultOfCalculator3"]),

    estimatedAnnualSalary() {
      if (this.picked != 1) {
        return (this.mainInput * 12).toFixed(2);
      } else {
        let socialTax = this.costInput * 0.2466;
        let unemploymentInsuranceEmployer = this.costInput * 0.006;
        let grossSalary =
          this.costInput - socialTax - unemploymentInsuranceEmployer;
        return (grossSalary * 12).toFixed(2);
      }
    },

    taxFreeMinAmountCalc() {
      return this.testCalc(this.taxFreeMin / 12);
    }
  },

  methods: {
    testCalc() {
      let picked = this.picked;

      //------------Maksuvaba tulu arvutamine vastavalt aastasissetulekule------------
      let taxFreeInput = this.taxFreeMin;
      let annualSalary = this.estimatedAnnualSalary;
      if (this.checkbox.includes(1)) {
        if (annualSalary < 14400) {
          let taxFreeInput = 6000 / 12;
          this.taxFreeMin = taxFreeInput.toFixed(2);
        } else if (annualSalary > 25200) {
          taxFreeInput = 0;
          this.taxFreeMin = taxFreeInput.toFixed(2);
        } else {
          let taxFreeInput =
            (6000 - (6000 / 10800) * (annualSalary - 14400)) / 12;
          this.taxFreeMin = taxFreeInput.toFixed(2);
        }
      } else {
        taxFreeInput = 0;
      }

      if (taxFreeInput > this.taxFreeMin && this.checkbox.includes(1)) {
        taxFreeInput = this.taxFreeMin;
      }

      //-----------Muutujad ------------------------------------
      let grossSalary = this.mainInput;
      let socialTax = grossSalary * 0.33;
      let unemploymentInsuranceEmployer = grossSalary * 0.008;
      let totalCostEmp =
        grossSalary + socialTax + unemploymentInsuranceEmployer;

      if (picked == 1) {
        totalCostEmp = this.costInput;
        socialTax = totalCostEmp * 0.2466;
        unemploymentInsuranceEmployer = totalCostEmp * 0.006;
        grossSalary = totalCostEmp - socialTax - unemploymentInsuranceEmployer;
      }

      //----------------------Calculations------------------------------------------------
      let fundedPensionIIPilar = grossSalary * 0.02;
      let unemploymentInsuranceEmployee = grossSalary * 0.016;

      // ---------Sotsiaalmaks eur ja sotsiaalmaksu osakaal brutotulust % -------------------
      if (this.checkbox.includes(0) && socialTax < 192.72) {
        socialTax = 192.72; //min sotsiaalmasku kuumäär
        this.results[1].numVal = socialTax.toFixed(2);
        this.results[1].percentVal = ((socialTax / grossSalary) * 100).toFixed(
          2
        );
      } else {
        this.results[1].numVal = socialTax.toFixed(2);
        this.results[1].percentVal = ((socialTax / grossSalary) * 100).toFixed(
          2
        );
      }
      // -------------tööandja töötuskindlustus ja osakaal brutotulust % -------------------
      if (this.checkbox.includes(2)) {
        this.results[2].numVal = unemploymentInsuranceEmployer.toFixed(2);
        this.results[2].percentVal = (
          (unemploymentInsuranceEmployer / grossSalary) *
          100
        ).toFixed(2);
      } else {
        unemploymentInsuranceEmployer = 0;
        totalCostEmp = grossSalary + socialTax;
        this.results[2].numVal = 0;
        this.results[2].percentVal = 0;
      }

      // ---------tööandja kulu (eur) ja osakaal brutotulust % -----------------
      this.results[0].numVal = totalCostEmp.toFixed(2);
      this.results[0].percentVal = ((totalCostEmp / grossSalary) * 100).toFixed(
        2
      );

      // ---------brutopalk (eur) ja osakaal brutopalgast % -------------------
      this.results[3].numVal = grossSalary.toFixed(2);
      this.results[3].percentVal = ((grossSalary / grossSalary) * 100).toFixed(
        2
      );

      //----------kogumispension II sammas (eur) ja osakaal brutopalgast % --------------
      if (this.checkbox.includes(4)) {
        this.results[4].numVal = fundedPensionIIPilar.toFixed(2);
        this.results[4].percentVal = (
          (fundedPensionIIPilar / grossSalary) *
          100
        ).toFixed(2);
      } else {
        fundedPensionIIPilar = 0;
        this.results[4].numVal = 0;
        this.results[4].percentVal = 0;
      }

      // ---------tööandja töötuskindlustus ja osakaal brutotulust % ---------------
      if (this.checkbox.includes(3)) {
        this.results[5].numVal = unemploymentInsuranceEmployee.toFixed(2);
        this.results[5].percentVal = (
          (unemploymentInsuranceEmployee / grossSalary) *
          100
        ).toFixed(2);
      } else {
        unemploymentInsuranceEmployee = 0;
        this.results[5].numVal = 0;
        this.results[5].percentVal = 0;
      }

      // ----------tulumaks (eur) ja osakaal brutotulust % -------------------
      const underIncomeTax =
        grossSalary -
        taxFreeInput -
        fundedPensionIIPilar -
        unemploymentInsuranceEmployee;

      let incomeTax = underIncomeTax * 0.2;

      if (incomeTax < 0) {
        this.results[6].numVal = 0;
        this.results[6].percentVal = 0;
        incomeTax = 0;
      } else {
        this.results[6].numVal = incomeTax.toFixed(2);
        this.results[6].percentVal = ((incomeTax / grossSalary) * 100).toFixed(
          2
        );
      }

      // ---------netopalk (eur) ja osakaal brutopalgast % -------------------
      let netSalary =
        grossSalary -
        fundedPensionIIPilar -
        unemploymentInsuranceEmployee -
        incomeTax;
      this.results[7].numVal = netSalary.toFixed(2);
      this.results[7].percentVal = ((netSalary / grossSalary) * 100).toFixed(2);
    }
  }
};
</script>

<style scoped>
  ::v-deep .results {
    font-size: 0.9em;
  }

  ::v-deep .annual {
    padding-top: 0.8em;
    padding-left: 0.8em;
  }
</style>

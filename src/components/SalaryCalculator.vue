<template>
  <!-- Calculator name-->
  <v-container class="font-weight-medium text-left">
    <v-row>
      <v-col cols="6" class="left"
        >Lähteandmed

        <v-radio-group v-model="picked" row>
          <v-radio label="Tööandja kulu" value="1"></v-radio>
          <v-radio label="Brutotulu" value="2"></v-radio>
        </v-radio-group>

        <v-text-field
          v-if="picked != 1"
          v-model.number="mainInput"
          @input="testCalc(); taxFreeAmountCheck()"
          label="Gross Salary (€)"
          hide-details="auto"
          type="number"
          min="0"
          oninput="validity.valid||(value='');"
        ></v-text-field>

        <v-text-field
          v-if="picked != 2"
          v-model.number="costInput"
          @input="testCalc()"
          label="Employer total Cost(€)"
          hide-details="auto"
          type="number"
          min="0"
          oninput="validity.valid||(value='');"
        ></v-text-field>

        <v-text-field
          v-if="this.checkbox.includes(1)"
          v-model.number="taxFreeMin"
          @input="checkboxCheck();testCalc();"
          label="Tax Free Minimum Amount (€)"
          hide-details="auto"
          type="number"
          min="0"
          @change="taxFreeAmountCheck()"
          oninput="validity.valid||(value='');"
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
              :value="item.id"
              hide-details
              @change="
                checkboxCheck();
                testCalc();
              "
            ></v-checkbox>
          </v-list-item>
        </v-list> </v-col
    ></v-row>

    <v-row>
      <v-col>Tulemused</v-col>
      <v-col cols="3">EUR</v-col>
      <v-col cols="2">%</v-col></v-row
    >

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
      mainInput: 1000,
      costInput: 1338,
      testResult: 0,
      taxFreeMin: 500,
      checkbox: [0, 1, 2, 3, 4],
      picked: "2",

      items: [
        {
          id: 0,
          name: "Arvesta sotsiaalmaksu min. kuumäära alusel",
        },
        {
          id: 1,
          name: "Arvesta maksuvaba tulu",
          value: 0,
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
          numVal: 1338,
          percentVal: 133.8,
        },
        {
          id: 1,
          name: "Sotsiaalmaks",
          numVal: 330,
          percentVal: 33,
        },
        {
          id: 2,
          name: "Töötuskindlustusmakse (tööandja)",
          numVal: 8,
          percentVal: 0.8,
        },
        { id: 3, name: "Brutopalk", numVal: 1000, percentVal: 100 },
        {
          id: 4,
          name: "Kogumispension (II sammas)",
          numVal: 20,
          percentVal: 2,
        },
        {
          id: 5,
          name: "Töötuskindlustusmakse (töötaja)",
          numVal: 16,
          percentVal: 1.6,
        },
        { id: 6, name: "Tulumaks", numVal: 92.8, percentVal: 20 },

        { id: 7, name: "Netopalk", numVal: 871.2, percentVal: 87.2 },
      ],
    };
  },

  computed: {
    estimatedAnnualSalary() {
      return (this.mainInput * 12).toFixed(2);
    },

//Peab üle vaatama kas kasutame või ei ja kas saame ID järgi üldse?
    taxFreeMinAmountCalc() {
      return this.taxFreeAmountCheck(this.items.id[1]);
    }
  },

  methods: {
    checkboxCheck() {
      let checkboxId = this.checkbox.map((item) => item.id); //käime kogu checkboxi array läbi ja otsime id järgi, teeme uue listi
      this.checkboxIdList = checkboxId;
    },
//-------PEAB LISAMA RENDERDAMISE LEHELE! PRAEGU CONSOL LOGIB-----------
    taxFreeAmountCheck() {
      let taxFreeInput = this.taxFreeMin;
      let annualSalary = this.estimatedAnnualSalary;
      if (annualSalary < 14400) {
        taxFreeInput = 6000 / 12;
        console.log('kui alla 14400 siis ' + taxFreeInput)
        return taxFreeInput;
      } else if (annualSalary > 25200) {
        taxFreeInput = 0
        console.log('kui üle 25200 siis ' + taxFreeInput)
        return taxFreeInput;
      } else {
        taxFreeInput = 6000-6000/10800*(annualSalary-14400)
        console.log('kui vahemikus ' + taxFreeInput)
        return taxFreeInput;
      }
    },

    testCalc() {
      //ifid peab lisama klausli raadio buttonite kohta, et arvestaks kõike ka esimese ifi juures alates rida 219
      let taxFreeMinInput = this.taxFreeMin;
      let picked = this.picked;

      if (picked == 1) {
        let totalCostEmp = this.costInput;
        let socialTax = totalCostEmp * 0.2466;
        let unemploymentInsuranceEmployer = totalCostEmp * 0.006;
        let grossSalary =
          totalCostEmp - socialTax - unemploymentInsuranceEmployer;
        console.log(grossSalary);
      } else {
        let grossSalary = this.mainInput;
        let socialTax = grossSalary * 0.33;
        let unemploymentInsuranceEmployer = grossSalary * 0.008;
        let totalCostEmp =
          grossSalary + socialTax + unemploymentInsuranceEmployer;
        //----------------------Calculations------------------------------------------------
        let fundedPensionIIPilar = grossSalary * 0.02;
        let unemploymentInsuranceEmployee = grossSalary * 0.016;

        // ---------sotsiaalmaks eur ja sotsiaalmaksu osakaal brutotulust % -------------------
        if (this.checkbox.includes(0)) {
          this.results[1].numVal = socialTax.toFixed(2);
          this.results[1].percentVal = (
            (socialTax / grossSalary) *
            100
          ).toFixed(2);
        } else {
          socialTax = 0;
          totalCostEmp = grossSalary + unemploymentInsuranceEmployer;
          this.results[1].numVal = 0;
          this.results[1].percentVal = 0;
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
        this.results[0].percentVal = (
          (totalCostEmp / grossSalary) *
          100
        ).toFixed(2);

        // ---------brutopalk (eur) ja osakaal brutopalgast % -------------------
        this.results[3].numVal = grossSalary.toFixed(2);
        this.results[3].percentVal = (
          (grossSalary / grossSalary) *
          100
        ).toFixed(2);

        //----------kogumispension II sammas (eur) ja osakaal brutopalgast % --------------
        if (this.checkbox.includes(4)) {
          this.results[4].numVal = fundedPensionIIPilar.toFixed(2);
          this.results[4].percentVal = (
            (fundedPensionIIPilar / grossSalary) *
            100
          ).toFixed(2);
        } else {
          fundedPensionIIPilar = 0;
          console.log(fundedPensionIIPilar);
          this.results[4].numVal = 0;
          this.results[4].percentVal = 0;
          console.log(fundedPensionIIPilar);
        }

        // ---------tööandja töötuskindlustus ja osakaal brutotulust % ---------------
        if (this.checkbox.includes(3)) {
          this.results[5].numVal = unemploymentInsuranceEmployee.toFixed(2);
          this.results[5].percentVal = (
            (unemploymentInsuranceEmployee / grossSalary) *
            100
          ).toFixed(2);
          console.log(unemploymentInsuranceEmployee);
        } else {
          unemploymentInsuranceEmployee = 0;
          this.results[5].numVal = 0;
          this.results[5].percentVal = 0;
          console.log(unemploymentInsuranceEmployee);
        }

        // ----------tulumaks (eur) ja osakaal brutotulust % -------------------
        const underIncomeTax =
          grossSalary -
          taxFreeMinInput -
          fundedPensionIIPilar -
          unemploymentInsuranceEmployee;
        let incomeTax = underIncomeTax * 0.2;

        if (incomeTax < 0) {
          this.results[6].numVal = 0;
          this.results[6].percentVal = 0;
          incomeTax = 0;
        } else {
          this.results[6].numVal = incomeTax.toFixed(2);
          this.results[6].percentVal = (
            (incomeTax / grossSalary) *
            100
          ).toFixed(2);
        }

        // ---------netopalk (eur) ja osakaal brutopalgast % -------------------
        let netSalary =
          grossSalary -
          fundedPensionIIPilar -
          unemploymentInsuranceEmployee -
          incomeTax;
        this.results[7].numVal = netSalary.toFixed(2);
        this.results[7].percentVal = ((netSalary / grossSalary) * 100).toFixed(
          2
        );
      }
    },
  },
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

<template>
  <figure class="pie-chart" :style="pieChartStats">
    <figcaption class="fig1">
      Netopalk {{ this.value1 }}%<span style="color: #4e79a7"></span><br />
      II sammas {{ this.value2 }}% <span style="color: #f28e2c"></span><br />
      Töötuskindlustus {{ this.value3 }}% <span style="color: #e15759"></span
      ><br />
      Tulumaks {{ this.value4 }}% <span style="color: #59a14f"></span><br />
    </figcaption>
    <figcaption class="fig2">
      <span style="color: #e000ff"></span> {{ this.value5 }} Vuex
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: "pie-chart",
  props: {
    value1: {
      type: Number,
      default: 10
    },
    value2: {
      type: Number,
      default: 20
    },
    value3: {
      type: Number,
      default: 30
    },
    value4: {
      type: Number,
      default: 40
    },
    value5: {
      default: null
    }
  },
  computed: {
    pieChartStats() {
      return {
        background: `radial-gradient(circle closest-side, transparent 66%, white 0), conic-gradient(#4e79a7 0, #4e79a7 ${
          this.value1
        }%, #f28e2c 0, #f28e2c ${this.value1 +
          this.value2}%, #e15759 0, #e15759 ${this.value1 +
          this.value2 +
          this.value3}%, #59a14f 0, #59a14f ${this.value1 +
          this.value2 +
          this.value3 +
          this.value4}%)`
      };
    }
  }
};
</script>

<style scoped>
.pie-chart {
  position: relative;
  width: 21em;
  min-height: 25em;
  margin: 0;
}

.pie-chart .fig1 {
  position: absolute;
  bottom: 1em;
  right: 1em;
  font-size: smaller;
  text-align: right;
}
.pie-chart .fig2 {
  position: absolute;
  bottom: 1em;
  left: 1em;
  font-size: smaller;
  text-align: right;
}
.pie-chart span:after {
  display: inline-block;
  content: "";
  width: 0.8em;
  height: 0.8em;
  margin-left: 0.4em;
  height: 0.8em;
  border-radius: 0.2em;
  background: currentColor;
}
</style>

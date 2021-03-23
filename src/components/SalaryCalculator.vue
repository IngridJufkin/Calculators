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
  </v-container>
</template>

<script>
export default {
  name: "Salary",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

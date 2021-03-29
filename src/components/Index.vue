<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mt-5">{{ msg }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Index",
  props: {
    msg: String
  }
};
</script>

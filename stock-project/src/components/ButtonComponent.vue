<template>
  <v-btn class="ma-2" color="success" @click="clickedMethod" v-html="text">
  </v-btn>
</template>
<script>
export default {
  props: ["text", "clickedMethod"],
  data() {
    return {};
  },
};
</script>
<style>
</style>

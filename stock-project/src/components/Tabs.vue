<template>
  <v-card>
    <v-tabs background-color="black" dark>
      <v-tab key="Stock" to="/stocks">Stock</v-tab>
      <v-tab key="FX" to="/fx">FX</v-tab>
    </v-tabs>

    <v-tabs-items v-model="mutableIndex">
      <v-tab-item key="Stock">
        <v-card flat>
          <v-card-text><StockTabComponent /></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item key="FX">
        <v-card flat>
          <v-card-text><FXTabComponent /></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import StockTabComponent from "./StockTabComponent.vue";
import FXTabComponent from "./FXTabComponent.vue";

export default {
  props: ["activeTabId"], //tabs index 0,1
  name: "Tabs",
  data: function () {
    return {
      mutableIndex: this.activeTabId,
    };
  },
  components: {
    StockTabComponent,
    FXTabComponent,
  },
  watch: {
    activeTabId: function (e) {
      this.mutableIndex = this.activeTabId;
    },
  },
};
</script>

<style>
.v-window-item {
  height: 100vh;
}
</style>

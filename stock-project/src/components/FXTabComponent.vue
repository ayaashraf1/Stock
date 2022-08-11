<template>
  <div>
    <ButtonComponent text="Add New FX" :clickedMethod="this.loadNewFx" />
    <div class="fx-container">
      <CardComponent
        v-for="item in this.addedFXArr"
        :open="item['1. open']"
        :close="item['4. close']"
        :high="item['2. high']"
        :low="item['3. low']"
      />
    </div>
  </div>
</template>
<script>
import ButtonComponent from "./ButtonComponent.vue";
import CardComponent from "./CardComponent.vue";
import axios from "axios";

export default {
  name: "StockTabComponent",
  data: () => ({
    FXArr: [],
    addedFXArr: [
      {
        "1. open": "1.02081",
        "4. close": "1.02081",
        "2. high": "1.02091",
        "3. low": "1.02060",
      },
    ],
  }),
  components: {
    ButtonComponent,
    CardComponent,
  },
  methods: {
    getALLFX: function () {
      var _this = this;
      axios
        .get(
          "https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min&apikey=demo"
        )
        .then(function (response) {
          // handle success
          const fxObj = response.data["Time Series FX (5min)"];
          for (var fx in fxObj) {
            _this.FXArr.push(fxObj[fx]);
          }
          _this.$store.commit("setAllFX", _this.FXArr); //add to state
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    loadNewFx: function () {
      const newFx = this.$store.state.fxArr.shift();
      this.addedFXArr.push(newFx);
      this.saveNewFXInStorage();
    },
    saveNewFXInStorage:function(){
       sessionStorage.setItem("addedFx", JSON.stringify(this.addedFXArr));
    },
    getFxHistory: function () {
      const fxHistoryData = sessionStorage.getItem("addedFx");
      if (fxHistoryData) {
        this.addedFXArr = JSON.parse(fxHistoryData);
      }
    },
  },
  beforeMount() {
    this.getALLFX();
    this.getFxHistory();
  },
};
</script>
<style>
.fx-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>

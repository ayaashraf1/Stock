<template>
  <div>
    <ButtonComponent text="Add New Stock" :clickedMethod="this.loadNewStock" />
    <div class="stock-container">
      <CardComponent
        v-for="item in this.addedStockArr"
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
    stockArr: [],
    addedStockArr: [
      {
        "1. open": "89.9",
        "4. close": "99.9",
        "2. high": "101.1",
        "3. low": "87.9",
      },
    ],
  }),
  components: {
    ButtonComponent,
    CardComponent,
  },
  methods: {
    getAllStock: function () {
      var _this = this;
      axios
        .get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
        )
        .then(function (response) {
          // handle success
          const stockObj = response.data["Time Series (5min)"];
          for (var stock in stockObj) {
            _this.stockArr.push(stockObj[stock]);
          }
          _this.$store.commit("setAllStock", _this.stockArr); //add to state
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    loadNewStock: function () {
      const newStock = this.$store.state.stockArr.shift();
      if (newStock) {
        this.addedStockArr.push(newStock);
        this.saveNewStockInStorage();
      }
    },
    saveNewStockInStorage: function () {
      sessionStorage.setItem("addedStocks", JSON.stringify(this.addedStockArr));
    },
    getStockHistory: function () {
      const stockHistoryData = sessionStorage.getItem("addedStocks");
      if (stockHistoryData) {
        this.addedStockArr = JSON.parse(stockHistoryData);
      }
    },
  },
  beforeMount() {
    this.getAllStock();
    this.getStockHistory();
  },
};
</script>
<style>
.stock-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>

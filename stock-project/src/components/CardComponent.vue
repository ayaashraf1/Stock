<template>
  <div class="card-box">
    <div class="MSFT" v-bind:class="getClass()">
      {{ close }}
    </div>
    <div>
      <div>open: {{ open }}</div>
      <div>close: {{ close }}</div>
      <div>high: {{ high }}</div>
      <div>low: {{ low }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["open", "close", "high", "low"],
  methods: {
    getClass() {
      if (parseInt(this.close) > parseInt(this.open)) {
        return "greenFontColor";
      }
      return "redFontColor";
    },
  },
};
</script>
<style>
.card-box {
  display: flex;
  width: fit-content;
  background: #ccc;
  color: black;
  border-radius: 5px;
  border: 1px solid black;
  align-items: center;
  justify-content: space-around;
  padding: 15px;
  font-size: 18px;
  margin: 5px 10px 5px 0px;
}
.MSFT {
  font-size: 25px;
  font-weight: bold;
  margin-right: 25px;
}
.greenFontColor {
  color: green;
}
.redFontColor {
  color: red;
}
</style>

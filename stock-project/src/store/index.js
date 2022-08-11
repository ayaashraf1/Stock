import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stockArr: [],
    fxArr: [],
  },
  getters: {
  },
  mutations: {
    setAllStock: function (state, dataArr) {
      state.stockArr = dataArr;
    },
    setAllFX: function (state, dataArr) {
      state.fxArr = dataArr;
    },
  },
  actions: {},
  modules: {},
});

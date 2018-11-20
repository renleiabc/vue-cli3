import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 44,
    subCount: 100
  },
  mutations: {
    add(state, n) {
      state.count += n.b;
    },
    plus(state) {
      state.count--;
    },
    sub(state) {
      state.subCount++;
    }
  },
  getters: {
    count: function(state) {
      return (state.count += 100);
    },
    subCount: function(state) {
      return state.subCount;
    }
  },
  actions: {}
});

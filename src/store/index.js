import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);


const state = {
  cart: [],
  parts: null,
};

const mutations = {
  addRobotToCart(theState, robot) {
    theState.cart.push(robot);
  },
  updateParts(theState, parts) {
    theState.parts = parts;
  },
};

const getters = {
  cartSaleItems(theState) {
    return theState.cart.filter((item) => item.head.onSale);
  },
};

const actions = {
  getPartsFromAPI({ commit }) {
    axios.get('/api/parts')
      .then((result) => commit('updateParts', result.data))
      .catch(console.error);
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});

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
  // eslint-disable-next-line no-shadow
  addRobotToCart({ state, commit }, robot) {
    const cart = [...state.cart, robot];
    return axios.post('/api/cart', cart)
      .then(() => commit('addRobotToCart', robot));
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});

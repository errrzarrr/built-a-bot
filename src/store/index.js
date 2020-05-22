import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state = {
  cart: [],
};

const mutations = {
  // eslint-disable-next-line no-shadow
  addRobotToCart(state, robot) {
    state.cart.push(robot);
  },
};

const getters = {
  cartSaleItems(theState) {
    return theState.cart.filter((item) => item.head.onSale);
  },
};

export default new Vuex.Store({ state, mutations, getters });

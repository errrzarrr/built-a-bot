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

export default new Vuex.Store({ state, mutations });

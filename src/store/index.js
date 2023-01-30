import { createStore } from "vuex";

export default createStore({
  state: {
    username: "",
    messages: [],
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.username = user;
    },
    GET_USER(state) {},
  },
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
  },
});

import Vue from "vue";
import Vuex from "vuex";
import { isTokenExpired } from "../utils/jwt";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDark: localStorage.getItem("theme") === "dark",
    isLoggedIn: false
  },
  mutations: {
    toggleDark(state) {
      state.isDark = !state.isDark;
      localStorage.setItem("theme", state.isDark ? "dark" : "light");
    },
    login(state, token) {
      localStorage.setItem("token", token);
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
    syncLoginState(state) {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        state.isLoggedIn = false;
      } else {
        state.isLoggedIn = true;
      }
    }
  }
});

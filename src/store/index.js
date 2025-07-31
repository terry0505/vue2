import Vue from "vue";
import Vuex from "vuex";
import { isTokenExpired } from "../utils/jwt";
import auth from "./modules/auth";
import theme from "./modules/theme";
import todo from "./modules/todo";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    theme,
    todo
  },
  state: {
    isDark: localStorage.getItem("theme") === "dark",
    isLoggedIn: false,
    username: localStorage.getItem("username") || "" //사용자 이름 저장
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
    setUsername(state, name) {
      state.username = name;
      localStorage.setItem("username", name);
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      state.isLoggedIn = false;
      state.username = "";
    },
    syncLoginState(state) {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("username");
      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        state.isLoggedIn = false;
        state.username = "";
      } else {
        state.isLoggedIn = true;
        state.username = name || "";
      }
    }
  }
});

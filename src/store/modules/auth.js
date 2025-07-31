import { isTokenExpired } from "@/utils/jwt";

const state = {
  isLoggedIn: false,
  username: localStorage.getItem("username") || ""
};

const mutations = {
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
};

export default {
  namespaced: true,
  state,
  mutations
};

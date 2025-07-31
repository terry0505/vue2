import axios from "@/utils/axios";
import { isTokenExpired } from "@/utils/jwt";

const state = {
  isLoggedIn: false,
  username: localStorage.getItem("username") || ""
};

const mutations = {
  setToken(state, token) {
    localStorage.setItem("token", token);
    state.isLoggedIn = true;
  },
  setUsername(state, name) {
    localStorage.setItem("username", name);
    state.username = name;
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

const actions = {
  async login({ commit }, { username, password }) {
    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password
      });

      commit("setToken", res.data.token);
      commit("setUsername", res.data.username);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "로그인 실패"
      };
    }
  },
  async Register({ dispatch }, { username, password }) {
    try {
      await axios.post("/api/auth/register", {
        username,
        password
      });

      //회원가입 성공 => 자동 로그인 실행
      return await dispatch("login", { username, password });
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "회원가입 실패"
      };
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

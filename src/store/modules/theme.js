const state = {
  isDark: localStorage.getItem("theme") === "dark"
};

const mutations = {
  toggleDark(state) {
    state.isDark = !state.isDark;
    localStorage.setItem("theme", state.isDark ? "dark" : "light");
  }
};

export default {
  namespaced: true,
  state,
  mutations
};

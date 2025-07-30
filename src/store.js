import Vue from 'vue';

export const store = Vue.observable({
  isDark: localStorage.getItem('theme') === 'dark',
});

export const mutations = {
  toggleTheme() {
    store.isDark = !store.isDark;
    localStorage.setItem('theme', store.isDark ? 'dark' : 'light');
  },
};
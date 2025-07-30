import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isDark: localStorage.getItem('theme') === 'dark',
        isLoggedIn: !!localStorage.getItem('token'),
    },
    mutations: {
        toggleDark(state) {
            state.isDark = !state.isDark;
            localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
        },
        login(state, token) {
            localStorage.setItem('token', token);
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem('token');
            state.isLoggedIn = false;
        },
        synLoginState(state) {
            state.isLoggedIn = !!localStorage.getItem('token');
        }
    }
})
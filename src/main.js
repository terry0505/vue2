import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/base.css";
import axios from "@/utils/axios";
import store from "./store";

Vue.config.productionTip = false;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");

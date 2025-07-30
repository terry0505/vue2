import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import TodoApp from "./components/TodoApp.vue";
import store from "./store";

Vue.use(VueRouter);

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/todos",
    component: TodoApp,
    meta: { requiresAuth: true }
  },
  { path: "*", redirect: "/login" }
];

const router = new VueRouter({ mode: "history", routes });

// ✅ 인증 여부 체크
router.beforeEach((to, from, next) => {
  store.commit("syncLoginState"); // ✅ 이동 전마다 로그인 상태 동기화

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      alert("세션이 만료되었거나 로그인되지 않았습니다.");
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

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

router.beforeEach((to, from, next) => {
  store.commit("auth/syncLoginState");

  const isAuthRequired = to.matched.some((record) => record.meta.requiresAuth);
  const isLoggedIn = store.state.auth.isLoggedIn;

  if (isAuthRequired && !isLoggedIn) {
    if (to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  } else if ((to.path === "/login" || to.path === "/register") && isLoggedIn) {
    if (from.path !== "/todos") {
      next("/todos");
    } else {
      next(false); // 현재 페이지에서 stay
    }
  } else {
    next(); // 정상 라우팅
  }
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import TodoApp from "./components/TodoApp.vue";

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
  const token = localStorage.getItem("token");
  if (to.matched.some((r) => r.meta.requiresAuth) && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;

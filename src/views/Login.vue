<template>
  <div class="auth">
    <h2>로그인</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="ID" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">로그인</button>
    </form>
    <router-link to="/register">회원가입</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return { username: "", password: "" };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await axios.post("/api/auth/login", {
          username: this.username,
          password: this.password
        });
        //Vuex에 로그인 상태 반영
        this.$store.commit("login", res.data.token);

        //사용자명은 그대로 저장 가능
        //localStorage.setItem("username", res.data.username);
        //this.$store.commit('setUsername', res.data.username);
        this.$store.commit("auth/setUsername", res.data.username);

        this.$router.push("/todos");
      } catch (e) {
        alert("로그인 실패");
      }
    }
  }
};
</script>

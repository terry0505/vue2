<template>
  <div class="auth">
    <h2>회원가입</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" placeholder="ID" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">회원가입</button>
    </form>
    <router-link to="/login">로그인</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return { username: "", password: "" };
  },
  methods: {
    async handleRegister() {
      try {
        await axios.post("/api/auth/register", {
          username: this.username,
          password: this.password
        });
        alert("회원가입 완료! 로그인 해주세요.");
        this.$router.push("/login");
      } catch (e) {
        alert("회원가입 실패");
      }
    }
  }
};
</script>

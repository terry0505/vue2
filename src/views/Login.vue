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
export default {
  name: "LoginPage",
  data() {
    return { username: "", password: "" };
  },
  methods: {
    async handleLogin() {
      try {
        const result = await this.$store.dispatch("auth/login", {
          username: this.username,
          password: this.password
        });
        if (result.success) {
          this.$router.push("/todos");
        } else {
          alert(result.message);
        }
      } catch (e) {
        alert("로그인 실패");
      }
    }
  }
};
</script>

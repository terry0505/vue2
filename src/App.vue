<template>
  <div :class="['app-container', { dark: isDark }]">
    <header class="nav-bar">
      <div class="left">
        <router-link to="/todos">할 일</router-link>
        <router-link to="/login">로그인</router-link>
        <router-link to="/register">회원가입</router-link>
      </div>
      <div class="right">
        <button class="theme-toggle" @click="toggleDark">
          {{ isDark ? "☀️ 밝은모드" : "🌙 다크모드" }}
        </button>
        <button v-if="isLoggedIn" @click="logout">🔒 로그아웃</button>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDark: false,
      isLoggedIn: !!localStorage.getItem("token")
    };
  },
  created() {
    const saved = localStorage.getItem("theme");
    this.isDark = saved === "dark";
  },
  methods: {
    toggleDark() {
      this.isDark = !this.isDark;
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
    },
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.$router.push("/login");
    }
  },
  watch: {
    // 로그인 성공 시에도 갱신될 수 있도록 localStorage 감시
    $route() {
      this.isLoggedIn = !!localStorage.getItem("token");
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  background-color: #fff;
  color: #222;
  transition: all 0.3s;

  &.dark {
    background-color: #1e1e1e;
    color: #f1f1f1;

    a {
      color: #f1f1f1;
    }
  }
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  background: #f5f5f5;

  .left a {
    margin-right: 16px;
    text-decoration: none;
    color: #333;
  }

  .right button {
    margin-left: 8px;
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid #aaa;
    cursor: pointer;
    background: none;
  }
}

.dark .nav-bar {
  background: #2a2a2a;
  border-color: #444;

  .left a {
    color: #f1f1f1;
  }

  .right button {
    color: #f1f1f1;
    border-color: #666;
  }
}
</style>

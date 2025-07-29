<template>
  <div :class="['app-container', { dark: isDark }]">
    <button class="theme-toggle" @click="toggleDark">
      {{ isDark ? "☀️ 밝은모드" : "🌙 다크모드" }}
    </button>

    <TodoApp />
  </div>
</template>

<script>
import TodoApp from "./components/TodoApp.vue";

export default {
  components: { TodoApp },
  data() {
    return {
      isDark: false
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
    }
  }
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 16px;
  background-color: #ffffff;
  color: #222;
  transition: all 0.3s;
}
.app-container.dark {
  background-color: #1e1e1e;
  color: #f1f1f1;
}

.theme-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: 1px solid #aaa;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>

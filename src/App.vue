<template>
  <div class="todo-container">
    <h2>🧾 할 일 관리 (수정 포함)</h2>
    <div class="form">
      <input v-model="newTodo" placeholder="할 일을 입력하세요" />
      <button @click="addTodo">추가</button>
    </div>
    <ul class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :content="todo.title"
        :completed="todo.completed"
        :editing="editingId === todo.id"
        @delete="removeTodo(todo.id)"
        @edit="startEdit(todo.id)"
        @update="updateTodo(todo.id, $event)"
        @toggle="toggleComplete(todo.id)"
      />
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import TodoItem from "./components/TodoItem.vue";

const API_URL = "/api/todos";

export default {
  components: { TodoItem },
  data() {
    return {
      newTodo: "",
      todos: [],
      editingId: null,
      userId: null // userId를 상태로 관리
    };
  },
  mounted() {
    this.userId = this.getOrCreateUserId();
    this.fetchTodos();
  },
  methods: {
    getOrCreateUserId() {
      const KEY = "todo-user-id";
      let id = localStorage.getItem(KEY);
      if (!id) {
        id = "user-" + Date.now();
        localStorage.setItem(KEY, id);
      }
      return id;
    },
    async fetchTodos() {
      const res = await axios.get(`${API_URL}?user=${this.userId}`);
      this.todos = res.data;
    },
    async addTodo() {
      const title = this.newTodo.trim();
      if (!title) return;
      const res = await axios.post(API_URL, {
        title,
        completed: false,
        userId: this.userId
      });
      this.todos.unshift(res.data);
      this.newTodo = "";
    },
    async removeTodo(id) {
      await axios.delete(`${API_URL}/${id}?user=${this.userId}`);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    startEdit(id) {
      this.editingId = id;
    },
    async updateTodo(id, newTitle) {
      if (newTitle === null) {
        this.editingId = null;
        return;
      }
      const title = newTitle.trim();
      if (!title) return;

      await axios.put(`${API_URL}/${id}`, { title, userId: this.userId });
      this.todos = this.todos.map((todo) =>
        todo.id === id ? { ...todo, title } : todo
      );
      this.editingId = null;
    },
    async toggleComplete(id) {
      const target = this.todos.find((todo) => todo.id === id);
      const updated = { ...target, completed: !target.completed };

      await axios.put(`${API_URL}/${id}`, {
        completed: updated.completed,
        userId: this.userId
      });

      this.todos = this.todos.map((todo) => (todo.id === id ? updated : todo));
    }
  }
};
</script>

<style scoped>
.todo-container {
  max-width: 480px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #aaa;
  border-radius: 6px;
  font-size: 14px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #36956d;
}

ul {
  list-style: none;
  padding: 0;
}
</style>

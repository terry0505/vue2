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
        :editing="editingId === todo.id"
        @delete="removeTodo(todo.id)"
        @update="updateTodo(todo.id, $event)"
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
      editingId: null // 현재 수정 중인 todo의 ID
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const res = await axios.get(API_URL);
        this.todos = res.data;
      } catch (e) {
        alert("데이터를 불러오는 데 실패했습니다.");
      }
    },
    async addTodo() {
      const title = this.newTodo.trim();
      if (!title) return;

      try {
        const res = await axios.post(API_URL, {
          title,
          completed: false
        });
        this.todos.unshift(res.data);
        this.newTodo = "";
      } catch (e) {
        alert("추가 실패");
      }
    },
    async removeTodo(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (e) {
        alert("삭제 실패");
      }
    },
    async updateTodo(id, newTitle) {
      if (newTitle === null) {
        //취소
        this.editingId = null;
        return;
      }

      const title = newTitle.trim();
      if (!title) return;

      try {
        await axios.put(`${API_URL}/${id}`, { title });
        this.todos = this.todos.map((todo) =>
          todo.id === id ? { ...todo, title } : todo
        );
        this.editingId = null;
      } catch (e) {
        alert("삭제 실패");
      }
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

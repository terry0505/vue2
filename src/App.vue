<template>
  <div class="todo-container">
    <h2>📝 오늘의 할 일</h2>
    <div class="form">
      <input v-model="newTodo" placeholder="할 일을 입력하세요" />
      <button @click="addTodo">추가</button>
    </div>
    <ul class="todo-list">
      <TodoItem
        v-for="(todo, index) in todos"
        :key="index"
        :content="todo"
        @delete="removeTodo(index)"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from "./components/TodoItem.vue";

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      newTodo: "",
      todos: []
    };
  },
  methods: {
    addTodo() {
      const trimmed = this.newTodo.trim();
      if (trimmed) {
        this.todos.push(trimmed);
        this.newTodo = "";
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>

<style scoped>
@import "./assets/base.css";

.todo-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
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

.todo-list {
  list-style: none;
  padding: 0;
}
</style>

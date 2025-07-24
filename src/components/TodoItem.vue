<template>
  <li class="todo-item">
    ✅ {{ content }}
    <button @click="$emit('delete')">삭제</button>
  </li>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px dashed #ddd;
}
.todo-item button {
  background: #ff5c5c;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.todo-item button:hover {
  background: #e14e4e;
}
</style>

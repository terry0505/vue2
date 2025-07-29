<template>
  <li class="todo-item">
    <template v-if="isEditing">
      <input v-model="editText" @keyup.enter="submitEdit" />
      <button @click="submitEdit">확인</button>
      <button @click="cancelEdit">취소</button>
    </template>
    <template v-else>
      <label class="label">
        <input type="checkbox" :checked="completed" @change="$emit('toggle')" />
        <span :class="{ done: completed }">{{ content }}</span>
      </label>
      <div class="actions">
        <button @click="$emit('edit')">✏️</button>
        <button @click="$emit('delete')">🗑️</button>
      </div>
    </template>
  </li>
</template>
<script>
export default {
  props: {
    content: String,
    editing: Boolean,
    completed: Boolean
  },
  data() {
    return {
      editText: this.content
    };
  },
  computed: {
    isEditing() {
      return this.editing;
    }
  },
  methods: {
    submitEdit() {
      this.$emit("update", this.editText.trim());
    },
    cancelEdit() {
      this.editText = this.content;
      this.$emit("update", null); // null은 취소 의미
    }
  }
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px dashed #ddd;
}

.label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.done {
  text-decoration: line-through;
  color: gray;
}

.todo-item input[type="text"] {
  flex: 1;
  margin-right: 8px;
}
.todo-item button {
  margin-left: 4px;
}
.actions {
  display: flex;
  gap: 4px;
}
</style>

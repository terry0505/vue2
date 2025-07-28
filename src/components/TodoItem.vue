<template>
  <li>
    <template v-if="isEditing">
      <input v-model="editText" @keyup.enter="submitEdit" />
      <button @click="submitEdit">확인</button>
      <button @click="cancelEdit">취소</button>
    </template>
    <template v-else>
      {{ content }}
      <button @click="$emit('edit')">✏️</button>
      <button @click="$emit('delete')">🗑️</button>
    </template>
  </li>
</template>
<script>
export default {
  props: {
    content: String,
    editing: Boolean
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
      this.$emit("update", null); // null은 취소를 의미
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
.todo-item input {
  flex: 1;
  margin-right: 8px;
}
.todo-item button {
  margin-left: 4px;
}
</style>

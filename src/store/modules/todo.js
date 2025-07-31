import axios from "@/utils/axios";

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const mutations = {
  setTodos(state, todos) {
    state.todos = todos;
  },
  addTodo(state, todo) {
    state.todos.unshift(todo);
  },
  removeTodo(state, id) {
    state.todos = state.todos.filter((t) => t.id !== id);
  },
  updateTodo(state, updated) {
    state.todos = state.todos.map((todo) =>
      todo.id === updated.id ? updated : todo
    );
  }
};

const actions = {
  async fetchTodos({ commit }) {
    const res = await axios.get("/api/todos");
    commit("setTodos", res.data);
  },
  async addTodo({ commit }, title) {
    const res = await axios.post("/api/todos", { title, completed: false });
    commit("addTodo", res.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`/api/todos/${id}`);
    commit("removeTodo", id);
  },
  async toggleTodo({ commit, state }, id) {
    const target = state.todos.find((t) => t.id === id);
    if (!target) return;
    const updated = { ...target, completed: !target.completed };
    await axios.put(`/api/todos/${id}`, { completed: updated.completed });
    commit("updateTodo", updated);
  },
  async updateTodo({ commit }, { id, title }) {
    await axios.put(`/api/todos/${id}`, { title });
    commit("updateTodo", { id, title });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

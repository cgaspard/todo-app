import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
var host = "http://localhost:3000";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    accessToken: null,
    todos: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },    
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    updateTodo(state, updatedTodo) {
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo);
      }
    },
    removeTodo(state, todoId) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
  },
  actions: {
    async fetchTodos({ commit, state }) {
      const response = await axios.get(`${host}/api/todos`, {
        headers: { "X-User-Id": state.user.id },
      });
      commit("setTodos", response.data);
    },
    async addTodo({ commit, state }, todo) {
      const response = await axios.post(`${host}/api/todos`, todo, {
        headers: { "X-User-Id": state.user.id },
      });
      commit("addTodo", response.data);
    },
    async updateTodo({ commit, state }, updatedTodo) {
      const response = await axios.put(`${host}/api/todos/${updatedTodo.id}`, updatedTodo, {
        headers: { "X-User-Id": state.user.id },
      });
      commit("updateTodo", response.data);
    },
    async removeTodo({ commit, state }, todoId) {
      await axios.delete(`${host}/api/todos/${todoId}`, {
        headers: { "X-User-Id": state.user.id },
      });
      commit("removeTodo", todoId);
    },
  },
});

<template>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="newTodo.title"
        :label="todoInputPlaceholder"
        outlined
        clearable
        required
        @input="getCompletions"
      ></v-text-field>
      <v-autocomplete
        v-model="selectedCompletion"
        :items="completions"
        :search-input.sync="newTodo.title"
        clearable
        hide-details
        @change="updateTodoTitle"
      ></v-autocomplete>
      <v-textarea
        v-model="newTodo.description"
        label="Description"
        outlined
        clearable
      ></v-textarea>
      <v-btn color="primary" type="submit">Add Todo</v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTodo: {
          title: "",
          description: "",
        },
        completions: [],
        selectedCompletion: "",
        todoInputPlaceholder: "Type a new todo...",
      };
    },
    methods: {
      async getCompletions() {
        if (!this.newTodo.title) {
          this.completions = [];
          return;
        }
  
        try {
          const response = await this.$http.post("/chatgpt", {
            prompt: this.newTodo.title,
          });
          this.completions = response.data;
        } catch (error) {
          console.error("Error fetching completions:", error);
        }
      },
      updateTodoTitle() {
        this.newTodo.title = this.selectedCompletion;
        this.selectedCompletion = "";
      },
      async handleSubmit() {
        if (!this.newTodo.title) {
          return;
        }
  
        await this.$store.dispatch("addTodo", this.newTodo);
        this.newTodo.title = "";
        this.newTodo.description = "";
      },
    },
  };
  </script>
  
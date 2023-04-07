<template>
    <v-container>
      <add-todo></add-todo>
      <v-list two-line>
        <template v-for="(todo, index) in todos">
          <v-list-item :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ todo.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ todo.description }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <edit-todo :todo="todo"></edit-todo>
              <v-btn icon small @click="removeTodo(todo.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-container>
  </template>
  
  <script>
  import AddTodo from "@/components/AddTodo.vue";
  import EditTodo from "@/components/EditTodo.vue";
  
  export default {
    components: {
      AddTodo,
      EditTodo,
    },
    computed: {
      todos() {
        return this.$store.state.todos;
      },
    },
    methods: {
      removeTodo(todoId) {
        this.$store.dispatch("removeTodo", todoId);
      },
    },
  };
  </script>
  
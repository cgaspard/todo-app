<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template #activator="{ on, attrs }">
        <v-btn icon small v-bind="attrs" v-on="on" @click="openDialog">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Todo</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="updatedTodo.title"
              label="Title"
              outlined
              clearable
              required
            ></v-text-field>
            <v-textarea
              v-model="updatedTodo.description"
              label="Description"
              outlined
              clearable
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      todo: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        dialog: false,
        updatedTodo: {},
      };
    },
    methods: {
      openDialog() {
        this.updatedTodo = { ...this.todo };
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
      },
      async saveChanges() {
        await this.$store.dispatch("updateTodo", this.updatedTodo);
        this.closeDialog();
      },
    },
  };
  </script>
  
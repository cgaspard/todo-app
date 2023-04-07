<template>
    <v-app>
      <v-navigation-drawer app>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Todo App</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="user" @click="$router.push('/todos')">
            <v-list-item-icon>
              <v-icon>mdi-checkbox-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Todos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!user" @click="$router.push('/login')">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="user" @click="$router.push('/logout')">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app>
        <v-toolbar-title>Todo App</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    computed: mapState(["user"]),
  };
  </script>
  
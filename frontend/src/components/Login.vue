<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-account"
                  type="text"
                  outlined
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  outlined
                  clearable
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="loginWithGoogle">
                Login with Google
              </v-btn>
              <v-btn color="primary" @click="loginWithFacebook">
                Login with Facebook
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      loginWithGoogle() {
        window.location.href = "/auth/google";
      },
      loginWithFacebook() {
        window.location.href = "/auth/facebook";
      },
    },
  };
  </script>
  
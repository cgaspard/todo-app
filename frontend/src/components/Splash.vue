<template>
    <v-container fluid fill-height class="splash-screen">
      <v-row align="center" justify="center">
        <v-col>
          <!--  <v-img :src="require('@/assets/logo.svg')" contain max-width="200"></v-img>  -->
          <h1 class="text-center">Todo App</h1>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    mounted() {
      setTimeout(() => {
        this.$router.push("/login");
      }, 5000);
    },
  };
  </script>
  
  <style scoped>
  .splash-screen {
    background: linear-gradient(45deg, #2196f3, #f44336);
    color: white;
  }
  </style>
  
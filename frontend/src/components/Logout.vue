<template>
    <div></div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.logout();
    },
    methods: {
      async logout() {
        try {
          await this.$http.post("/logout");
          this.$store.commit("setUser", null);
          this.$router.push("/login");
        } catch (error) {
          console.error("Error during logout:", error);
        }
      },
    },
  };
  </script>
  
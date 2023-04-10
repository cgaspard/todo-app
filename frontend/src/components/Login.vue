<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="loginWithGoogle">Login with Google</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="https://accounts.google.com/gsi/client" async defer></script>
<script>
export default {
  methods: {
    async loginWithGoogle() {
      var self = this;
      
      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: '826236956679-b5fgv2ksfftb7s7jvdkgsqa798s8vie9.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
        ux_mode: 'popout',
        redirect_uri: 'http://localhost:8080/login  ',
        callback: (response) => {
          // console.log(google.account.oath2.currentUser.get())
          // var accessToken = client.requestAccessToken();
          self.$store.commit("setUser", {id:response.code, "auth":"google"});
          // self.$store.commit("setAccessToken", accessToken);
          if(response.code){
            
            console.log(response.code)
            self.$router.push('/todos')
          }
        },
      });
      // google.accounts.id.prompt((notification) => {
      //   if (notification.isNotDisplayed()) {
      //     console.log('Try to prompt in a different way.');
      //   } else if (notification.isSkippedMoment()) {
      //     console.log('Try to prompt in a different way.');
      //   }
      // });
      client.requestCode();      
      

    }
  },
};
</script>
  
import Vue from "vue";
import Vuetify from "vuetify";

import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import LoadScript from "vue-plugin-load-script";


Vue.use(Vuetify);
Vue.use(LoadScript);

Vue.loadScript("https://accounts.google.com/gsi/client")
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount("#app");

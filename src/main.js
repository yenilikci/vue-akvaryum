import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "sweetalert2/dist/sweetalert2.min.css";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import VueSweetalert2 from "vue-sweetalert2";
import VueCookies from "vue-cookies";

import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
Vue.use(Vuelidate);
Vue.use(VueCookies);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

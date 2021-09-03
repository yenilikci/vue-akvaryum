import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "../views/HomePage.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/homepage",
      component: HomePage,
    },
    {
      path: "/giris",
      component: SignIn,
      beforeEnter(to, from, next) {
        store.dispatch("authCheckAction");
        if (store.getters.isAuthenticated) {
          next("/homepage");
        } else {
          next();
        }
      },
    },
    {
      path: "/kayit",
      component: SignUp,
      beforeEnter(to, from, next) {
        store.dispatch("authCheckAction");
        if (store.getters.isAuthenticated) {
          next("/homepage");
        } else {
          next();
        }
      },
    },
  ],
});

export default router;

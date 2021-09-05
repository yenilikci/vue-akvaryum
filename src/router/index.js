import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "../views/HomePage.vue";
import SignIn from "../views/SignIn.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import SignUp from "../views/SignUp.vue";
import PasswordChange from "../views/PasswordChange.vue";
import ContactList from "../views/ContactList.vue";
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
      path: "/anasayfa",
      component: HomePage,
    },
    {
      path: "/giris",
      component: SignIn,
      beforeEnter(to, from, next) {
        store.dispatch("authCheckAction");
        if (store.getters.isAuthenticated) {
          next("/anasayfa");
        } else {
          next();
        }
      },
    },
    {
      path: "/sifremiunuttum",
      component: ForgotPassword,
      beforeEnter(to, from, next) {
        store.dispatch("authCheckAction");
        if (store.getters.isAuthenticated) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/sifredegistir",
      component: PasswordChange,
      beforeEnter(to, from, next) {
        store.dispatch("authCheckAction");
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/kayit",
      component: SignUp,
      beforeEnter(to, from, next) {
        store.dispatch("authCheckAction");
        if (store.getters.isAuthenticated) {
          next("/anasayfa");
        } else {
          next();
        }
      },
    },
    {
      path: "/liste",
      component: ContactList,
      beforeEnter(to, from, next) {
        store.dispatch("authCheckAction");
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next("/");
        }
      },
    },
  ],
});

export default router;

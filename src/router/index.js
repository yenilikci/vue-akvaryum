import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "../views/HomePage.vue";
import SignIn from "../views/SignIn.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import SignUp from "../views/SignUp.vue";
import PasswordChange from "../views/PasswordChange.vue";
import ContactList from "../views/ContactList.vue";
import Profile from "../views/Profile.vue";
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
    },
    {
      path: "/sifremiunuttum",
      component: ForgotPassword,
    },
    {
      path: "/sifredegistir",
      component: PasswordChange,
    },
    {
      path: "/kayit",
      component: SignUp,
    },
    {
      path: "/liste",
      component: ContactList,
    },
    {
      path: "/profil",
      component: Profile,
    },
    {
      path: "/*",
      component: HomePage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.path === "/giris" ||
    to.path === "/sifremiunuttum" ||
    to.path === "/kayit"
  ) {
    store.dispatch("authCheckAction");
    if (store.getters.isAuthenticated) {
      next("/anasayfa");
    } else {
      next();
    }
  } else if (
    to.path === "/sifredegistir" ||
    to.path === "/liste" ||
    to.path === "/profil"
  ) {
    store.dispatch("authCheckAction");
    if (store.getters.isAuthenticated) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "../views/HomePage.vue";
import SignIn from "../views/SignIn.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ForgotPasswordChange from "../views/ForgotPasswordChange.vue";
import SignUp from "../views/SignUp.vue";
import PasswordChange from "../views/PasswordChange.vue";
import ContactList from "../views/ContactList.vue";
import Profile from "../views/Profile.vue";
import Error404 from "../views/Error404.vue";
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
      path: "/sifremiunuttum/:code",
      component: ForgotPasswordChange,
      //custom control
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
      component: Error404,
    },
  ],
});

router.beforeEach((to, from, next) => {
  //hash mode url check, change to history mode
  // #/forgotpassword/code -> sifremiunuttum/code control
  if (to.fullPath.substr(0, 2) === "/#") {
    let path = to.fullPath.substr(2);
    let params = path.split("/");
    if (params[1] === "forgotpassword" && params[2] !== "") {
      store.dispatch("authCheckAction");
      if (store.getters.isAuthenticated) {
        console.log(store.getters.isAuthenticated);
        next("/anasayfa");
      } else {
        let code = params[2];
        next("/sifremiunuttum/" + code);
      }
    }
  } else if (
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
    store.dispatch("authCheckAction");
    next();
  }
});

export default router;

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import router from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    jwtToken: "",
  },
  getters: {
    isAuthenticated(state) {
      return state.jwtToken !== "";
    },
  },
  mutations: {
    setJwtToken(state, payload) {
      state.jwtToken = payload;
    },
    clearJwtToken(state) {
      state.jwtToken = "";
    },
  },
  actions: {
    authCheckAction({ commit }) {
      let jwtToken = Vue.$cookies.get("jwtToken");
      if (jwtToken) {
        commit("setJwtToken", jwtToken);
      } else {
        //for homepage and double redirect prevention:
        if (
          router.currentRoute.path != "/giris" &&
          router.currentRoute.path != "/" &&
          router.currentRoute.path != "/kayit"
        ) {
          router.push("/giris");
        }
        return false;
      }
    },
    loginAction({ commit }, payload) {
      axios
        .post("http://81.213.78.251:4003/Account/Login", {
          Email: payload.email,
          Password: payload.password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.IsSuccess === true) {
            commit("setJwtToken", response.data.Result.AccessToken);
            Vue.$cookies.set(
              "jwtToken",
              response.data.Result.AccessToken,
              "30MIN"
            );
            Vue.$cookies.set(
              "userInfos",
              JSON.stringify(response.data.Result.UserInfo),
              "30MIN"
            );
            Swal.fire({
              title: "Giriş başarılı",
              text: "Üye girişi başarılı bir şekilde gerçekleştirildi",
              icon: "success",
              confirmButtonText: "Harika",
            });
            router.push("/");
          } else {
            Swal.fire({
              title: "Giriş başarısız",
              text: "Üye girişi başarısız oldu bilgilerinizi kontrol ediniz!",
              icon: "error",
              confirmButtonText: "Pekala",
            });
          }
        });
    },
    registerAction(context, payload) {
      axios
        .post("http://81.213.78.251:4003/Account/Create", {
          Email: payload.email,
          Password: payload.password,
          FirstName: payload.firstName,
          LastName: payload.lastName,
          AgreementStatus: payload.status.toString(),
          PhoneNumber: payload.phoneNumber,
          BirthDate: payload.birthDate,
          Gender: payload.gender,
          Adress: payload.adress,
        })
        .then((response) => {
          if (response.data.IsSuccess === true) {
            Swal.fire({
              title: "Kayıt İşlemi Başarılı",
              text:
                "Üye kayıt işlemini başarılı bir şekilde tamamladınız. Mail adresinize gelen aktivasyon mailini kontrol ediniz.",
              icon: "success",
              confirmButtonText: "Harika",
            });
          } else {
            Swal.fire({
              title: "Kayıt İşlemi Başarısız",
              text:
                "Üye kayıt işlemi başarısız oldu bilgilerinizi gözden geçiriniz.",
              icon: "error",
              confirmButtonText: "Pekala",
            });
          }
        });
    },
    logoutAction({ commit }) {
      Swal.fire({
        title: "Çıkış yaptınız!",
        icon: "info",
        timer: 1000,
        showCancelButton: false,
        showConfirmButton: false,
      });
      commit("clearJwtToken");
      Vue.$cookies.remove("jwtToken");
    },
  },
});

export default store;
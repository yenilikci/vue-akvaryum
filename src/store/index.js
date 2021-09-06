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
      let jwtToken = localStorage.getItem("jwtToken");
      if (jwtToken) {
        commit("setJwtToken", jwtToken);
      } else {
        //for homepage and double redirect prevention:
        if (
          router.currentRoute.path != "/giris" &&
          router.currentRoute.path != "/" &&
          router.currentRoute.path != "/kayit" &&
          router.currentRoute.path != "/sifremiunuttum"
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
            localStorage.setItem("jwtToken", response.data.Result.AccessToken);
            localStorage.setItem(
              "userInfos",
              JSON.stringify(response.data.Result.UserInfo)
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
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userInfos");
    },
    forgotPasswordAction(context, payload) {
      axios
        .post("http://81.213.78.251:4003/Account/ForgotPassword", {
          Email: payload.email,
        })
        .then((response) => {
          if (response.data.IsSuccess === true) {
            Swal.fire({
              title: "Şifre Yenileme Talebiniz Alındı",
              text: "Şifre yenileme adımları e-posta adresinize gönderildi",
              icon: "success",
              confirmButtonText: "Harika",
            });
          } else {
            Swal.fire({
              title: "Şifre Yenileme İsteği Başarısız",
              text:
                "Lütfen girmiş olduğunuz e-posta adresinizi kontrol ediniz.",
              icon: "error",
              confirmButtonText: "Pekala",
            });
          }
        });
    },
    passwordChangeAction(context, payload) {
      axios
        .post(
          "http://81.213.78.251:4003/Account/PasswordChange",
          {
            OldPassword: payload.oldpassword,
            NewPassword: payload.password,
            NewPasswordRepeat: payload.repassword,
          },
          {
            headers: {
              Authorization: `Basic ${context.state.jwtToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.IsSuccess === true) {
            Swal.fire({
              title: "Şifre Değiştirme İşlemi Başarılı",
              text:
                "Şifre değiştirme işleminiz başarılı bir şekilde tamamlandı",
              icon: "success",
              confirmButtonText: "Harika",
            });
            router.push("/");
          } else {
            if (response.data.Result === "Mevcut şifreniz doğru değil!") {
              Swal.fire({
                title: "Şifre Değiştirme İsteği Başarısız",
                text: response.data.Result,
                icon: "error",
                confirmButtonText: "Pekala",
              });
            } else if (
              response.data.Result ===
              "Yeni şifreniz eski 3 şifreniz ile aynı olamaz"
            ) {
              Swal.fire({
                title: "Şifre Değiştirme İsteği Başarısız",
                text: response.data.Result,
                icon: "error",
                confirmButtonText: "Pekala",
              });
            } else if (
              response.data.Result == "NewPassword 8 karakterden kısa olamaz."
            ) {
              Swal.fire({
                title: "Şifre Değiştirme İsteği Başarısız",
                text: "Yeni şifreniz en az 8 karakter uzunluğunda olmalıdır.",
                icon: "error",
                confirmButtonText: "Pekala",
              });
            } else {
              Swal.fire({
                title: "Şifre Değiştirme İsteği Başarısız",
                text:
                  "Lütfen girmiş olduğunuz eski şifre, şifre ve şifre tekrar alanlarını kontrol ediniz!",
                icon: "error",
                confirmButtonText: "Pekala",
              });
            }
          }
        });
    },
  },
});

export default store;

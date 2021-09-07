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
        return true;
      } else {
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
    forgotPasswordChangeAction(context, payload) {
      axios
        .post("http://81.213.78.251:4003/Account/ForgotPasswordChange", {
          RequestCode: payload.code,
          NewPassword: payload.newPassword,
        })
        .then((response) => {
          if (response.data.IsSuccess === true) {
            Swal.fire({
              title: "Şifreniz Başarıyla Değiştirildi",
              text:
                "Şifre değiştirme işleminiz başarılı bir şekilde tamamlandı",
              icon: "success",
              confirmButtonText: "Harika",
            });
            router.push("/");
          } else {
            if (
              response.data.Result ===
              "Please enter a different one from the last 3 passwords you use."
            ) {
              Swal.fire({
                title: "Yeni Şifre Değiştirme İsteği Başarısız",
                text:
                  "Yeni şifreniz önceden kullandığınız son 3 şifreniz ile aynı olamaz",
                icon: "error",
                confirmButtonText: "Pekala",
              });
            } else if (
              response.data.Result ===
              "Password 8-200 karakter uzunluğuna olmalı."
            ) {
              Swal.fire({
                title: "Yeni Şifre Değiştirme İsteği Başarısız",
                text: "Yeni şifreniz 8-200 karakter uzunluğunda olmalıdır",
                icon: "error",
                confirmButtonText: "Pekala",
              });
            } else if (
              response.data.Result.message ===
              "Request failed with status code 400"
            ) {
              Swal.fire({
                title: "Yeni Şifre Değiştirme İsteği Başarısız",
                text: "Doğrulama kodunun geçerliliği sona ermiş",
                icon: "error",
                confirmButtonText: "Pekala",
              });
            } else {
              Swal.fire({
                title: "Yeni Şifre Değiştirme İsteği Başarısız",
                text: "Lütfen alanları doğru girdiğinizden emin olunuz",
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

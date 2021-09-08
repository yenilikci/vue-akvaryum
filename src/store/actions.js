import axios from "axios";
import router from "../router";
import alert from "../utilities/alert";

export const authCheckAction = ({ commit }) => {
  let jwtToken = localStorage.getItem("jwtToken");
  if (jwtToken) {
    commit("setJwtToken", jwtToken);
    return true;
  } else {
    return false;
  }
};

export const loginAction = ({ commit }, payload) => {
  axios
    .post("http://81.213.78.251:4003/Account/Login", {
      Email: payload.email,
      Password: payload.password,
    })
    .then((response) => {
      if (response.data.IsSuccess === true) {
        commit("setJwtToken", response.data.Result.AccessToken);
        localStorage.setItem("jwtToken", response.data.Result.AccessToken);
        localStorage.setItem(
          "userInfos",
          JSON.stringify(response.data.Result.UserInfo)
        );
        alert.loginSuccess();
        router.push("/");
      } else {
        alert.loginError();
      }
    });
};

export const registerAction = (context, payload) => {
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
        alert.registerSuccess();
      } else {
        if (response.data.Result.includes("Email is already")) {
          alert.registerErrorEmail();
        } else {
          alert.registerError();
        }
      }
    });
};

export const logoutAction = ({ commit }) => {
  alert.logout();
  commit("clearJwtToken");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userInfos");
};

export const forgotPasswordAction = (context, payload) => {
  axios
    .post("http://81.213.78.251:4003/Account/ForgotPassword", {
      Email: payload.email,
    })
    .then((response) => {
      if (response.data.IsSuccess === true) {
        alert.forgotPasswordSuccess();
      } else {
        alert.forgotPasswordError();
      }
    });
};

export const passwordChangeAction = (context, payload) => {
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
        alert.passwordChangeSuccess();
        router.push("/");
      } else {
        if (response.data.Result === "Mevcut şifreniz doğru değil!") {
          alert.passwordChangeErrorPassword(response);
        } else if (
          response.data.Result ===
          "Yeni şifreniz eski 3 şifreniz ile aynı olamaz"
        ) {
          alert.passwordChangeErrorOldPassword(response);
        } else if (
          response.data.Result == "NewPassword 8 karakterden kısa olamaz."
        ) {
          alert.passwordChangeErrorMinLength();
        } else {
          alert.passwordChangeError();
        }
      }
    });
};

export const forgotPasswordChangeAction = (context, payload) => {
  axios
    .post("http://81.213.78.251:4003/Account/ForgotPasswordChange", {
      RequestCode: payload.code,
      NewPassword: payload.newPassword,
    })
    .then((response) => {
      if (response.data.IsSuccess === true) {
        alert.forgotPasswordChangeSuccess();
        router.push("/");
      } else {
        if (
          response.data.Result ===
          "Please enter a different one from the last 3 passwords you use."
        ) {
          alert.forgotPasswordChangeErrorOldPassword();
        } else if (
          response.data.Result === "Password 8-200 karakter uzunluğuna olmalı."
        ) {
          alert.forgotPasswordChangeErrorMinLength();
        } else if (
          response.data.Result.message === "Request failed with status code 400"
        ) {
          alert.forgotPasswordChangeErrorCode();
        } else {
          alert.forgotPasswordChangeError();
        }
      }
    });
};

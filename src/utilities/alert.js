import Swal from "sweetalert2/dist/sweetalert2.js";

const loginSuccess = () => {
  Swal.fire({
    title: "Giriş başarılı",
    text: "Üye girişi başarılı bir şekilde gerçekleştirildi",
    icon: "success",
    confirmButtonText: "Harika",
  });
};

const loginError = () => {
  Swal.fire({
    title: "Giriş başarısız",
    text: "Üye girişi başarısız oldu bilgilerinizi kontrol ediniz!",
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const registerSuccess = () => {
  Swal.fire({
    title: "Kayıt İşlemi Başarılı",
    text:
      "Üye kayıt işlemini başarılı bir şekilde tamamladınız. Mail adresinize gelen aktivasyon mailini kontrol ediniz.",
    icon: "success",
    confirmButtonText: "Harika",
  });
};

const registerErrorEmail = () => {
  Swal.fire({
    title: "Kayıt İşlemi Başarısız",
    text: "Üye kayıt işlemi başarısız oldu bu email zaten kullanımda.",
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const registerError = () => {
  Swal.fire({
    title: "Kayıt İşlemi Başarısız",
    text: "Üye kayıt işlemi başarısız oldu bilgilerinizi gözden geçiriniz.",
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const logout = () => {
  Swal.fire({
    title: "Çıkış yaptınız!",
    icon: "info",
    timer: 1000,
    showCancelButton: false,
    showConfirmButton: false,
  });
};

const forgotPasswordSuccess = () => {
  Swal.fire({
    title: "Şifre Yenileme Talebiniz Alındı",
    text: "Şifre yenileme adımları e-posta adresinize gönderildi",
    icon: "success",
    confirmButtonText: "Harika",
  });
};

const forgotPasswordError = () => {
  Swal.fire({
    title: "Şifre Yenileme İsteği Başarısız",
    text: "Lütfen girmiş olduğunuz e-posta adresinizi kontrol ediniz.",
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const passwordChangeSuccess = () => {
  Swal.fire({
    title: "Şifre Değiştirme İşlemi Başarılı",
    text: "Şifre değiştirme işleminiz başarılı bir şekilde tamamlandı",
    icon: "success",
    confirmButtonText: "Harika",
  });
};

const passwordChangeError = () => {
  Swal.fire({
    title: "Şifre Değiştirme İsteği Başarısız",
    text:
      "Lütfen girmiş olduğunuz eski şifre, şifre ve şifre tekrar alanlarını kontrol ediniz!",
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const passwordChangeErrorPassword = (response) => {
  Swal.fire({
    title: "Şifre Değiştirme İsteği Başarısız",
    text: response.data.Result,
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const passwordChangeErrorOldPassword = (response) => {
  Swal.fire({
    title: "Şifre Değiştirme İsteği Başarısız",
    text: response.data.Result,
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const passwordChangeErrorMinLength = () => {
  Swal.fire({
    title: "Şifre Değiştirme İsteği Başarısız",
    text: "Yeni şifreniz en az 8 karakter uzunluğunda olmalıdır.",
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const forgotPasswordChangeSuccess = () => {
  Swal.fire({
    title: "Şifreniz Başarıyla Değiştirildi",
    text: "Şifre değiştirme işleminiz başarılı bir şekilde tamamlandı",
    icon: "success",
    confirmButtonText: "Harika",
  });
};

const forgotPasswordChangeErrorOldPassword = () => {
  Swal.fire({
    title: "Yeni Şifre Değiştirme İsteği Başarısız",
    text: "Yeni şifreniz önceden kullandığınız son 3 şifreniz ile aynı olamaz",
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const forgotPasswordChangeErrorMinLength = () => {
  Swal.fire({
    title: "Yeni Şifre Değiştirme İsteği Başarısız",
    text: "Yeni şifreniz 8-200 karakter uzunluğunda olmalıdır",
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const forgotPasswordChangeErrorCode = () => {
  Swal.fire({
    title: "Yeni Şifre Değiştirme İsteği Başarısız",
    text: "Doğrulama kodunun geçerliliği sona ermiş",
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

const forgotPasswordChangeError = () => {
  Swal.fire({
    title: "Yeni Şifre Değiştirme İsteği Başarısız",
    text: "Lütfen alanları doğru girdiğinizden emin olunuz",
    icon: "error",
    confirmButtonText: "Pekala",
  });
};

export default {
  loginSuccess,
  loginError,
  registerSuccess,
  registerErrorEmail,
  registerError,
  logout,
  forgotPasswordSuccess,
  forgotPasswordError,
  passwordChangeSuccess,
  passwordChangeError,
  passwordChangeErrorPassword,
  passwordChangeErrorOldPassword,
  passwordChangeErrorMinLength,
  forgotPasswordChangeSuccess,
  forgotPasswordChangeErrorOldPassword,
  forgotPasswordChangeErrorMinLength,
  forgotPasswordChangeErrorCode,
  forgotPasswordChangeError,
};

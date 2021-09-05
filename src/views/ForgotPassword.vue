<template>
  <div class="container">
    <div class="d-block mt-2">
      <span class="my-2 btn btn-secondary" @click="backView"
        ><b-icon-arrow-left></b-icon-arrow-left> Geri</span
      >
      <div class="card p-3 shadow">
        <div class="card-header border-0 mx-3 shadow">
          <h1 class="text-secondary header">
            <b-icon-patch-question class="mr-2"></b-icon-patch-question>Şifremi
            Unuttum
          </h1>
        </div>
        <div class="card-body mt-2">
          <form @submit.prevent="onSubmit">
            <div class="form-group shadow bg-light p-3">
              <label class="title"
                >Hesabınızın Kayıtlı Olduğu E-posta Adresi:</label
              >
              <input
                @blur="$v.email.$touch()"
                v-model="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': $v.email.$error }"
                placeholder="ornek@test.com"
              />
              <small v-if="!$v.email.required" class="form-text text-danger">
                Şifre yenileme adımlarını göndereceğimiz için e-posta
                doldurulması zorunlu bir alandır
              </small>
              <small v-if="!$v.email.email" class="form-text text-danger">
                Lütfen geçerli formatta bir e-posta adresi giriniz
              </small>
            </div>

            <button
              class="btn btn-outline-warning rounded btn-block p-3 shadow"
              :disabled="$v.$invalid"
            >
              Gönder
            </button>
          </form>
        </div>
        <div class="card-footer text-center text-secondary pb-4 pt-4">
          Akvaryum UI Şifremi Unuttum
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { required, email } from "vuelidate/lib/validators";

  export default {
    name: "ForgotPassword",
    data() {
      return {
        email: null,
      };
    },
    validations: {
      email: {
        required,
        email,
      },
    },
    methods: {
      onSubmit() {
        this.$store.dispatch("forgotPasswordAction", {
          email: this.email,
        });
      },
      backView() {
        this.$router.back();
      },
    },
  };
</script>

<style scoped>
  .header {
    font-size: 28px;
    font-weight: 500;
    text-align: center;
  }
  .title {
    font-weight: 400;
    color: lightslategray;
  }
</style>

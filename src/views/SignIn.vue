<template>
  <div class="container">
    <div class="d-block mt-2">
      <div class="card p-3 shadow">
        <div class="card-header border-0 mx-3 shadow">
          <h1 class="text-secondary header">
            <b-icon-person-check-fill class="mr-2"></b-icon-person-check-fill
            >Giriş Yap
          </h1>
        </div>
        <div class="card-body mt-2">
          <form @submit.prevent="onSubmit">
            <div class="form-group shadow bg-light p-3">
              <label class="title">E-posta Adresiniz:</label>
              <input
                @blur="$v.email.$touch()"
                v-model="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': $v.email.$error }"
                placeholder="ornek@test.com"
              />
              <small v-if="!$v.email.required" class="form-text text-danger">
                Email alanı giriş yapmak isteyen kullanıcılar için doldurulması
                zorunlu bir alandır
              </small>
              <small v-if="!$v.email.email" class="form-text text-danger">
                Lütfen geçerli formatta bir e-posta adresi giriniz
              </small>
            </div>
            <div class="form-group shadow bg-light p-3">
              <label class="title">Şifreniz:</label>
              <input
                @blur="$v.password.$touch()"
                v-model="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': $v.password.$error }"
                placeholder="******"
              />
              <small v-if="!$v.password.required" class="form-text text-danger">
                Parola alanı giriş yapmak isteyen kullanıcılar için doldurulması
                zorunlu bir alandır
              </small>
            </div>
            <button
              class="btn btn-outline-success rounded btn-block p-3 shadow"
              :disabled="$v.$invalid"
            >
              Giriş
            </button>
          </form>
        </div>
        <div class="jumbotron p-2 mx-3 text-center">
          <router-link to="/sifremiunuttum" class="f-password">
            <b-icon-patch-question></b-icon-patch-question> Şifremi Unuttum?
          </router-link>
        </div>
        <div class="card-footer text-center text-secondary pb-4 pt-4">
          Akvaryum UI Üye Girişi
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { required, email } from "vuelidate/lib/validators";
  export default {
    data() {
      return {
        email: null,
        password: null,
      };
    },
    validations: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
    methods: {
      onSubmit() {
        this.$store.dispatch("loginAction", {
          email: this.email,
          password: this.password,
        });
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
  .f-password {
    cursor: pointer;
    text-decoration: none;
  }
</style>

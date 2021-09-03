<template>
  <div class="container">
    <div class="d-block mt-2">
      <div class="card p-3 shadow">
        <div class="card-header border-0 mx-3 shadow">
          <h1 class="text-secondary header">
            <b-icon-key class="mr-2"></b-icon-key>Şifremi Değiştir
          </h1>
        </div>
        <div class="card-body mt-2">
          <form @submit.prevent="onSubmit">
            <div class="form-group shadow bg-light p-3">
              <label class="title">Eski Şifreniz:</label>
              <input
                @blur="$v.oldpassword.$touch()"
                v-model="oldpassword"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': $v.oldpassword.$error }"
                placeholder="******"
              />
              <small
                v-if="!$v.oldpassword.required"
                class="form-text text-danger"
              >
                Eski şifre alanı doldurulması zorunlu bir alandır
              </small>
            </div>
            <div class="form-group shadow bg-light p-3">
              <label class="title">Yeni Şifreniz:</label>
              <input
                @blur="$v.password.$touch()"
                v-model="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': $v.password.$error }"
                placeholder="******"
              />
              <small v-if="!$v.password.required" class="form-text text-danger">
                Yeni şifre alanı doldurulması zorunlu bir alandır
              </small>
            </div>
            <div class="form-group shadow bg-light p-3">
              <label class="title">Yeni Şifreniz Tekrar:</label>
              <input
                @blur="$v.repassword.$touch()"
                v-model="repassword"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': $v.repassword.$error }"
                placeholder="******"
              />
              <small
                v-if="!$v.repassword.required"
                class="form-text text-danger"
              >
                Yeni şifre tekrar alanı doldurulması zorunlu bir alandır
              </small>
              <small v-if="!$v.repassword.sameAs" class="form-text text-danger">
                Girdiğiniz şifreler birbiri ile uyuşmuyor
              </small>
            </div>

            <button
              class="btn btn-outline-success rounded btn-block p-3 shadow"
              :disabled="$v.$invalid"
            >
              Gönder
            </button>
          </form>
        </div>
        <div class="card-footer text-center text-secondary pb-4 pt-4">
          Akvaryum UI Şifremi Değiştir
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { required, sameAs } from "vuelidate/lib/validators";

  export default {
    name: "PasswordChange",
    data() {
      return {
        oldpassword: null,
        password: null,
        repassword: null,
      };
    },
    validations: {
      oldpassword: {
        required,
      },
      password: {
        required,
      },
      repassword: {
        required,
        sameAs: sameAs("password"),
      },
    },
    methods: {
      onSubmit() {
        this.$store.dispatch("passwordChangeAction", {
          oldpassword: this.oldpassword,
          password: this.password,
          repassword: this.repassword,
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
</style>

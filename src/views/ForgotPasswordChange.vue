<template>
  <div class="container">
    <div class="d-block mt-2">
      <div class="card p-3 shadow">
        <div class="card-header border-0 mx-3 shadow">
          <h1 class="text-secondary header">
            <b-icon-person-check-fill class="mr-2"></b-icon-person-check-fill
            >Yeni Şifre Belirle
          </h1>
        </div>
        <div class="card-body mt-2">
          <form @submit.prevent="onSubmit">
            <div class="form-group shadow bg-light p-3">
              <label class="title"
                >Kod: <small class="text-warning">* zorunlu alan</small></label
              >
              <input
                disabled
                @blur="$v.code.$touch()"
                :class="{ 'is-invalid': $v.code.$error }"
                v-model="code"
                type="text"
                class="form-control"
                placeholder="Adınızı giriniz"
              />
              <small v-if="!$v.code.required" class="form-text text-danger">
                Yeni şifre belirlemek için doğrulama kodu gereklidir.
              </small>
            </div>

            <div class="form-group shadow bg-light p-3">
              <label class="title"
                >Yeni Şifreniz:<small class="text-warning">
                  * zorunlu alan</small
                ></label
              >
              <input
                @blur="$v.newPassword.$touch()"
                :class="{ 'is-invalid': $v.newPassword.$error }"
                v-model="newPassword"
                type="password"
                class="form-control"
                placeholder="******"
              />
              <small
                v-if="!$v.newPassword.required"
                class="form-text text-danger"
              >
                Yeni şifrenizi girmeniz zorunludur
              </small>
              <small
                v-if="!$v.newPassword.minLength"
                class="form-text text-danger"
              >
                Yeni şifreniz en az 8 karakterden oluşmalıdır
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
          Akvaryum UI Yeni Şifre Belirle
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { required, minLength } from "vuelidate/lib/validators";
  export default {
    name: "ForgotPasswordChange",
    data() {
      return {
        code: "",
        newPassword: "",
      };
    },
    validations: {
      code: {
        required,
      },
      newPassword: {
        required,
        minLength: minLength(8),
      },
    },
    created() {
      this.code = this.$route.params.code;
    },
    methods: {
      onSubmit() {
        this.$store.dispatch("forgotPasswordChangeAction", {
          code: this.code,
          newPassword: this.newPassword,
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
</style>

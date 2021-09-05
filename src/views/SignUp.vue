<template>
  <div class="container">
    <div class="d-block mt-2">
      <div class="card p-3 shadow">
        <div class="card-header border-0 mx-3 shadow">
          <h1 class="text-secondary header">
            <b-icon-person-plus-fill class=" mr-2"></b-icon-person-plus-fill
            >Kayıt Ol
          </h1>
        </div>
        <div class="card-body mt-2">
          <form @submit.prevent="onSubmit">
            <div class="form-group shadow bg-light p-3">
              <label class="title"
                >E-posta Adresiniz:
                <small class="text-warning">* zorunlu alan</small></label
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
                Email alanı kayıt yapmak isteyen kullanıcılar için doldurulması
                zorunlu bir alandır
              </small>
              <small v-if="!$v.email.email" class="form-text text-danger">
                Lütfen geçerli formatta bir e-posta adresi giriniz
              </small>
            </div>
            <div class="form-group shadow bg-light p-3">
              <label class="title"
                >Şifreniz:<small class="text-warning">
                  * zorunlu alan</small
                ></label
              >
              <input
                @blur="$v.password.$touch()"
                v-model="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': $v.password.$error }"
                placeholder="******"
              />
              <small v-if="!$v.password.required" class="form-text text-danger">
                Parola alanı kayıt yapmak isteyen kullanıcılar için doldurulması
                zorunlu bir alandır
              </small>
              <small
                v-if="!$v.password.minLength"
                class="form-text text-danger"
              >
                Parolanız en az
                {{ $v.password.$params.minLength.min }} karakterden oluşmalıdır!
              </small>
            </div>
            <div class="form-group shadow bg-light p-3">
              <label class="title"
                >Adınız:
                <small class="text-warning">* zorunlu alan</small></label
              >
              <input
                @blur="$v.firstName.$touch()"
                v-model="firstName"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': $v.firstName.$error }"
                placeholder="Adınızı giriniz"
              />
              <small
                v-if="!$v.firstName.required"
                class="form-text text-danger"
              >
                Ad alanı kayıt yapmak isteyen kullanıcılar için doldurulması
                zorunlu bir alandır
              </small>
            </div>
            <div class="form-group shadow bg-light p-3">
              <label class="title"
                >Soyadınız:
                <small class="text-warning">* zorunlu alan</small></label
              >
              <input
                @blur="$v.lastName.$touch()"
                v-model="lastName"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': $v.lastName.$error }"
                placeholder="Soyadınızı giriniz"
              />
              <small v-if="!$v.lastName.required" class="form-text text-danger">
                Soyad alanı kayıt yapmak isteyen kullanıcılar için doldurulması
                zorunlu bir alandır
              </small>
            </div>
            <div class="form-group shadow bg-light p-3">
              <label class="title">Telefon Numarası:</label>
              <input
                v-model="phoneNumber"
                type="text"
                class="form-control"
                placeholder="+90 (000) 000 00 00"
              />
            </div>
            <div class="form-group shadow bg-light p-3">
              <label class="title">Doğum Tarihi:</label>
              <b-input-group class="mb-3">
                <b-form-input
                  id="example-input"
                  v-model="birthDate"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  autocomplete="off"
                ></b-form-input>
                <b-input-group-append>
                  <b-form-datepicker
                    v-model="birthDate"
                    button-only
                    right
                    locale="tr-TR"
                    aria-controls="example-input"
                    @context="onContext"
                  ></b-form-datepicker>
                </b-input-group-append>
              </b-input-group>
            </div>
            <div class="form-group shadow bg-light p-3">
              <label class="title">Cinsiyet:</label>
              <input
                v-model="gender"
                type="text"
                class="form-control"
                placeholder="Cinsiyetinizi giriniz"
              />
            </div>

            <div class="form-group shadow bg-light p-3">
              <label class="title">Adres:</label>
              <input
                v-model="adress"
                type="text"
                class="form-control"
                placeholder="Adresinizi giriniz"
              />
            </div>
            <div class="form-group shadow bg-light p-3">
              <label class="title">Kullanıcı sözleşmesi ve şartlar</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="$v.status.$model"
                  id="AgreementStatus"
                />
                <label
                  class="form-check-label text-info"
                  for="AgreementStatus"
                  @click="toggleModal"
                >
                  Sözleşmeyi okudum ve onaylıyorum.
                </label>
              </div>
            </div>

            <button
              class="btn btn-outline-info rounded btn-block p-3 shadow"
              :disabled="$v.$invalid"
            >
              Kayıt
            </button>
          </form>
        </div>
        <div class="card-footer text-center text-secondary pb-4 pt-4">
          Akvaryum UI Üye Kayıt
        </div>
        <b-modal ref="my-modal" hide-footer title="Sözleşme ve Şartlar">
          <div class="d-block text-center">
            <p>burada sözleşme ve şartlar yer almakta</p>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
  import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
  export default {
    data() {
      return {
        email: null,
        password: null,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDate: "",
        formatted: "",
        selected: "",
        gender: "",
        adress: "",
        status: "",
      };
    },
    validations: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      status: {
        required,
        sameAs: sameAs(() => true),
      },
    },
    methods: {
      showModal() {
        this.$refs["my-modal"].show();
      },
      hideModal() {
        this.$refs["my-modal"].hide();
      },
      toggleModal() {
        this.$refs["my-modal"].toggle("#toggle-btn");
      },
      onContext(ctx) {
        this.formatted = ctx.selectedFormatted;
        this.selected = ctx.selectedYMD;
      },
      onSubmit() {
        this.$store.dispatch("registerAction", {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          birthDate: this.birthDate,
          gender: this.gender,
          adress: this.adress,
          status: this.status,
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

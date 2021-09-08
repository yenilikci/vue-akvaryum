<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="light" variant="light" class="shadow">
        <b-navbar-brand href="#" class="">Akvaryum UI</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link to="/" tag="b-nav-item"
              ><b-icon-house-door-fill class="mb-1"></b-icon-house-door-fill>
              Anasayfa
            </router-link>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" :class="loginClass">
            <b-nav-item-dropdown right class="border border-secondary rounded">
              <template #button-content>
                <b-icon-person-fill class="mb-1 mr-2"></b-icon-person-fill
                >Üyelik İşlemleri
              </template>
              <router-link tag="b-dropdown-item" to="/giris">
                <b-icon-person-check-fill
                  class="mr-2"
                ></b-icon-person-check-fill
                >Giriş Yap
              </router-link>
              <router-link tag="b-dropdown-item" to="/kayit">
                <b-icon-person-plus-fill
                  class="mb-1 mr-2"
                ></b-icon-person-plus-fill
                >Kayıt Ol
              </router-link>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" :class="logoutClass">
            <b-nav-item-dropdown right class="border border-secondary rounded">
              <template #button-content>
                <b-icon-person-fill class="mb-1 mr-2"></b-icon-person-fill
                >Hoşgeldin <span class="text-info mr-1">{{ firstName }}</span>
              </template>
              <router-link tag="b-dropdown-item" to="/profil">
                <b-icon-person-circle class="mb-1 mr-2"></b-icon-person-circle
                >Profilim
              </router-link>
              <router-link tag="b-dropdown-item" to="/liste">
                <b-icon-file-earmark-person
                  class="mb-1 mr-2"
                ></b-icon-file-earmark-person
                >İletişim Listesi
              </router-link>
              <router-link tag="b-dropdown-item" to="/sifredegistir">
                <b-icon-key class="mr-2"></b-icon-key>Şifremi Değiştir
              </router-link>
              <b-dropdown-item @click.prevent="logout"
                ><b-icon-power class="mr-2"></b-icon-power>Çıkış
                Yap</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        firstName: "",
      };
    },
    name: "Navbar",
    created() {
      if (localStorage.getItem("userInfos")) {
        this.firstName = JSON.parse(
          localStorage.getItem("userInfos")
        ).FirstName;
      }
    },
    computed: {
      logoutClass() {
        return {
          "d-none": !this.$store.getters.isAuthenticated,
        };
      },
      loginClass() {
        return {
          "d-none": this.$store.getters.isAuthenticated,
        };
      },
    },
    watch: {
      firstName(val) {
        this.firstName = val;
      },
    },
    methods: {
      logout() {
        this.$store.dispatch("logoutAction");
        //route check
        if (this.$router.currentRoute.path != "/") {
          this.$router.push("/");
        }
      },
    },
  };
</script>

<style scoped></style>

<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="light" variant="light" class="shadow">
        <b-navbar-brand href="#" class="">Akvaryum UI</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#"
              ><b-icon-house-door-fill class="mb-1"></b-icon-house-door-fill>
              Anasayfa</b-nav-item
            >
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-icon-person-fill class="mb-1 mr-2"></b-icon-person-fill
                >Üyelik İşlemleri
              </template>
              <b-dropdown-item href="#">
                <b-icon-person-check-fill
                  class="mr-2"
                ></b-icon-person-check-fill
                >Giriş Yap</b-dropdown-item
              >
              <b-dropdown-item href="#"
                ><b-icon-person-plus-fill
                  class="mb-1 mr-2"
                ></b-icon-person-plus-fill
                >Kayıt Ol</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped></style>

<template>
  <div class="m-3">
    <b-card class="shadow border-light border p-2">
      <div class="jumbotron p-3 shadow">
        <b-card-text>
          <h4 class="text-secondary">E-posta:</h4>
        </b-card-text>
        <hr />
        <b-card-text
          class="bg-customGray rounded text-light shadow p-2 d-inline"
        >
          <span>{{ Email }}</span>
        </b-card-text>
      </div>
      <div class="jumbotron p-3 shadow">
        <b-card-text>
          <h4 class="text-secondary">İsim:</h4>
        </b-card-text>
        <hr />
        <b-card-text
          class="bg-customGray rounded text-light shadow p-2 d-inline"
        >
          <span>{{ FirstName }}</span>
        </b-card-text>
      </div>
      <div class="jumbotron p-3 shadow">
        <b-card-text>
          <h4 class="text-secondary">Soyisim:</h4>
        </b-card-text>
        <hr />
        <b-card-text
          class="bg-customGray rounded text-light shadow p-2 d-inline"
        >
          <span>{{ LastName }}</span>
        </b-card-text>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "ProfileCard",
    data() {
      return {
        Email: "",
        Firstname: "",
        LastName: "",
      };
    },
    created() {
      let userInfo = JSON.parse(localStorage.getItem("userInfos"));
      console.log(userInfo);
      this.Email = userInfo.Email;
      this.FirstName = userInfo.FirstName;
      this.LastName = userInfo.LastName;
    },
  };
</script>

<style scoped>
  .bg-customGray {
    background-color: #979797;
  }
  .bg-customGray:hover {
    background-color: #303030;
  }
</style>

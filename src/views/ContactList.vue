<template>
  <div class="container">
    <h2 class="jumbotron p-3 mt-3 shadow text-secondary text-center">
      İletişim Listesi
    </h2>
    <b-card
      v-for="(contact, index) in contacts"
      :key="index"
      class="row mx-2 shadow border-card text-left my-3"
      no-body
      img-alt="Image"
      img-top
    >
      <div class="p-1 m-2">
        <span class="badge badge-info mx-1 p-3">
          <span class="title"
            >Ad-Soyad:<span class="mx-1 text-white">{{
              contact.FullName
            }}</span></span
          >
        </span>
        <span class="badge badge-danger mx-1 p-3">
          <span class="title"
            >Email:<span class="mx-1 text-white">{{
              contact.Email
            }}</span></span
          >
        </span>
      </div>

      <b-list-group flush>
        <b-list-group-item>
          <div class="bg-white p-2 my-2 text-dark rounded shadow sub-title">
            <p class="ml-2 pt-2 text-primary">Oluşturulma Zamanı:</p>
            <hr />
            <p class="ml-2">{{ contact.CreatedDate }}</p>
          </div>
          <div class="bg-white p-2 my-2 text-dark rounded shadow sub-title">
            <p class="ml-2 pt-2 text-warning">Konu:</p>
            <hr />
            <p class="ml-2">{{ contact.Subject }}</p>
          </div>
          <div class="bg-white p-2 my-2 text-dark rounded shadow sub-title">
            <p class="ml-2 pt-2 text-success">Mesaj:</p>
            <hr />
            <p class="ml-2">{{ contact.Message }}</p>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "ContactList",
    data() {
      return {
        contacts: [],
      };
    },
    created() {
      axios
        .post(
          "http://81.213.78.251:4003/ContactUs/List",
          {},
          {
            headers: {
              Authorization: `Basic ${this.$store.state.jwtToken}`,
            },
          }
        )
        .then((response) => {
          this.contacts = response.data.Result;
        });
    },
  };
</script>

<style scoped>
  .title {
    font-weight: 500;
    font-size: 20px;
  }
  .sub-title {
    font-weight: 500;
    font-size: 18px;
  }
  .badge {
    color: #000;
    font-size: 18px;
    font-weight: 400;
  }
  .border-card {
    border: 5px solid #e0d7db;
  }
</style>

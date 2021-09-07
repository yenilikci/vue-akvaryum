<template>
  <div class="container">
    <div class="d-block mt-2">
      <div class="card p-3 shadow">
        <div class="card-header border-0 mx-3 shadow">
          <h1 class="text-secondary header">
            <b-icon-file-earmark-person
              class="mr-2"
            ></b-icon-file-earmark-person
            >İletişim Listesi
          </h1>
        </div>
        <b-card
          v-for="(contact, index) in contacts"
          :key="index"
          class="row mx-3 shadow border-card text-left my-3"
          no-body
          img-alt="Image"
          img-top
        >
          <div class="p-1 m-2">
            <span class="badge badge-dark mx-1 p-3">
              <span class="title"
                >Ad-Soyad:<span class="mx-1 text-white">{{
                  contact.FullName
                }}</span></span
              >
            </span>
            <span class="badge badge-secondary mx-1 p-3">
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
                <p class="ml-2 pt-2 text-secondary">Oluşturulma Zamanı:</p>
                <hr />
                <p class="ml-2">{{ contact.CreatedDate }}</p>
              </div>
              <div class="bg-white p-2 my-2 text-dark rounded shadow sub-title">
                <p class="ml-2 pt-2 text-secondary">Konu:</p>
                <hr />
                <p class="ml-2">{{ contact.Subject }}</p>
              </div>
              <div class="bg-white p-2 my-2 text-dark rounded shadow sub-title">
                <p class="ml-2 pt-2 text-secondary">Mesaj:</p>
                <hr />
                <p class="ml-2">{{ contact.Message }}</p>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
    </div>
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
  .header {
    font-size: 28px;
    font-weight: 500;
    text-align: center;
  }
  .title {
    font-weight: 500;
    font-size: 20px;
  }
  .sub-title {
    font-weight: 500;
    font-size: 18px;
  }
  .badge {
    color: rgb(204, 204, 204);
    font-size: 18px;
    font-weight: 400;
  }
  .border-card {
    border: 5px solid #e0d7db;
  }
</style>

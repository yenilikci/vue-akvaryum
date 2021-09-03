<template>
  <div>
    <div>Contact List</div>
    <div>
      {{ contacts }}
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

<style scoped></style>

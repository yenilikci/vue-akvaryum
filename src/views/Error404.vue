<template>
  <div
    class="container d-flex justify-content-center align-items-center default-height"
  >
    <h1
      class="mr-3 pr-3 align-top border-right inline-block align-content-center text-secondary"
    >
      404
    </h1>
    <div class="inline-block align-middle">
      <h2 class="font-weight-normal lead">
        Aradığınız her neyse maalesef bulamadık :(
      </h2>
      <button class="btn m-0 p-0  text-info" v-on:click="backHomepage">
        Anasayfaya dön
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Error404",
    methods: {
      backHomepage() {
        this.$router.push("/anasayfa");
      },
    },
  };
</script>

<style scoped>
  .default-height {
    height: 80vh;
  }
</style>

<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
  import Navbar from "./components/Navbar.vue";
  export default {
    name: "App",
    components: {
      Navbar,
    },
    beforeCreate() {
      this.$store.dispatch("authCheckAction");
    },
  };
</script>

<style>
  * {
    font-family: "Prompt", sans-serif;
  }
</style>

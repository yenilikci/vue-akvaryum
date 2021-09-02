<template>
  <div>
    <Navbar />
    <HomePage />
  </div>
</template>

<script>
  import Navbar from "./components/Navbar.vue";
  import HomePage from "./views/HomePage.vue";
  export default {
    name: "App",
    components: {
      Navbar,
      HomePage,
    },
  };
</script>

<style>
  * {
    font-family: "Prompt", sans-serif;
  }
</style>

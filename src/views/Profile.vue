<template>
  <div class="container">
    <h2 class="jumbotron p-3 mt-3 shadow text-secondary text-center">
      Profil Bilgilerim
    </h2>
    <ProfileCard />
  </div>
</template>

<script>
  import ProfileCard from "../components/ProfileCard.vue";
  export default {
    name: "Profile",
    components: {
      ProfileCard,
    },
  };
</script>

<style scoped></style>

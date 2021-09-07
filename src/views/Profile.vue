<template>
  <div class="container">
    <div class="d-block mt-2">
      <div class="card p-3 shadow">
        <div class="card-header border-0 mx-3 shadow ">
          <h1 class="text-secondary header">
            <b-icon-person-circle class="mr-2"></b-icon-person-circle>Profilim
          </h1>
        </div>
        <ProfileCard />
      </div>
    </div>
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

<style scoped>
  .header {
    font-size: 28px;
    font-weight: 500;
    text-align: center;
  }
</style>

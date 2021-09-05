<template>
  <div class="container">
    <h2 class="jumbotron p-3 mt-3 shadow text-secondary text-center">
      Projeler
    </h2>
    <div class="row">
      <b-card
        v-for="(project, index) in projects"
        :key="index"
        class="col-sm mx-2 shadow bordered text-center"
        no-body
        img-alt="Image"
        img-top
      >
        <h6 class="p-3 bg-light mt-2 rounded shadow">
          {{ project.ProjectName }}
        </h6>

        <b-list-group flush>
          <b-list-group-item>
            <p class="bg-dark p-2 text-white rounded">
              Başlangıç Zamanı:
            </p>
            {{
              project.StartDate ? project.StartDate : "Bilgi Yok"
            }}</b-list-group-item
          >
          <b-list-group-item>
            <p class="bg-danger p-2 text-white rounded">
              Bağış Toplama Süresi:
            </p>
            {{
              project.FundraisingTime ? project.FundraisingTime : "Bilgi Yok"
            }}</b-list-group-item
          >
          <b-list-group-item>
            <p class="bg-secondary p-2 text-white rounded">Ad:</p>
            {{
              project.FirstName ? project.FirstName : "Bilgi Yok"
            }}</b-list-group-item
          >
          <b-list-group-item>
            <p class="bg-secondary p-2 text-white rounded">Soyad:</p>
            {{
              project.LastName ? project.LastName : "Bilgi Yok"
            }}</b-list-group-item
          >
          <b-list-group-item
            ><p class="bg-info p-2 text-white rounded">Finanse Ediliyor Mu?</p>
            {{ project.isFunding === 1 ? "Evet" : "Hayır" }}</b-list-group-item
          >
          <b-list-group-item>
            <p class="bg-info p-2 text-white rounded">Yatırımcı Sayısı:</p>
            {{
              project.InvestorCount ? project.InvestorCount : "Bilgi Yok"
            }}</b-list-group-item
          >
          <b-list-group-item>
            <p class="bg-info p-2 text-white rounded">Yatırımcı Tutarı:</p>
            {{
              project.InvestmentAmount ? project.InvestmentAmount : "Bilgi Yok"
            }}
            ₺</b-list-group-item
          >
          <b-list-group-item
            ><p class="bg-info p-2 text-white rounded">Fon Edilebilir Tutar:</p>
            {{ project.FundableAmount ? project.FundableAmount : "Bilgi Yok" }}
            ₺</b-list-group-item
          >
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "HomePage",
    data() {
      return {
        projects: [],
      };
    },
    created() {
      axios
        .post("http://81.213.78.251:4003/Project/ProjectList")
        .then((response) => {
          this.projects = response.data.Result;
        });
    },
  };
</script>

<style scoped></style>

<template>
    <form @submit.prevent="handleSubmit">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" name="email"><br/>
        <label for="password">Mot de passe:</label>
        <input type="text" v-model="password" id="password" name="password"><br/>
        <button type="submit">Inscription</button>
    </form>
</template>

<script>
import axios from "axios";
export default {
  name: "connexion",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async handleSubmit()  {
      //envoie des informations de connexion à l'API pour authentification
      let token = "";
      if (this.email == "" || this.password == "") {
        alert(
          "Veuillez entrer votre email et votre mot de passe pour vous connecter"
        );
      } else {
        axios
          .post(
            "http://localhost:3000/api/auth/login",
            {
              email: this.email,
              password: this.password
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer${token}` //Renvoi du token par l'api en cas d'authentification
              }
            }
          )
          .then(response => {
            console.log(response);
            window.location.href = "http://localhost:8080/#/accueil";
          })
          .catch(() => {
            console.log("la connexion a échouée"); //En cas d'echec envoie de l'information à l'utilisateur
          });
      }
    }
  }
};
</script>

<style>
</style>

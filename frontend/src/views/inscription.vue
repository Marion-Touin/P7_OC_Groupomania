<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <label for="firstname">Nom:</label>
            <input type="text" v-model="firstname" id="firstname" name="firstname"><br/>
            <label for="lastname">Prénom:</label>
            <input type="text" v-model="lastname" id="lastname" name="lastname"><br/>
            <label for="email">Email:</label>
            <input type="email" v-model="email" id="email" name="email"><br/>
            <label for="password">Mot de passe:</label>
            <input type="text" v-model="password" id="password" name="password"><br/>
            <button type="submit">Inscription</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Register',
        data () {
            return {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            }
        },
        methods: {
            async handleSubmit() {
                axios.post('http://localhost:3000/api/auth/signup', {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch( ()=> {
                    console.log('non réussi !');
                })
            }
        }
    }
</script>

<style>
</style>


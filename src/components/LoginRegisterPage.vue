<script>
import axios from 'axios'


const baseAPIURL = "https://scrumapi-device.dataplicity.io/"

export default {
    emits: ['username', 'password'],
    data() {
        return {
            usernameLogin: "",
            passwordLogin: "",
            messageLogin: "",
            usernameRegister: "",
            passwordRegister: "",
            password2Register: "",
            messageRegister: "",
        }
    },
    methods: {
        async register() {
            try {            
                const response = await axios.post(baseAPIURL + 'auth/register/', 
                {
                    username: this.usernameRegister, 
                    password: this.passwordRegister, 
                    password2: this.password2Register,
                },
                );
                this.messageRegister = "User " + this.usernameRegister + " created"
                this.usernameRegister = ""
                this.passwordRegister = ""
                this.password2Register = ""
                this.messageLogin = ""
            } catch (e) {
                this.messageRegister = e.response.data;
                this.usernameRegister = ""
                this.passwordRegister = ""
                this.password2Register = ""
                this.messageLogin = ""
            }
              
        },
        async login() {
            // try to login, we not interested in response on that stage
            try {            
                await axios.get(
                    baseAPIURL + 'scrum/tasks/',
                    { auth: {username: this.usernameLogin, password: this.passwordLogin} } 
                );
                this.$emit('username', this.usernameLogin)
                this.$emit('password', this.passwordLogin)
            } catch (e) {
                this.messageLogin = e.response.data;
                this.usernameLogin = "";
                this.passwordLogin = "";
                this.messageRegister = ""
            }
        }
    }
}
</script>

<template>
    <form @submit.prevent="login">
        <h1>Login form</h1>
        <input type="text" placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin">
        <input type="submit" value="Login">
        <div name="info">{{ messageLogin }}</div>
    </form>
    <form @submit.prevent="register">
        <h1>Register form</h1>
        <input type="text" placeholder="username" v-model="usernameRegister">
        <input type="password" placeholder="password" v-model="passwordRegister">
        <input type="password" placeholder="confirm password" v-model="password2Register">
        <input type="submit" value="Sign up">
        <div name="info">{{ messageRegister }}</div>
    </form>
</template>

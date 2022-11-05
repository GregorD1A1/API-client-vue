<script>
import axios from 'axios'


const baseAPIURL = "http://localhost:8000/"


export default {
    emits: ['logged', 'tasks'],
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
                this.message = "User " + this.usernameRegister + " created"
                console.log("jest git");
                this.usernameRegister = ""
                this.passwordRegister = ""
                this.password2Register = ""
                this.messageLogin = ""
            } catch (e) {
                this.messageRegister = e.response.data;
            }
              
        },
        async getTasks() {
            try {            
                const response = await axios.get(
                    baseAPIURL + 'scrum/tasks/',
                    { auth: {username: this.usernameLogin, password: this.passwordLogin} } 
                );
                const tasks = response.data;
                console.log(response.data);
                this.$emit('logged', true)
                this.$emit('tasks', tasks)
            } catch (e) {
                this.messageLogin = e.response.data;
            }
        }
    }
}
</script>

<template>
    <form @submit.prevent="getTasks">
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

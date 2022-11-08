<script>
import MainPage from './components/MainPage.vue'
import LoginRegisterPage from './components/LoginRegisterPage.vue'


const baseAPIURL = "http://localhost:8000/"

export default {
  components: {
      LoginRegisterPage,
      MainPage,
  },
  data() {
    return {
      loggedIn: false,
      username: '',
      password: '',
    }

  },
};
</script>

<template>
  <MainPage v-if="loggedIn" :username="username" :password="password" />
  <LoginRegisterPage  v-else @logged="(loggedBool) => loggedIn = loggedBool" @username="(usrnm) => username = usrnm" @password="(passwd) => password = passwd" />
</template>

<style scoped>
</style>

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
      /*
      loggedIn: false,
      username: '',
      password: '',
      */
      loggedIn: true,
      username: 'slonik',
      password: '111122aa',
    }

  },
};
</script>

<template>
  <MainPage v-if="loggedIn" :username="username" :password="password" />
  <LoginRegisterPage  v-else @logged="(loggedBool) => loggedIn = loggedBool" @username="(usrnm) => username = usrnm" @password="(passwd) => password = passwd" />
</template>

<style>
  #app {
    width: 100vw;
    height: 100vh;
    background-color: rgb(230, 253, 225);
  }
  .btn {
      background-color: rgb(195, 224, 164);
      border-radius: 4px;
      padding: 6px;
  }
  .btn:hover {
    background-color: rgb(130, 150, 107);
  }
  .dropdown {
    background-color: rgb(195, 224, 164);
    border-radius: 4px;
  }
</style>

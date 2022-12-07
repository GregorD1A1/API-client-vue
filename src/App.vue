<script>
import MainPage from './components/MainPage.vue'
import LoginRegisterPage from './components/LoginRegisterPage.vue'
import { useMainStore } from '@/stores/main'


export default {
  setup() {
    const store = useMainStore()
    return {
      store,
    }
  },
  components: {
      LoginRegisterPage,
      MainPage,
  },
};
</script>

<template>
  <MainPage v-if="this.store.username" />
  <LoginRegisterPage  v-else/>
</template>

<style>
  #app {
    width: 100vw;
    height: 100vh;
    background-color: rgb(249, 253, 225);
    color: rgb(33, 37, 32);
  }
  .btn {
      background-color: rgb(232, 232, 170);
      border-radius: 4px;
      padding: 6px;
  }
  .btn:hover {
    background-color: rgb(145, 150, 107);
  }
  .dropdown {
    background-color: rgb(232, 232, 170);
    border-radius: 4px;
  }
</style>

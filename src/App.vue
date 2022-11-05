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
      tasks: [],
    }

  },
};
</script>

<template>
  <MainPage v-if="loggedIn" />
  <LoginRegisterPage  v-else @logged="(loggedBool) => loggedIn = loggedBool"  @tasks="tasks" /> 
  
  <ul>
    <li v-for="task of tasks" :key="task.id">
    {{ task.name }}
    {{ task.description }}
    </li>
  </ul>>
</template>

<style scoped>

.logo {
  display: block;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

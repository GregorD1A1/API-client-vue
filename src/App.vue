<script>
import axios from 'axios'
import MainPage from './components/MainPage.vue'
import LoginRegisterPage from './components/LoginRegisterPage.vue'


const baseAPIURL = "http://localhost:8000/"

export default {
  components: {
      LoginRegisterPage
  },
  data() {
    return {
      loggedIn: false,
      tasks: [{
        id: 1,
        setup: "dzik",
        punchline: "kon",
      }],
    }

  },

  async created() {
    try {
      
      const response = await axios.post(baseAPIURL + 'auth/register/', 
      {
        username: "usereks", 
        password: "1234oopp", 
        password2: "1234oopp"
      },
      /*{{
        "Access-Control-Allow-Origin": "http://localhost:5173/"
      }}*/
      );
      this.tasks = response.data;
      console.log(response.data);

    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<template>
  <LoginRegisterPage v-if="!loggedIn" />
  
  <ul>
    <li v-for="task of tasks" :key="task.id">
    {{ task.setup }}
    {{ task.punchline }}
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

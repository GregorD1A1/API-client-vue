<script>
import Task from './Task.vue'

export default {
  components: {
    Task,
  },
  methods: {
    async login() {
      try {            
          const response = await axios.get(
              baseAPIURL + 'scrum/tasks/',
              { auth: {username: this.usernameLogin, password: this.passwordLogin} } 
          );
          //this.tasks = response.data;
          console.log(response.data);
          //this.$emit('logged', true)
      } catch (e) {
          this.messageLogin = e.response.data;
      }
    }    
  }
}
</script>

<template>
  <div class="stage">
    <h1 class="green">To do</h1>
    <div class="tasks">
      <Task />
    </div>
  </div>
  <div class="stage">
    <h1 class="green">In progress</h1>
    <div class="tasks">
      <Task />
    </div>
  </div>
  <div class="stage">
    <h1 class="green">Done</h1>
    <div class="tasks">
      <Task />
    </div>
  </div>
</template>

<style scoped>
.stage {
  width: 200px;
  float: right;
}
</style>

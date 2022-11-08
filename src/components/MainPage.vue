<script>
import Task from './Task.vue'
import TaskCreationEditionForm from './TaskCreationEditionForm.vue'
import axios from 'axios'


const baseAPIURL = "http://localhost:8000/"

export default {
  components: {
    Task,
    TaskCreationEditionForm,
  },
  props: {
    username: String,
    password: String,
  },
  data() {
    return {
      tasks: [],
      editedTask: {},
    }
  },
  methods: {
    async getTasks() {
      try {            
        const response = await axios.get(
            baseAPIURL + 'scrum/tasks/',
            { auth: {username: this.username, password: this.password} } 
        );
        this.tasks = response.data;
        console.log(this.tasks);
      } catch (e) {
          console.error(e.response.data);
      }
    },
  },
  computed: {
    tasksStageTD() {
      return this.tasks.filter((task) => task.stage=='TD')
    },
    tasksStageIP() {
      return this.tasks.filter((task) => task.stage=='IP')
    },
    tasksStageDN() {
      return this.tasks.filter((task) => task.stage=='DN')
    },
  },
  mounted() {
    this.getTasks()

  }    
}
</script>

<template>
  <div class="container">
    <div class="stage">
      <h1 class="green">To do</h1>
      <ul>
        <li v-for="task of tasksStageTD" :key="task.id">
          <Task :task="task" :username="username" :password="password" @editedTask="(task) => editedTask = task" />
        </li>
      </ul>
      <TaskCreationEditionForm :username="username" :password="password" :editedTask="editedTask"/>
    </div>
    <div class="stage">
      <h1 class="green">In progress</h1>
        <ul>
          <li v-for="task of tasksStageIP" :key="task.id">
            <Task :task="task" :username="username" :password="password" @editedTask="(task) => editedTask = task" />
          </li>
        </ul>
    </div>
    <div class="stage">
      <h1 class="green">Done</h1>
        <ul>
          <li v-for="task of tasksStageDN" :key="task.id">
            <Task :task="task" :username="username" :password="password" @editedTask="(task) => editedTask = task" />
          </li>
        </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: red;
  width: 1500px;
}
.stage {
  width: 500px;
  float: left;
}
</style>

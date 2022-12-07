<script>
import Task from './Task.vue'
import TaskCreationForm from './TaskCreationForm.vue'
import { useMainStore } from '@/stores/main'
import axios from 'axios'


export default {
  setup() {
      const store = useMainStore()
      return { store }
  },
  components: {
    Task,
    TaskCreationForm,
  },
  data() {
    return {
      tasks: [],
    }
  },
  methods: {
    async getTasks() {
      try {            
        const response = await axios.get(
            this.store.baseAPIURL + 'scrum/tasks/',
            { auth: {username: this.store.username, password: this.store.password} } 
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
      <h1>To do</h1>
      <ul class="list">
        <li v-for="task of tasksStageTD" :key="task.id">
          <Task :task="task" @refreshTasks="getTasks"/>
        </li>
      </ul>
      <!-- stage prop withoun : because it is static string --> 
      <TaskCreationForm class="creation_form" stage="TD" @refreshTasks="getTasks"/>
    </div>
    <div class="stage">
      <h1>In progress</h1>
        <ul class="list">
          <li v-for="task of tasksStageIP" :key="task.id">
            <Task :task="task" @refreshTasks="getTasks"/>
          </li>
        </ul>
        <TaskCreationForm class="creation_form" stage="IP" @refreshTasks="getTasks"/>
    </div>
    <div class="stage">
      <h1>Done</h1>
        <ul class="list">
          <li v-for="task of tasksStageDN" :key="task.id">
            <Task :task="task" @refreshTasks="getTasks"/>
          </li>
        </ul>
        <TaskCreationForm class="creation_form" stage="DN" @refreshTasks="getTasks"/>
    </div>
  </div>
</template>

<style scoped>
.stage {
  text-align: center;
  width: 33%;
  float: left;
}
.list {
  list-style: none;
}
.creation_form {
  margin-top: 25px;
}
</style>

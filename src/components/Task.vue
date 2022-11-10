<script>
import axios from 'axios'
import TaskEditionForm from './TaskEditionForm.vue'


const baseAPIURL = "http://localhost:8000/"

export default {
  emits: ['refreshTasks'],
  props: {
      task: {},
      username: String,
      password: String,
  },
  data() {
    return {
      priority_class: "medium_priority",
      editing: false,
    }
  },
  methods: {
    async deleteTask() {
      try {            
        await axios.delete(
            baseAPIURL + 'scrum/tasks/' + this.task.id + '/',
            { auth: {username: this.username, password: this.password} } 
        );
        this.$emit('refreshTasks')
      } catch (e) {
          console.error(e.response.data);
      }
    },
    editTask() {
      this.editing = true;
    },
  },
  components: {
    TaskEditionForm,
  },
}
</script>

<template>
  <div class="task_container" v-if="!editing">
    <div class="task_internals">
      <h2>{{ task.name }}</h2>
      <div>{{ task.description }}</div>
      <button class="btn" @click="editTask">Edit</button>
      <button class="btn" @click="deleteTask">Delete</button>
    </div>
    <div class="priority_strip" :style="{'background-color': task.priority=='L' ? '#5CD470' : task.priority=='M' ? '#5CBED4' : '#D45C6A'}"></div>
  </div>
  <TaskEditionForm :username="username" :password="password" :editedTask="task" @refreshTasks="this.$emit('refreshTasks'); this.editing=false" v-else/>
</template>

<style scoped>
    .task_container {
      background-color: rgb(227, 250, 202);
      margin: 15px;
      border-radius: 10px;    
      box-shadow: 5px 3px 3px black;
      width: 400px;
      height: 120px;
      text-align: center;
    }
    .task_internals {
      float: left;
      width: 380px;
    }
    .priority_strip {
      float: right;
      width: 20px;
      height: 100%;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
</style>

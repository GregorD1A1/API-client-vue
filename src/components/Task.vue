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
      bgColor: "#0099CC",
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
  computed: {
    cssVars() {
      return {
        '--bg-color': this.bgColor,
      }
    }
  },
}
</script>

<template>
  <div :class="cssVars" v-if="!editing">
    <h2>{{ task.name }}</h2>
    <div>{{ task.description }}</div>
    <button @click="editTask">Edit</button>
    <button @click="deleteTask">Delete</button>
  </div>
  <TaskEditionForm :username="username" :password="password" :editedTask="task" @refreshTasks="this.$emit('refreshTasks'); this.editing=false" v-else/>
</template>

<style scoped>
    .task_container {
        border-radius: 10px;    
        box-shadow: 5px;
        width: inherit;
        text-align: center;    
    }
    .low_priority {
      background-color: rgb(241, 239, 202);
    }
    .medium_priority {
      background-color: var(--bg-color);
    }
    .high_priority {
      background-color: rgb(180, 36, 51);
    }
</style>
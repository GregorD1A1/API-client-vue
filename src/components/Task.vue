<script>
import axios from 'axios'


const baseAPIURL = "http://localhost:8000/"

export default {
  emits: ['editedTask'],
  props: {
      task: {},
      username: String,
      password: String,
  },
  data() {
    return {
      priority_class: "medium_priority"
    }
  },
  methods: {
    async deleteTask() {
      try {            
        await axios.delete(
            baseAPIURL + 'scrum/tasks/' + this.task.id + '/',
            { auth: {username: this.username, password: this.password} } 
        );
      } catch (e) {
          console.error(e.response.data);
      }
    },
    editTask() {
      this.$emit('editedTask', this.task);
    },
  },
}
</script>

<template>
  <div :class="priority_class">
    <h2>{{ task.name }}</h2>
    <div>{{ task.description }}</div>
    <button @click="editTask">Edit</button>
    <button @click="deleteTask">Delete</button>
  </div>
</template>

<style scoped>
    .task_container {
        border-radius: 10px;    
        /*shadow: 5px;*/
        width: inherit;
        text-align: center;    
    }
    .low_priority {
      background-color: rgb(241, 239, 202);
    }
    .medium_priority {
      background-color: rgb(210, 204, 89);
    }
    .high_priority {
      background-color: rgb(180, 36, 51);
    }
</style>
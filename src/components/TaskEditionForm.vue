<script>
import axios from 'axios'


const baseAPIURL = "http://localhost:8000/"

export default {
    props: {
        username: String,
        password: String,
        editedTask: {},
    },
    emits: ['refreshTasks'],
    methods: {
        async editTask() {
            try {            
                const response = await axios.put(
                    baseAPIURL + 'scrum/tasks/' + this.editedTask.id + '/',
                    {name: this.editedTask.name, description: this.editedTask.description, stage: this.editedTask.stage, priority: this.editedTask.priority},
                    { auth: {username: this.username, password: this.password} } 
                );
                console.log(response.data);
                this.$emit('refreshTasks');
            } catch (e) {
                console.error(e.response.data);
            }
        },
    }
}
</script>

<template>
    <form @submit.prevent="editTask">
        <h3>Edit task:</h3>
        <input type="text" placeholder="name" v-model="editedTask.name">
        <input type="text" placeholder="description" v-model="editedTask.description">
        <label for="priorities">   Priority: </label>
        <select class="dropdown" name="priorities" v-model="editedTask.priority">
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="H">High</option>
        </select>
        <label for="stages">   Stage: </label>
        <select class="dropdown" name="stages" v-model="editedTask.stage">
            <option value="TD">To Do</option>
            <option value="IP">In Progress</option>
            <option value="DN">Done</option>
        </select>
        <input class="btn" type="submit" value="Submit changes">
    </form>
</template>
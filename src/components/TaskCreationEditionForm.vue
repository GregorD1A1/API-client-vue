<script>
import axios from 'axios'


const baseAPIURL = "http://localhost:8000/"

export default {
    data() {
        return {
            name: '',
            description: '',
            priority: '',
        }
    },
    props: {
        username: String,
        password: String,
        editedTask: {},
    },
    methods: {
        async addTask() {
            try {            
                const response = await axios.post(
                    baseAPIURL + 'scrum/tasks/',
                    {name: this.name, description: this.description, stage: "TD", priority: this.priority},
                    { auth: {username: this.username, password: this.password} } 
                );
                console.log(response.data);
            } catch (e) {
                console.error(e.response.data);
            }
        },
        async editTask() {
            try {            
                const response = await axios.put(
                    baseAPIURL + 'scrum/tasks/' + this.editedTask.id + '/',
                    {name: this.editedTask.name, description: this.editedTask.description, stage: this.editedTask.stage, priority: this.editedTask.priority},
                    { auth: {username: this.username, password: this.password} } 
                );
                console.log(response.data);
            } catch (e) {
                console.error(e.response.data);
            }
        },
    }
}
</script>

<template>
    {{editedTask.name}} {{editedTask.priority}}{{ editedTask.description}}{{ editedTask.stage}}
    <form>
        <h3>Create or edit task:</h3>
        <input type="text" placeholder="name" :value="editedTask.name">
        <input type="text" placeholder="description" :value="editedTask.description">
        <label for="priorities">Priority: </label>
        <select name="priorities" v-model="priority">
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="H">High</option>
        </select>
        <button @click="editTask">Edit task</button>
        <button @click="addTask">Create task</button>
    </form>
</template>
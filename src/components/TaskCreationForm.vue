<script>
import axios from 'axios'


const baseAPIURL = "https://scrumapi-device.dataplicity.io/"

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
        stage: String,
    },
    emits: ['refreshTasks'],
    methods: {
        async addTask() {
            try {        
                const response = await axios.post(
                    baseAPIURL + 'scrum/tasks/',
                    {name: this.name, description: this.description, stage: this.stage, priority: this.priority},
                    { auth: {username: this.username, password: this.password} } 
                );
                console.log(response.data);
                this.$emit('refreshTasks');
                // zeroing fields
                this.name = '';
                this.description = '';
                this.priority = '';
            } catch (e) {
                console.error(e.response.data);
            }
        },
    }
}
</script>

<template>
    <form @submit.prevent="addTask">
        <h3>Create task:</h3>
        <input type="text" placeholder="name" v-model="name">
        <input type="text" placeholder="description" v-model="description">
        <label for="priorities">   Priority: </label>
        <select class="dropdown" name="priorities" v-model="priority" >
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="H">High</option>
        </select>
        <input class="btn" type="submit" value="Create task">
    </form>
</template>

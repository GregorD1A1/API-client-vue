<script>
import axios from 'axios'
import { useMainStore } from '@/stores/main'


export default {
    setup() {
        const store = useMainStore()
        return { store }
    },
    props: {
        editedTask: {},
    },
    emits: ['refreshTasks'],
    data() {
        return {
            // this variable is a buffer. Without it, when trying to change task stage, it moves to other column and gives no posiibility to submit it
            stage: this.editedTask.stage,
        }
    },
    methods: {
        async editTask() {
            console.log(this.editedTask.name)
            try {            
                const response = await axios.put(
                    this.store.baseAPIURL + 'scrum/tasks/' + this.editedTask.id + '/',
                    {name: this.editedTask.name, description: this.editedTask.description, stage: this.stage, priority: this.editedTask.priority},
                    { auth: {username: this.store.username, password: this.store.password} } 
                );
                console.log(response.data);
                this.editedTask.stage = this.stage;
                this.$emit('refreshTasks');
            } catch (e) {
                console.error(e);
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
        <select class="dropdown" name="stages" v-model="stage">
            <option value="TD">To Do</option>
            <option value="IP">In Progress</option>
            <option value="DN">Done</option>
        </select>
        <input class="btn" type="submit" value="Submit changes">
    </form>
</template>
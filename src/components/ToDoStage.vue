<script setup>
import Task from './Task.vue'

defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="ToDoStage">
    <h1 class="green">To do</h1>
    <div class="tasks">
      <Task />
    </div>
  </div>
</template>

<style scoped>
.ToDoStage {
  width: 200px;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

<template>
  <div class="container">
    <NewTodo />
    <div class="todolist">
      <TodoItem v-for="todo in todos" :key="todo.id" :title="todo.title" :id="todo.id" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useTodos } from '../composables/useTodos'
import TodoItem from '../components/TodoItem.vue'
import NewTodo from '../components/NewTodo.vue'

const { todos, getTodos } = useTodos()

onBeforeMount(async () => {
  await getTodos()
})
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.todolist {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

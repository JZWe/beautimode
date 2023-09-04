<template>
  <div class="container">
    <NewTodo />
    <!-- <TodoTabs /> -->
    <div class="todolist">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useTodos } from '../composables/useTodos'
import TodoItem from '../components/TodoItem.vue'
// import TodoTabs from '../components/TodoTabs.vue'
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
  padding: 0.2rem;
  gap: 0.5rem;
}
</style>

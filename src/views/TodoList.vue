<template>
  <div class="container">
    <NewTodo />
    <div class="todolist">
      <TodoTabs />
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useTodos } from '@/composables/useTodos'
import TodoItem from '@/components/todo/TodoItem.vue'
import TodoTabs from '@/components/todo/TodoTabs.vue'
import NewTodo from '@/components/todo/NewTodo.vue'

const { filteredTodos, getTodos } = useTodos()

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
  min-width: 500px;
}
</style>

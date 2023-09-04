<template>
  <div class="todo-item">
    <TodoStatus :id="todo.id" :status="todo.status" @on-status="updateStatus" />
    <span>{{ todo.title || '' }}</span>
    <DeleteTodo :id="todo.id" />
  </div>
</template>
<script setup lang="ts">
import DeleteTodo from './DeleteTodo.vue'
import TodoStatus from './TodoStatus.vue'
import { toRefs } from 'vue'
import { type Todo, type TodoStatus as TypeTodoStatus } from '@/composables/useTodos'

const props = defineProps<{ todo: Todo }>()
const { todo } = toRefs(props)

function updateStatus(value: TypeTodoStatus) {
  todo.value.status = value
}
</script>
<style scoped>
.todo-item {
  display: flex;
}
</style>

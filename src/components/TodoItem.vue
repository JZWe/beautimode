<template>
  <div class="todo-item">
    <TodoStatus :id="todo.id" :status="todo.status" @on-status="updateStatus" />
    <UpdateTodo
      v-if="isUpdating"
      :id="todo.id"
      :title="todo.title"
      @on-change-updating="changeUpdating"
    />
    <TodoInfo v-else :title="todo.title" @on-change-updating="changeUpdating" />
    <DeleteTodo :id="todo.id" />
  </div>
</template>
<script setup lang="ts">
import UpdateTodo from './UpdateTodo.vue'
import TodoInfo from './TodoInfo.vue'
import DeleteTodo from './DeleteTodo.vue'
import TodoStatus from './TodoStatus.vue'
import { ref } from 'vue'
import { toRefs } from 'vue'
import { type Todo, type TodoStatus as TypeTodoStatus } from '@/composables/useTodos'

const props = defineProps<{ todo: Todo }>()
const { todo } = toRefs(props)
const isUpdating = ref<boolean>(false)

function changeUpdating(value: boolean) {
  isUpdating.value = value
}
function updateStatus(value: TypeTodoStatus) {
  todo.value.status = value
}
</script>
<style scoped>
.todo-item {
  display: flex;
  gap: 0.2rem;
  align-items: center;
}
</style>

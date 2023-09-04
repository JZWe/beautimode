<template>
  <button @click="onDelete" class="delete-todo btn btn-sm btn-danger">刪除</button>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
import { useTodos, type Todo } from '../composables/useTodos'

const props = defineProps<Pick<Todo, 'id'>>()
const { id } = toRefs(props)
const { deleteTodo } = useTodos()

const onDelete = async () => {
  await deleteTodo(id.value)
}
</script>
<style scoped>
.btn {
  width: 60px;
}
</style>

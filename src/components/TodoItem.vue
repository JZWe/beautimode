<template>
  <div class="todo-item">
    <span>{{ title || '' }}</span>
    <DeleteTodo :id="id" />
  </div>
</template>
<script setup lang="ts">
import DeleteTodo from './DeleteTodo.vue'
import { toRefs } from 'vue'
import { type Todo } from '@/composables/useTodos'

const props = defineProps<Pick<Todo, 'id' | 'title'>>()
const { id, title } = toRefs(props)
</script>

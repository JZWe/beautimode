<template>
  <div class="todo-status">
    <input type="checkbox" :checked="status !== 'undone'" @input="statusAction($event)" />
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
import { type Todo, type TodoStatus } from '@/composables/useTodos'

const props = defineProps<Pick<Todo, 'id' | 'status'>>()
const { status } = toRefs(props)

const emit = defineEmits<{
  (e: 'onStatus', val: TodoStatus): void
}>()

const statusAction = (event: Event) => {
  if (!event.target) return
  const eventTarget = event.target as HTMLInputElement
  const nextStatus: TodoStatus = eventTarget.checked ? 'completed' : 'undone'
  emit('onStatus', nextStatus)
}
</script>

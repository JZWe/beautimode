<template>
  <span>{{ title || '' }}</span>
  <button @click="emit('onChangeUpdating', true)" class="btn btn-sm btn-secondary">編輯</button>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
import { type Todo } from '@/composables/useTodos'

const props = defineProps<{ title: Todo['title'] }>()
const { title } = toRefs(props)

const emit = defineEmits<{
  (e: 'onChangeUpdating', val: boolean): void
}>()
</script>
<style scoped>
.todo-item {
  display: flex;
  gap: 0.2rem;
  align-items: center;
}
</style>

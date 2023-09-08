<template>
  <input v-model="inputTitle" />
  <button @click="onConfirmUpdate" class="btn btn-sm btn-warning">確認修改</button>
</template>
<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { type Todo, useTodos } from '@/composables/useTodos'

const props = defineProps<{ title: Todo['title']; id: Todo['id'] }>()
const { title, id } = toRefs(props)
const inputTitle = ref<string>(title.value)
const { updateTodo } = useTodos()

const emit = defineEmits<{
  (e: 'onChangeUpdating', val: boolean): void
}>()

const onConfirmUpdate = async () => {
  await updateTodo({ id: id.value, title: inputTitle.value })
  emit('onChangeUpdating', false)
}
</script>
<style scoped>
.todo-item {
  display: flex;
  gap: 0.2rem;
  align-items: center;
}
</style>

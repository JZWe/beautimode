<template>
  <div class="new-todo">
    <input
      v-model="name"
      placeholder="請輸入名稱"
      class="form-control form-control-sm"
      :class="{ 'input-error': isError }"
      @click="isTouched = true"
    />
    <button
      class="btn btn-sm btn-rounded btn-primary"
      type="submit"
      :disabled="isError"
      @click="onAdd"
    >
      加入
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodos } from '@/composables/useTodos'
const { addTodo } = useTodos()
const name = ref('')
const isTouched = ref(false)

async function onAdd() {
  await addTodo(name.value)
}

const isError = computed(() => {
  return isTouched.value && name.value.trim() === ''
})
</script>
<style scoped>
.new-todo {
  display: flex;
  gap: 0.5rem;
}
.btn {
  width: 130px;
}
</style>

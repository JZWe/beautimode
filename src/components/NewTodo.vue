<template>
  <div class="new-todo">
    <input v-model="name" placeholder="請輸入名稱" />
    <button @click="onAdd">+</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useTodos } from '../composables/useTodos'
const { addTodo } = useTodos()
const name = ref('')

async function onAdd() {
  await addTodo(name.value)
}
</script>

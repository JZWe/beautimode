<template>
  <input type="checkbox" class="toggle" :id="`toggle-${id}`" />
  <label :for="`toggle-${id}`" @click="onClick"></label>
</template>
<script setup lang="ts">
interface ToggleVal {
  id: string | number
  state: boolean
}
import { ref, toRefs } from 'vue'
const props = defineProps<{ id: ToggleVal['id'] }>()
const { id } = toRefs(props)
const isEnabled = ref<boolean>(false)
const emit = defineEmits<{
  (e: 'onToggle', val: ToggleVal): void
}>()

function onClick() {
  isEnabled.value = !isEnabled.value
  const result = { id: id.value, state: isEnabled.value }
  emit('onToggle', result)
}
</script>
<style scoped>
.toggle {
  display: none;
}

label {
  display: inline-block;
  width: 50px;
  height: 26px;
  background-color: #aaa;
  border-radius: 13px;
  position: relative;
  cursor: pointer;
  margin-left: 32px;
}

label::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/xmark-solid.svg');
  background-position: 2px 1px;
  background-repeat: no-repeat;
  background-size: 70%;
}

:checked + label::before {
  transform: translateX(25px);
  background-image: url('@/assets/check-solid.svg');
  background-position: 1.5px 2px;
  background-size: 80%;
}
</style>

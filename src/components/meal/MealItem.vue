<template>
  <div class="meal-item">
    <span class="day-name">{{ dayName }}</span>
    <CustomSwitch :id="id" @on-toggle="(result) => (isDropdownVisible = result.state)" />
    <span class="supply-meal">{{ supplyMealResult }}</span>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs, ref } from 'vue'
import CustomSwitch from '@/components/CustomSwitch.vue'

const props = defineProps<{ id: string; data: string }>()
const { id, data } = toRefs(props)
const isDropdownVisible = ref<boolean>(false)
const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const dayName = computed(() => {
  const dayIndex = Number(id.value.split('week_day')[1])
  return days[dayIndex]
})
const supplyMealResult = computed(() => {
  return isDropdownVisible.value ? '本日供餐' : '本日不供餐'
})
</script>
<style scoped>
.meal-item {
  display: flex;
  align-items: center;
}
</style>

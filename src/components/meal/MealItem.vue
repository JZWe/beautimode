<template>
  <div class="meal-item">
    <span class="day-name">{{ dayName }}</span>
    <CustomSwitch
      :id="id"
      @on-toggle="
        (result) => {
          isDropdownVisible = result.state
          if (!result.state) {
            emit('onItemChange', { id, result: { startSelect: 0, endSelect: 0 } })
          } else {
            emit('onItemChange', { id, result: { startSelect: 0, endSelect: 47 } })
          }
        }
      "
    />
    <span class="supply-meal">{{ supplyMealResult }}</span>
    <MealDropdown
      v-show="isDropdownVisible"
      :id="id"
      :data="data"
      @on-dropdown-change="onDataChange"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs, ref } from 'vue'
import CustomSwitch from '@/components/CustomSwitch.vue'
import MealDropdown from './MealDropdown.vue'

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
const emit = defineEmits<{
  (e: 'onItemChange', val: { id: string; result: { startSelect: number; endSelect: number } }): void
}>()

function onDataChange(result: { startSelect: number; endSelect: number }) {
  emit('onItemChange', { id: id.value, result })
}
</script>
<style scoped>
.meal-item {
  display: flex;
  align-items: center;
  padding: 36px 0;
  min-width: 620px;
}

.meal-item:not(:last-of-type) {
  border-bottom: 1px solid #f4f4f4;
}

.day-name {
  color: #3e3a39;
  font-family:
    Noto Sans TC,
    sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  margin-right: 12px;
}

.supply-meal {
  margin-left: 5px;
  color: #3e3a39;
  font-family:
    Noto Sans TC,
    sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  margin-left: 12px;
}
</style>

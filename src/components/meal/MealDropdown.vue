<template>
  <div class="meal-dropdowns">
    <CustomDropdown
      :id="`${id}-start`"
      :key="`${id}-start`"
      :disabledOption="'請選擇時間'"
      :options="startOptions"
      @on-select-change="onStartSelectChange"
    />
    <span>-</span>
    <CustomDropdown
      :id="`${id}-end`"
      :key="`${id}-end`"
      :disabledOption="'請選擇時間'"
      :options="endOptions"
      @on-select-change="onEndSelectChange"
    />
  </div>
</template>
<script setup lang="ts">
import CustomDropdown from '@/components/CustomDropdown.vue'
import { ref, toRefs } from 'vue'

interface Option {
  name: string
  value: string | number
  selected?: boolean
  disabled?: boolean
}

function generateOptions(data: string, type: 'start' | 'end'): Option[] {
  let idx = -1
  let selected = -1
  const options = []

  if (type === 'start') {
    idx = data.lastIndexOf('1')
    selected = data.indexOf('1') === -1 ? 0 : data.indexOf('1')
    for (let i = 0; i < data.length; i++) {
      let name = i % 2 === 1 ? `${Math.floor(i / 2)}:30` : `${Math.floor(i / 2)}:00`
      options.push({
        name,
        value: i,
        disabled: idx === -1 ? false : i > idx,
        selected: i === selected
      })
    }
  } else {
    idx = data.indexOf('1')
    selected = data.lastIndexOf('1') === -1 ? data.length - 1 : data.lastIndexOf('1')
    for (let i = 0; i < data.length; i++) {
      let name = i % 2 === 0 ? `${Math.floor(i / 2)}:30` : `${Math.ceil(i / 2)}:00`
      if (i === data.length - 1) {
        name = `${Math.floor(i / 2)}:59`
      }
      options.push({
        name,
        value: i,
        disabled: idx === -1 ? false : i < idx,
        selected: i === selected
      })
    }
  }

  return options
}

const props = defineProps<{ id: number | string; data: string }>()
const { id, data } = toRefs(props)
const startData = data.value
const endData = data.value
const startOptions = ref(generateOptions(startData, 'start'))
const endOptions = ref(generateOptions(endData, 'end'))
const startSelect = ref(startOptions.value.find((option) => option.selected)?.value ?? null)
const endSelect = ref(endOptions.value.find((option) => option.selected)?.value ?? null)

function onStartSelectChange(result: Option) {
  startSelect.value = result.value
  startOptions.value = startOptions.value.map((option, index) => {
    return {
      ...option,
      disabled: index > Number(endSelect.value),
      selected: option.value === Number(result.value)
    }
  })
  endOptions.value = endOptions.value.map((option, index) => {
    return {
      ...option,
      disabled: index < Number(startSelect.value)
    }
  })
}

function onEndSelectChange(result: Option) {
  endSelect.value = result.value
  startOptions.value = startOptions.value.map((option, index) => {
    return {
      ...option,
      disabled: index > Number(endSelect.value)
    }
  })
  endOptions.value = endOptions.value.map((option, index) => {
    return {
      ...option,
      disabled: index < Number(startSelect.value),
      selected: option.value === Number(result.value)
    }
  })
}
</script>
<style scoped>
.meal-dropdowns {
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>

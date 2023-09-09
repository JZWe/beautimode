<template>
  <div class="dropdown-container" :class="{ active: getDropdownState() }">
    <div class="current-option" @click="toggleOptions">
      <span>{{ currentOption?.name || '' }}</span>
      <span class="triangle"></span>
    </div>
    <ul v-show="getDropdownState()" class="options">
      <li v-if="disabledOption" class="option disabled">{{ disabledOption }}</li>
      <li
        v-for="(dropdownOption, index) in dropdownOptions"
        class="option"
        :class="{ selected: dropdownOption.selected, disabled: dropdownOption.disabled }"
        :key="index"
        @click="setSelectedOption(index)"
      >
        {{ dropdownOption.name }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useDropdown } from '@/composables/useDropdown'

interface Option {
  name: string
  value: string | number
  selected?: boolean
  disabled?: boolean
}

const props = defineProps<{ disabledOption?: string; options: Option[]; id: string }>()
const { disabledOption, options = [], id } = props
const { getDropdownState, openDropdown, closeDropdown } = useDropdown(id)
const dropdownOptions = ref<Option[]>(
  options.map((option, index) => ({
    ...option,
    selected: index === 0
  }))
)
const currentOption = ref<Option | null>(
  dropdownOptions.value.find((option) => option.selected) ?? null
)

const emit = defineEmits<{
  (e: 'onSelectChange', val: Option): void
}>()

const toggleOptions = () => {
  const state = getDropdownState()
  if (state) {
    closeDropdown()
  } else {
    openDropdown()
  }
}
const setSelectedOption = (index: number) => {
  dropdownOptions.value = dropdownOptions.value.map((option, idx) => ({
    ...option,
    selected: idx === index
  }))
  currentOption.value = dropdownOptions.value[index]
  toggleOptions()
  emit('onSelectChange', {
    value: dropdownOptions.value[index].value,
    name: dropdownOptions.value[index].name
  })
}
</script>
<style scoped>
.dropdown-container {
  color: #3e3a39;
  align-items: center;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  padding: 5px;
  margin: 0 auto;
  min-height: 40px;
  outline: none;
  position: relative;
}

.dropdown-container.active {
  border-color: #8fc325;
  border-radius: 6px 6px 0 0;
  box-shadow: unset;
}
.current-option {
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  outline: none;
  position: relative;
  width: 100%;
  min-width: 190px;
  padding: 0 10px;
}

.dropdown-container .triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0.3rem 0.3rem 0.3rem;
  border-color: transparent transparent #999 transparent;
  margin-left: auto;
  transform: rotate(180deg);
  transition: transform 0.3s;
}

.dropdown-container.active .triangle {
  transform: rotate(0deg);
  transition: transform 0.3s;
}

.options {
  position: absolute;
  z-index: 9999;
  width: 100%;
  top: 100%;
  right: 0;
  left: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  max-height: 10rem;
  border: 1px solid #d1d5db;
  overflow: auto;
}
.option {
  padding: 10px;
}

.option:hover {
  background-color: #e0e0e0;
}

.option.selected {
  color: #8fc325;
  font-weight: 700;
  background-color: #fff;
}

.option.disabled {
  opacity: 0.5;
}
.option.disabled:hover {
  cursor: not-allowed;
  background-color: transparent;
}
</style>
